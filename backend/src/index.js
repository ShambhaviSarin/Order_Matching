const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db');
const middlewares = require('./middlewares');

const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//---------------------------------------------------------------------------------------------------------------------

function Queue() {
   this.elements = [];
}

Queue.prototype.enqueue = function (e) {
   this.elements.push(e);
};

// remove an element from the front of the queue
Queue.prototype.dequeue = function () {
    return this.elements.shift();
};

// check if the queue is empty
Queue.prototype.isEmpty = function () {
    return this.elements.length == 0;
};

// get the element at the front of the queue
Queue.prototype.peek = function () {
    return !this.isEmpty() ? this.elements[0] : undefined;
};

Queue.prototype.print = function () {
   for(var i = 0; i < this.elements.length; i++)
       console.log(this.elements[i]);
};

Queue.prototype.length = function() {
    return this.elements.length;
}

//---------------------------------------------------------------------------------------------------------------------

let qb = new Queue();
let qs = new Queue();
var marketPrice = 500;
var msg="Temporary";

//reject order
async function rejectOrder(oid) {
  const rejOrder = await pool.query(
    "UPDATE orders SET status = 0 WHERE order_id = $1 RETURNING *",[oid]
  );
}

async function updateAcceptStatus(oid) {
  const update = await pool.query(
    "UPDATE orders SET status = 1 WHERE order_id = $1 RETURNING *",[oid]
  );
}

//trade successfully
async function acceptOrder(bid, sid, price, qty) {
  marketPrice=price;
  const trade = await pool.query(
    "INSERT INTO trades(buyer_id, seller_id, price, qty) VALUES ($1 , $2 , $3 , $4 ) RETURNING *",
    [bid, sid, price, qty]
  );
}

//CASE 1---------------------------------------------------------------------------------------------------------------------

function getMinPriceOrder(q, mindis, minq) {
  var minPos = -1;
  if(q.isEmpty()) {
    return -1;
  }
  for(var i = 0; i < q.elements.length; i++) {
    if(q.elements[i].category !== -1) {
      if(q.elements[i].description === 0 || (q.elements[i].description === 1 && qty >= q.elements[i].qty) ||
      (q.elements[i].description === 2 && (qty >= q.elements[i].mindis || minq === 1)) || (q.elements[i].description === 3)) {
        if(minPos === -1 || q.elements[i].price < q.elements[minPos].price)
          minPos = i;
      }
    }
  }
  return minPos;
}

//execute buy limit order none condition
function buyLimitOrders(q, id, order) {
  if(q.isEmpty()) {
    qb.enqueue(order);
    msg = "Order waiting! No sellers\n"
  } else {
    while(order.qty != 0) {
      var pos = getMinPriceOrder(q,qty);
      console.log("Pos"+pos);
      if(pos === -1) {
        qb.enqueue(order);
        msg = "Order waiting! No sellers\n"
        return;
      } else if (q.elements[pos].price > order.price) {
        qb.enqueue(order);
        msg = "Order waiting! No sellers at this price\n"
        return;
      } else if(q.elements[pos].qty >= order.qty) {
        //trade executes
        acceptOrder(id, q.elements[pos].order_id, q.elements[pos].price, order.qty);
        console.log(q.elements[pos]);
        msg = "Order executed!"
        updateAcceptStatus(id);
        //update qty
        q.elements[pos].qty -= order.qty;
        if(q.elements[pos].qty === 0 ) {
          if(q.elements[pos].description === 3) {
            order.left -= order.mindis;
          }
          if(q.elements[pos].left <== 0){
            updateAcceptStatus(q.elements[pos].order_id);
            q.elements[pos].category = -1;
            if(pos === 0) {
              q.dequeue();
            }
          } else {
            q.elements[pos].qty = (q.elements[pos].left >== q.elements[pos].mindis) ? q.elements[pos].mindis : q.elements[pos].left;
          }
        } else if (q.elements[pos].description === 2) {
          q.elements[pos].minq = 1;
        }
        order.qty=0;
      } else {
        //execute partial order
        acceptOrder(id, q.elements[pos].order_id, q.elements[pos].price, q.elements[pos].qty);
        //console.log(q.elements[pos]);
        msg = "Partial order executed!\n"
        //update qty
        order.qty-=q.elements[pos].qty;
        q.elements[pos].qty = 0;
        if(q.elements[pos].description === 3) {
          order.left -= order.mindis;
        }
        if(q.elements[pos].left <== 0){
          updateAcceptStatus(q.elements[pos].order_id);
          q.elements[pos].category = -1;
          if(pos === 0) {
            q.dequeue();
          }
        } else {
          q.elements[pos].qty = (q.elements[pos].left >== q.elements[pos].mindis) ? q.elements[pos].mindis : q.elements[pos].left;
        }
      }
    }
  }
}

//execute sell limit order none condition
function sellLimitOrders(q, id, order) {
  if(q.isEmpty()) {
    qs.enqueue(order);
    msg = "Order waiting! No buyers\n"
  } else {
    while(order.qty != 0) {
      var pos = getMinPriceOrder(q,qty);
      if(pos === -1) {
        qs.enqueue(order);
        msg = "Order waiting! No buyers\n"
        return;
      } else if (q.elements[pos].price < order.price) {
        msg = "Order waiting! No buyers at this price.\n"
        qs.enqueue(order);
        return;
      } else if(q.elements[pos].qty >= order.qty) {
        //trade executes
        acceptOrder(q.elements[pos].order_id, id, q.elements[pos].price, order.qty);
        console.log(q.elements[pos]);
        msg = "Order executed!"
        //console.log("Trade executed");
        updateAcceptStatus(id);
        //update qty
        q.elements[pos].qty -= order.qty;
        if(q.elements[pos].qty === 0 ) {
          if(q.elements[pos].description === 3) {
            order.left -= order.mindis;
          }
          if(q.elements[pos].left <== 0){
            updateAcceptStatus(q.elements[pos].order_id);
            q.elements[pos].category = -1;
            if(pos === 0) {
              q.dequeue();
            }
          } else {
            q.elements[pos].qty = (q.elements[pos].left >== q.elements[pos].mindis) ? q.elements[pos].mindis : q.elements[pos].left;
          }
        } else if (q.elements[pos].description === 2) {
          q.elements[pos].minq = 1;
        }
        order.qty=0;
      } else {
        //execute partial order
        acceptOrder(q.elements[pos].order_id, id, q.elements[pos].price, q.elements[pos].qty);
        console.log(q.elements[pos]);
        msg = "Partial order executed\n"
        //updateAcceptStatus(q.elements[pos].order_id);
        //update qty
        order.qty-=q.elements[pos].qty;
        q.elements[pos].qty = 0;
        if(q.elements[pos].description === 3) {
          order.left -= order.mindis;
        }
        if(q.elements[pos].left <== 0){
          updateAcceptStatus(q.elements[pos].order_id);
          q.elements[pos].category = -1;
          if(pos === 0) {
            q.dequeue();
          }
        } else {
          q.elements[pos].qty = (q.elements[pos].left >== q.elements[pos].mindis) ? q.elements[pos].mindis : q.elements[pos].left;
        }
      }
    }
  }
}

//execute market order none condition
function marketOrders(q, id, qty) {
  if(q.isEmpty()) {
    rejectOrder(id);
    msg += "Order rejected!\n";
  } else {
    while(qty !== 0) {
      var pos = getMinPriceOrder(q,qty);
      if(pos === -1) {
        rejectOrder(id);
        msg += "Order rejected!\n";
        return;
      } else if(q.elements[pos].qty >= qty) {
        //trade executes
        acceptOrder(id, q.elements[pos].order_id, q.elements[pos].price, qty);
        console.log(q.elements[pos]);
        msg += "Order executed!\n";
        updateAcceptStatus(id);
        //update qty
        q.elements[pos].qty -= order.qty;
        if(q.elements[pos].qty === 0 ) {
          if(q.elements[pos].description === 3) {
            order.left -= order.mindis;
          }
          if(q.elements[pos].left <== 0){
            updateAcceptStatus(q.elements[pos].order_id);
            q.elements[pos].category = -1;
            if(pos === 0) {
              q.dequeue();
            }
          } else {
            q.elements[pos].qty = (q.elements[pos].left >== q.elements[pos].mindis) ? q.elements[pos].mindis : q.elements[pos].left;
          }
        } else if (q.elements[pos].description === 2) {
          q.elements[pos].minq = 1;
        }
        qty=0;
        return;
      } else {
        //execute partial order
        acceptOrder(id, q.elements[pos].order_id, q.elements[pos].price, q.elements[pos].qty);
        console.log(q.elements[pos]);
        msg += "Partial order executed!\n";
        //updateAcceptStatus(q.elements[pos].order_id);
        //update qty
        qty-=q.elements[pos].qty;
        q.elements[pos].qty = 0;
        if(q.elements[pos].description === 3) {
          order.left -= order.mindis;
        }
        if(q.elements[pos].left <== 0){
          updateAcceptStatus(q.elements[pos].order_id);
          q.elements[pos].category = -1;
          if(pos === 0) {
            q.dequeue();
          }
        } else {
          q.elements[pos].qty = (q.elements[pos].left >== q.elements[pos].mindis) ? q.elements[pos].mindis : q.elements[pos].left;
        }
      }
    }
  }
}

//CASE 2-------------------------------------------------------------------------------------------

function getAllPrice(q, qty) {
  var minPos = -1;
  if(q.isEmpty()) {
    return -1;
  }
  for(var i = 0; i < q.elements.length; i++) {
    if(q.elements[i].category !== -1 && q.elements[i].qty === qty) {
      if(q.elements[i].description === 0 || (q.elements[i].description === 1 && qty >= q.elements[i].qty) ||
      (q.elements[i].description === 2 && (qty >= q.elements[i].mindis || minq === 1))) || q.elements[i].description === 3) {
        if(minPos === -1 || q.elements[i].price < q.elements[minPos].price)
          minPos = i;
      }
    }
  }
  return minPos;
}

//execute buy limit order all or none condition
function buyAllLimitOrders(q, id, order) {
  if(q.isEmpty()) {
    qb.enqueue(order);
    msg = "Order waiting! No sellers\n";
  } else {
    var pos = getAllPrice(q,qty);
    if(pos === -1) {
      qb.enqueue(order);
      msg = "Order waiting! No sellers\n";
      return;
    } else if (q.elements[pos].price > order.price) {
      qb.enqueue(order);
      msg = "Order waiting! No sellers at this price\n";
      return;
    } else if(q.elements[pos].qty >== order.qty) {
      //trade executes
      acceptOrder(id, q.elements[pos].order_id, q.elements[pos].price, order.qty);
      console.log(q.elements[pos]);
      msg = "Order executed!";
      updateAcceptStatus(id);
      q.elements[pos].qty -= order.qty;
      if(q.elements[pos].qty === 0 ) {
        if(q.elements[pos].description === 3) {
          order.left -= order.mindis;
        }
        if(q.elements[pos].left <== 0){
          updateAcceptStatus(q.elements[pos].order_id);
          q.elements[pos].category = -1;
          if(pos === 0) {
            q.dequeue();
          }
        } else {
          q.elements[pos].qty = (q.elements[pos].left >== q.elements[pos].mindis) ? q.elements[pos].mindis : q.elements[pos].left;
        }
      } else if (q.elements[pos].description === 2) {
        q.elements[pos].minq = 1;
      }
      order.qty=0;
    } else {
      qb.enqueue(order);
      msg = "Order waiting! No sellers\n";
    }
  }
}

//execute sell limit order all or none condition
function sellAllLimitOrders(q, id, order) {
  if(q.isEmpty()) {
    qs.enqueue(order);
    msg = "Order waiting! No buyers\n"
  } else {
      var pos = getAllPrice(q,qty);
      if(pos === -1) {
        qs.enqueue(order);
        msg = "Order waiting! No buyers\n"
        return;
      } else if (q.elements[pos].price < order.price) {
        msg = "Order waiting! No buyers at this price.\n"
        qs.enqueue(order);
        return;
      } else if(q.elements[pos].qty >== order.qty) {
        //trade executes
        acceptOrder(q.elements[pos].order_id, id, q.elements[pos].price, order.qty);
        console.log(q.elements[pos]);
        msg = "Order executed!"
        updateAcceptStatus(id);
        //update qty
        q.elements[pos].qty -= order.qty;
        if(q.elements[pos].qty === 0 ) {
          if(q.elements[pos].description === 3) {
            order.left -= order.mindis;
          }
          if(q.elements[pos].left <== 0){
            updateAcceptStatus(q.elements[pos].order_id);
            q.elements[pos].category = -1;
            if(pos === 0) {
              q.dequeue();
            }
          } else {
            q.elements[pos].qty = (q.elements[pos].left >== q.elements[pos].mindis) ? q.elements[pos].mindis : q.elements[pos].left;
          }
        } else if (q.elements[pos].description === 2) {
          q.elements[pos].minq = 1;
        }
        order.qty=0;
      } else {
        qs.enqueue(order);
        msg = "Order waiting! No buyers\n"
      }
  }
}

//execute market order all or none condition
function marketOrders(q, id, qty) {
  if(q.isEmpty()) {
    rejectOrder(id);
    msg = "Order rejected!\n";
  } else {
      var pos = getAllPrice(q, qty);
      if(pos === -1) {
        rejectOrder(id);
        msg = "Order rejected!\n";
        return;
      } else if(q.elements[pos].qty >= qty) {
        acceptOrder(id, q.elements[pos].order_id, q.elements[pos].price, qty);
        console.log(q.elements[pos]);
        msg = "Order executed!\n";
        updateAcceptStatus(id);
        q.elements[pos].qty -= order.qty;
        if(q.elements[pos].qty === 0 ) {
          if(q.elements[pos].description === 3) {
            order.left -= order.mindis;
          }
          if(q.elements[pos].left <== 0){
            updateAcceptStatus(q.elements[pos].order_id);
            q.elements[pos].category = -1;
            if(pos === 0) {
              q.dequeue();
            }
          } else {
            q.elements[pos].qty = (q.elements[pos].left >== q.elements[pos].mindis) ? q.elements[pos].mindis : q.elements[pos].left;
          }
        } else if (q.elements[pos].description === 2) {
          q.elements[pos].minq = 1;
        }
      } else {
        rejectOrder(id);
        msg = "Order rejected!\n";
        return;
      }
  }
}

//CASE 3---------------------------------------------------------------------------------------------------------------------

function getMinPrice(q, qty, minQty) {
  var minPos = -1;
  if(q.isEmpty()) {
    return -1;
  }
  for(var i = 0; i < q.elements.length; i++) {
    if(q.elements[i].category !== -1 && q.elements[i].qty >== minQty) {
      if(q.elements[i].description === 0 || (q.elements[i].description === 1 && qty >== q.elements[i].qty) ||
      (q.elements[i].description === 2 && (qty >= q.elements[i].mindis || minq === 1))) || q.elements[i].description === 3) {
        if(minPos === -1 || q.elements[i].price < q.elements[minPos].price)
          minPos = i;
      }
    }
  }
  return minPos;
}

//execute buy limit order min fill condition
function buyMinLimitOrders(q, id, order) {
  if(q.isEmpty()) {
    qb.enqueue(order);
    msg = "Order waiting! No sellers\n"
  } else {
    while(order.qty != 0) {
      var pos = getMinPriceOrder(q,order.qty,order.mindis);
      if(pos === -1) {
        qb.enqueue(order);
        msg = "Order waiting! No sellers\n"
        return;
      } else if (q.elements[pos].price > order.price) {
        qb.enqueue(order);
        msg = "Order waiting! No sellers at this price\n"
        return;
      } else if(q.elements[pos].qty >= order.qty) {
        //trade executes
        acceptOrder(id, q.elements[pos].order_id, q.elements[pos].price, order.qty);
        console.log(q.elements[pos]);
        msg = "Order executed!"
        updateAcceptStatus(id);
        //update qty
        q.elements[pos].qty -= order.qty;
        if(q.elements[pos].qty === 0 ) {
          if(q.elements[pos].description === 3) {
            order.left -= order.mindis;
          }
          if(q.elements[pos].left <== 0){
            updateAcceptStatus(q.elements[pos].order_id);
            q.elements[pos].category = -1;
            if(pos === 0) {
              q.dequeue();
            }
          } else {
            q.elements[pos].qty = (q.elements[pos].left >== q.elements[pos].mindis) ? q.elements[pos].mindis : q.elements[pos].left;
          }
        } else if (q.elements[pos].description === 2) {
          q.elements[pos].minq = 1;
        }
        order.qty=0;
      } else if((q.elements[pos].qty >= mindis && minq === 0)|| minq === 1){
        //execute partial order
        acceptOrder(id, q.elements[pos].order_id, q.elements[pos].price, q.elements[pos].qty);
        console.log(q.elements[pos]);
        msg = "Partial order executed!\n"
        //updateAcceptStatus(q.elements[pos].order_id);
        //update qty
        order.qty-=q.elements[pos].qty;
        q.elements[pos].qty = 0;
        if(q.elements[pos].description === 3) {
          order.left -= order.mindis;
        }
        if(q.elements[pos].left <== 0){
          updateAcceptStatus(q.elements[pos].order_id);
          q.elements[pos].category = -1;
          if(pos === 0) {
            q.dequeue();
          }
        } else {
          q.elements[pos].qty = (q.elements[pos].left >== q.elements[pos].mindis) ? q.elements[pos].mindis : q.elements[pos].left;
        }
        order.minq = 1;
      } else {
        qs.enqueue(order);
        msg = "Order waiting! No buyers\n"
      }
    }
  }
}

//execute sell limit order min fill condition
function sellMinLimitOrders(q, id, order) {
  if(q.isEmpty()) {
    qs.enqueue(order);
    msg = "Order waiting! No buyers\n"
  } else {
    while(order.qty != 0) {
      var pos = getMinPriceOrder(q,order.qty,order.mindis);
      if(pos === -1) {
        qs.enqueue(order);
        msg = "Order waiting! No buyers\n"
        return;
      } else if (q.elements[pos].price < order.price) {
        msg = "Order waiting! No buyers at this price.\n"
        qs.enqueue(order);
        return;
      } else if(q.elements[pos].qty >= order.qty) {
        //trade executes
        acceptOrder(q.elements[pos].order_id, id, q.elements[pos].price, order.qty);
        console.log(q.elements[pos]);
        msg = "Order executed!"
        //console.log("Trade executed");
        updateAcceptStatus(id);
        //update qty
        q.elements[pos].qty -= order.qty;
        if(q.elements[pos].qty === 0 ) {
          if(q.elements[pos].description === 3) {
            order.left -= order.mindis;
          }
          if(q.elements[pos].left <== 0){
            updateAcceptStatus(q.elements[pos].order_id);
            q.elements[pos].category = -1;
            if(pos === 0) {
              q.dequeue();
            }
          } else {
            q.elements[pos].qty = (q.elements[pos].left >== q.elements[pos].mindis) ? q.elements[pos].mindis : q.elements[pos].left;
          }
        } else if (q.elements[pos].description === 2) {
          q.elements[pos].minq = 1;
        }
        order.qty=0;
      } else if((q.elements[pos].qty >= mindis && minq === 0)|| minq === 1){
        //execute partial order
        acceptOrder(q.elements[pos].order_id, id, q.elements[pos].price, q.elements[pos].qty);
        console.log(q.elements[pos]);
        msg = "Partial order executed\n"
        //updateAcceptStatus(q.elements[pos].order_id);
        //update qty
        order.qty-=q.elements[pos].qty;
        q.elements[pos].qty = 0;
        if(q.elements[pos].description === 3) {
          order.left -= order.mindis;
        }
        if(q.elements[pos].left <== 0){
          updateAcceptStatus(q.elements[pos].order_id);
          q.elements[pos].category = -1;
          if(pos === 0) {
            q.dequeue();
          }
        } else {
          q.elements[pos].qty = (q.elements[pos].left >== q.elements[pos].mindis) ? q.elements[pos].mindis : q.elements[pos].left;
        }
        order.minq=1;
      } else {
        qs.enqueue(order);
        msg = "Order waiting! No buyers\n"
      }
    }
  }
}

//execute market order min fill condition
function marketMinOrders(q, id, qty, mindis) {
  if(q.isEmpty()) {
    rejectOrder(id);
    msg = "Order rejected!\n";
  } else {
    while(qty !== 0) {
      var pos = getMinPriceOrder(q,qty,mindis);
      if(pos === -1) {
        rejectOrder(id);
        msg = "Order rejected!\n";
        return;
      } else if(q.elements[pos].qty >= qty) {
        //trade executes
        acceptOrder(id, q.elements[pos].order_id, q.elements[pos].price, qty);
        console.log(q.elements[pos]);
        msg += "Order executed!\n";
        updateAcceptStatus(id);
        //update qty
        q.elements[pos].qty -= order.qty;
        if(q.elements[pos].qty === 0 ) {
          if(q.elements[pos].description === 3) {
            order.left -= order.mindis;
          }
          if(q.elements[pos].left <== 0){
            updateAcceptStatus(q.elements[pos].order_id);
            q.elements[pos].category = -1;
            if(pos === 0) {
              q.dequeue();
            }
          } else {
            q.elements[pos].qty = (q.elements[pos].left >== q.elements[pos].mindis) ? q.elements[pos].mindis : q.elements[pos].left;
          }
        } else if (q.elements[pos].description === 2) {
          q.elements[pos].minq = 1;
        }
        qty=0;
        return;
      } else if((q.elements[pos].qty >= mindis && minq === 0)|| minq === 1){
        //execute partial order
        acceptOrder(id, q.elements[pos].order_id, q.elements[pos].price, q.elements[pos].qty);
        console.log(q.elements[pos]);
        msg += "Partial order executed!\n";
        updateAcceptStatus(q.elements[pos].order_id);
        //update qty
        qty-=q.elements[pos].qty;
        q.elements[pos].qty = 0;
        if(q.elements[pos].description === 3) {
          order.left -= order.mindis;
        }
        if(q.elements[pos].left <== 0){
          updateAcceptStatus(q.elements[pos].order_id);
          q.elements[pos].category = -1;
          if(pos === 0) {
            q.dequeue();
          }
        } else {
          q.elements[pos].qty = (q.elements[pos].left >== q.elements[pos].mindis) ? q.elements[pos].mindis : q.elements[pos].left;
        }
        order.minq = 1;
      } else {
        rejectOrder(id);
        msg = "Order rejected!\n";
        return;
      }
    }
  }
}

//CASE 4---------------------------------------------------------------------------------------------------------------------

function getDisPrice(q, qty) {
  var minPos = -1;
  if(q.isEmpty()) {
    return -1;
  }
  for(var i = 0; i < q.elements.length; i++) {
    if(q.elements[i].category !== -1) {
      if(q.elements[i].description === 0 || (q.elements[i].description === 1 && qty >= q.elements[i].qty) ||
      (q.elements[i].description === 2 && (qty >= q.elements[i].mindis || minq === 1))) || q.elements[i].description === 3) {
        if(minPos === -1 || q.elements[i].price < q.elements[minPos].price)
          minPos = i;
      }
    }
  }
  return minPos;
}




//execute every 24 hours! Remove expired limit orders
function execute(q) {
    console.log(q.print());
}

function random(min, max) {
  return min + Math.random() * (max - min);
}

//random orders generate
async function generate() {
  try {
    //user_id
    const userId = await pool.query(
      "SELECT user_id FROM users"
    );
    var len = userId.rows.length;
    var u = Math.floor(Math.random() * len);
    var randomUID = userId.rows[u].user_id;
    //console.log(randomUID);
    //qty
    var randomQty = Math.floor(Math.random() * 1000 ) + 1;
    //category
    var randomCat = Math.round(Math.random());
    //type
    var randomType = Math.round(Math.random())+1;
    console.log(randomType);
    //price
    var minPrice = parseFloat(marketPrice - (0.12*marketPrice)).toFixed(2);
    var maxPrice = parseFloat(marketPrice + (0.12*marketPrice)).toFixed(2);
    var randomPrice = parseFloat(random(minPrice, maxPrice)).toFixed(2);
    //description
    var d = 0;
    //mindis
    var randomMindis = 0;
    //status
    var randomStatus = 2;
    var rem = randomPrice%1;
    if(randomType === 0 && rem%5 !== 0) {
      randomStatus = 0;
    }

    var min_Price = marketPrice - (0.1*marketPrice);
    var max_Price = marketPrice + (0.1*marketPrice);
    if(randomType === 0) {
      if(randomPrice < min_Price || randomPrice > max_Price) {
        randomStatus = 0;
      }
    }

    //process
    const randomOrder = await pool.query(
      "INSERT INTO orders(user_id, qty, category, order_type, price, description, mindis, status) VALUES ($1 , $2 , $3 , $4 , $5, $6, $7, $8) RETURNING *",
      [randomUID, randomQty, randomCat, randomType-1, randomPrice, d, randomMindis, randomStatus]
    );

    //get last order's id
    const getRandomOrder = await pool.query(
      "SELECT order_id, order_time FROM orders ORDER BY order_time DESC LIMIT 1"
    );

    var id = getRandomOrder.rows[0].order_id;
    var time = getRandomOrder.rows[0].order_time;
    //randomType+=2;
    msg="";

    if(randomStatus === 2) {
      if(randomCat === 0) {
        console.log("Buy order");
        if(randomType === 1) {
          console.log("Market order");
          console.log(randomPrice);
          marketOrders(qs, id, randomQty);
          console.log(randomPrice);
          //console.log(randomOrder.rows[0]);
        } else if(randomType === 2){
          console.log("Limit order");
          console.log(randomPrice);
          buyLimitOrders(qs, id, randomOrder.rows[0]);
          console.log(randomPrice);
          //console.log(randomOrder.rows[0]);
        }
      } else if(randomCat === 1) {
        console.log("Sell order");
        if(randomType === 1) {
          console.log("Market order");
          console.log(randomPrice);
          marketOrders(qb, id, randomQty);
          console.log(randomPrice);
          //console.log(randomOrder.rows[0]);
        } else if (randomType === 2) {
          console.log("Limit order");
          console.log(randomPrice);
          sellLimitOrders(qb, id, randomOrder.rows[0]);
          console.log(randomPrice);
          //console.log(randomOrder.rows[0]);
        }
      }
    }
    console.log(msg);
  } catch (err) {
    console.error(err.message);
  }
}

setInterval(() => generate(), 1000);

//setInterval(() => execute(qs), 1000)

//create orders
//Anytime we create or get data, it will take some time.
//Async provides a method called await() which waits for the function to complete before it continues
app.post("/login", async(req, res) => {
  try {
    console.log(req.body);
    var full_name = req.body.name;
    console.log(full_name);
    var contact = req.body.contact;
    var email= req.body.email;
    var gender = req.body.gender;
    var password = req.body.password;
    const newUser = await pool.query(
      //returning * makes it easier to check in POSTMAN!
      "INSERT INTO users(full_name, contact, email, gender, pwd) VALUES ($1 , $2 , $3 , $4 , $5) RETURNING *",
      [full_name, contact, email, gender, password]
    );

    const user = await pool.query(
      //returning * makes it easier to check in POSTMAN!
      "SELECT user_id FROM USERS WHERE email = $1", [email]
    );
    console.log(user);
    res.json(user); //returns accepted status code
    console.log(name);
  } catch (err) {
      console.error(err.message);
    }
});

app.get('/trades', async(req, res) => {
  try {
    res.json(marketPrice); //returns json data
  } catch (err) {
      console.error(err.message);
  }
});

app.get('/login', async(req, res) => {
  try {
    const users = await pool.query(
      //returning * makes it easier to check in POSTMAN!
      "SELECT * FROM USERS"
    );
    res.json(users); //returns json data
  } catch (err) {
      console.error(err.message);
  }
});

app.post("/orders", async(req, res) => {
  try {
    console.log(req.body);
    var uid = req.body.uid;
    var qty= req.body.qty;
    var category = req.body.category;
    var type = req.body.type;
    var price = req.body.price;
    var description = req.body.description;
    var status = req.body.status;
    var left = req.body.left;
    var mindis = req.body.mindis;
    var minq = req.body.minq;
    msg="";
    const newOrder = await pool.query(
      //returning * makes it easier to check in POSTMAN!
      "INSERT INTO orders(user_id, qty, category, order_type, price, description, mindis, status) VALUES ($1 , $2 , $3 , $4 , $5, $6, $7, $8) RETURNING *",
      [uid, qty, category, type, price, description, mindis, status]
    );
    //console.log(newOrder.data);

    //get last order's id
    const getOrder = await pool.query(
      //returning * makes it easier to check in POSTMAN!
      "SELECT order_id, order_time FROM orders ORDER BY order_time DESC LIMIT 1"
    );

    var id = getOrder.rows[0].order_id;
    var time = getOrder.rows[0].order_time;
    //console.log(getOrder.rows[0].order_id);

    //console.log(generate());

    if(status === 2) {
      if(category === 0) {
        console.log("Buy order");
        if(description === 0) {
          console.log("None");
          if(type === 1) {
            console.log("Market order");
            marketOrders(qs, id, qty);
          } else {
            console.log("Limit order");
            buyLimitOrders(qs, id, newOrder.rows[0]);
          }
        } else if(description === 1) {
          console.log("All or none");
          if(type === 1) {
            console.log("Market order");
            allMarketOrders(qs, id, qty);
          } else {
            console.log("Limit order");
            buyAllLimitOrders(qs, id, newOrder.rows[0]);
          }
        } else if (description === 2) {
          console.log("Minimum fill");
          if(type === 1) {
            console.log("Market order");
            minMarketOrders(qs, id, qty);
          } else {
            console.log("Limit order");
            buyMinLimitOrders(qs, id, newOrder.rows[0]);
          }
        } else if (description === 3) {
          console.log("Disclosed quantity");
          if(type === 1) {
            console.log("Market order");
            disMarketOrders(qs, id, qty);
          } else {
            console.log("Limit order");
            buyDisLimitOrders(qs, id, newOrder.rows[0]);
          }
        }
      } else if(category === 1) {
        console.log("Sell order");
        if(description === 0) {
          console.log("None");
          if(type === 1) {
            console.log("Market order");
            marketOrders(qb, id, qty);
          } else {
            console.log("Limit order");
            sellLimitOrders(qb, id, newOrder.rows[0]);
          }
        } else if(description === 1) {
          console.log("All or none");
          if(type === 1) {
            console.log("Market order");
            allMarketOrders(qb, id, qty);
          } else {
            console.log("Limit order");
            sellAllLimitOrders(qb, id, newOrder.rows[0]);
          }
        } else if (description === 2) {
          console.log("Minimum fill");
          if(type === 1) {
            console.log("Market order");
            minMarketOrders(qb, id, qty);
          } else {
            console.log("Limit order");
            sellMinLimitOrders(qb, id, newOrder.rows[0]);
          }
        } else if (description === 3) {
          qty = mindis;
          console.log("Disclosed quantity");
          if(type === 1) {
            console.log("Market order");
            disMarketOrders(qb, id, qty);
          } else {
            console.log("Limit order");
            sellDisLimitOrders(qb, id, newOrder.rows[0]);
          }
        }
      }
    } else if(status === 0 && req.body.tick === 1) {
      msg = "Order rejected, tick size check!"
    } else if(status === 0 && req.body.circuit === 1) {
      msg = "Order rejected, circuit size check!"
    }

    res.json(msg); //returns accepted status code
  } catch (err) {
      console.error(err.message);
    }
});

app.get('/', (req, res) => {
  res.json({
    message: "Welcome to Express!"
  })
})

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log("Open 'http://localhost:1337");
});
