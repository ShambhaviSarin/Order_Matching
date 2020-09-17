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

//QUEUE---------------------------------------------------------------------------------------------------------------------

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

//INITIALISATION---------------------------------------------------------------------------------------------------------------------

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

//CASE 1 AND 4---------------------------------------------------------------------------------------------------------------------

function getMinPriceOrder(q, qty, minq) {
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
function orders(q, id, order) {
  console.log(order.order_time);
  if(q.isEmpty()) {
    if(order.order_type === 1) {
      rejectOrder(id);
      msg += "Order rejected!\n";
    } else {
      qb.enqueue(order);
      if(order.category === 0)
        msg = "Order waiting! No sellers\n"
      else
        msg = "Order waiting! No buyers\n"
    }
    return;
  } else {
    while(order.qty !== 0) {
      var pos = getMinPriceOrder(q,order.qty,order.minq);
      console.log("pos"+pos);
      if(pos === -1) {
        if(order.order_type === 1) {
          rejectOrder(id);
          msg += "Order rejected!\n";
        } else {
          qb.enqueue(order);
          if(order.category === 0)
            msg = "Order waiting! No sellers\n"
          else
            msg = "Order waiting! No buyers\n"
        }
        console.log("case 1");
        return;
      } else if (order.order_type === 0 && order.category === 0 && q.elements[pos].price > order.price) {
        qb.enqueue(order);
        msg = "Order waiting! No sellers at this price\n";
        console.log("case 2");
        return;
      } else if (order.order_type === 0 && order.category === 1 && q.elements[pos].price < order.price) {
        qb.enqueue(order);
        msg = "Order waiting! No buyers at this price\n";
        console.log("case 3");
        return;
      } else if(q.elements[pos].qty >= order.qty) {
        console.log("case 4");
        console.log("Match order: "+ q.elements[pos]);
        //trade executes
        if(order.category === 0) {
          acceptOrder(id, q.elements[pos].order_id, q.elements[pos].price, order.qty);
          console.log("buy order trade executed");
        } else {
          acceptOrder(q.elements[pos].order_id, id, q.elements[pos].price, order.qty);
          console.log("sell order trade executed");
        }

        //update qty
        q.elements[pos].qty -= order.qty;
        if(q.elements[pos].qty === 0 ) {
          if(q.elements[pos].description === 3) {
            if(q.elements[pos].left > 0) {
              if(q.elements[pos].left < q.elements[pos].mindis) {
                q.elements[pos].qty = q.elements[pos].left;
                q.elements[pos].left = 0;
              } else {
                q.elements[pos].qty = q.elements[pos].mindis;
                q.elements[pos].left -= q.elements[pos].mindis;
              }
            }
          }
          if(q.elements[pos].qty === 0 ){
            updateAcceptStatus(q.elements[pos].order_id);
            q.elements[pos].category = -1;
            if(pos === 0) {
              q.dequeue();
            }
          }
        }
        if (q.elements[pos].description === 2) {
          q.elements[pos].minq = 1;
        }

        console.log("match order checked");
        if(order.description === 3) {
          if(order.left > 0) {
            msg = "Disclosed qty executed!"
            if(order.left < order.mindis) {
              order.qty = order.left;
              order.left = 0;
            } else {
              order.qty = order.mindis;
              order.left -= order.mindis;
            }
          } else {
            msg = "Order executed!"
            updateAcceptStatus(id);
            order.qty = 0;
          }
        } else {
          order.qty = 0;
        }
        console.log("202" + msg);
      } else {

        console.log("case 4");
        console.log("Match order: "+ q.elements[pos]);

        //execute partial order
        if(order.category === 0) {
          acceptOrder(id, q.elements[pos].order_id, q.elements[pos].price, order.qty);
          console.log("Buy order trade executed");
        } else {
          acceptOrder(q.elements[pos].order_id, id, q.elements[pos].price, order.qty);
          console.log("Sell order trade executed");
        }
        msg = "Partial order executed!\n"
        console.log(msg);
        //update qty
        order.qty-=q.elements[pos].qty;
        q.elements[pos].qty = 0;
        if(q.elements[pos].description === 3) {
          if(q.elements[pos].left > 0) {
            if(q.elements[pos].left < q.elements[pos].mindis) {
              q.elements[pos].qty = q.elements[pos].left;
              q.elements[pos].left = 0;
            } else {
              q.elements[pos].qty = q.elements[pos].mindis;
              q.elements[pos].left -= q.elements[pos].mindis;
            }
          }
        }
        if(q.elements[pos].qty === 0 ){
          updateAcceptStatus(q.elements[pos].order_id);
          q.elements[pos].category = -1;
          if(pos === 0) {
            q.dequeue();
          }
        }
        console.log("par done");
      }
    }
  }
}

//CASE 2-------------------------------------------------------------------------------------------

function getAllPrice(q, qty, minq) {
  var minPos = -1;
  if(q.isEmpty()) {
    return -1;
  }
  for(var i = 0; i < q.elements.length; i++) {
    if(q.elements[i].category !== -1 && q.elements[i].qty === qty) {
      if(q.elements[i].description === 0 || (q.elements[i].description === 1 && qty >= q.elements[i].qty) ||
      (q.elements[i].description === 2 && (qty >= q.elements[i].mindis || minq === 1)) || q.elements[i].description === 3) {
        if(minPos === -1 || q.elements[i].price < q.elements[minPos].price)
          minPos = i;
      }
    }
  }
  return minPos;
}

//execute buy limit order all or none condition
function allOrders(q, id, order) {
  if(q.isEmpty()) {
    if(order.order_type === 1) {
      rejectOrder(id);
      msg += "Order rejected!\n";
    } else {
      qb.enqueue(order);
      if(order.category === 0)
        msg = "Order waiting! No sellers\n"
      else
        msg = "Order waiting! No buyers\n"
    }
    return;
  } else {
    var pos = getAllPrice(q, order.qty, order.minq);
    if(pos === -1) {
      if(order.order_type === 1) {
        rejectOrder(id);
        msg += "Order rejected!\n";
      } else {
        qb.enqueue(order);
        if(order.category === 0)
          msg = "Order waiting! No sellers\n"
        else
          msg = "Order waiting! No buyers\n"
      }
      return;
    } else if (order.type === 0 && order.category === 0 && q.elements[pos].price > order.price) {
      qb.enqueue(order);
      msg = "Order waiting! No sellers at this price\n"
      return;
    } else if (order.type === 0 && order.category === 1 && q.elements[pos].price < order.price) {
      qb.enqueue(order);
      msg = "Order waiting! No buyers at this price\n"
      return;
    } else if(q.elements[pos].qty >= order.qty) {
      //trade executes
      if(order.category === 0) {
        acceptOrder(id, q.elements[pos].order_id, q.elements[pos].price, order.qty);
      } else {
        acceptOrder(q.elements[pos].order_id, id, q.elements[pos].price, order.qty);
      }
      msg = "Order executed!";
      updateAcceptStatus(id);
      q.elements[pos].qty -= order.qty;
      if(q.elements[pos].qty === 0 ) {
        if(q.elements[pos].description === 3) {
          if(q.elements[pos].left > 0) {
            if(q.elements[pos].left < q.elements[pos].mindis) {
              q.elements[pos].qty = q.elements[pos].left;
              q.elements[pos].left = 0;
            } else {
              q.elements[pos].qty = q.elements[pos].mindis;
              q.elements[pos].left -= q.elements[pos].mindis;
            }
          }
        }
        if(q.elements[pos].qty === 0 ){
          updateAcceptStatus(q.elements[pos].order_id);
          q.elements[pos].category = -1;
          if(pos === 0) {
            q.dequeue();
          }
        }
      }
      if (q.elements[pos].description === 2) {
        q.elements[pos].minq = 1;
      }
      order.qty=0;
    } else {
      if(order.order_type === 1) {
        rejectOrder(id);
        msg += "Order rejected!\n";
      } else {
        qb.enqueue(order);
        if(order.category === 0)
          msg = "Order waiting! No sellers\n"
        else
          msg = "Order waiting! No buyers\n"
      }
      return;
    }
  }
}

//CASE 3---------------------------------------------------------------------------------------------------------------------

function getMinPrice(q, qty, minq, minQty) {
  var minPos = -1;
  if(q.isEmpty()) {
    return -1;
  }
  for(var i = 0; i < q.elements.length; i++) {
    if(q.elements[i].category !== -1 && q.elements[i].qty >= minQty) {
      if(q.elements[i].description === 0 || (q.elements[i].description === 1 && qty >= q.elements[i].qty) ||
      (q.elements[i].description === 2 && (qty >= q.elements[i].mindis || minq === 1)) || q.elements[i].description === 3) {
        if(minPos === -1 || q.elements[i].price < q.elements[minPos].price)
          minPos = i;
      }
    }
  }
  return minPos;
}

//execute buy limit order min fill condition
function minOrders(q, id, order) {
  if(q.isEmpty()) {
    if(order.order_type === 1) {
      rejectOrder(id);
      msg += "Order rejected!\n";
      return;
    } else {
      qb.enqueue(order);
      if(order.category === 0)
        msg = "Order waiting! No sellers\n"
      else
        msg = "Order waiting! No buyers\n"
    }
    return;
  } else {
    while(order.qty != 0) {
      var pos = getMinPriceOrder(q,order.qty,order.minq, order.mindis);
      if(pos === -1) {
        if(order.order_type === 1) {
          rejectOrder(id);
          msg += "Order rejected!\n";
        } else {
          qb.enqueue(order);
          if(order.category === 0)
            msg = "Order waiting! No sellers\n"
          else
            msg = "Order waiting! No buyers\n"
        }
        return;
      } else if (order.type === 0 && order.category === 0 && q.elements[pos].price > order.price) {
        qb.enqueue(order);
        msg = "Order waiting! No sellers at this price\n"
        return;
      } else if (order.type === 0 && order.category === 1 && q.elements[pos].price < order.price) {
        qb.enqueue(order);
        msg = "Order waiting! No buyers at this price\n"
        return;
      } else if(q.elements[pos].qty >= order.qty) {
        //trade executes
        if(order.category === 0) {
          acceptOrder(id, q.elements[pos].order_id, q.elements[pos].price, order.qty);
        } else {
          acceptOrder(q.elements[pos].order_id, id, q.elements[pos].price, order.qty);
        }
        msg = "Order executed!"
        updateAcceptStatus(id);
        //update qty
        q.elements[pos].qty -= order.qty;
        if(q.elements[pos].qty === 0 ) {
          if(q.elements[pos].description === 3) {
            if(q.elements[pos].left > 0) {
              if(q.elements[pos].left < q.elements[pos].mindis) {
                q.elements[pos].qty = q.elements[pos].left;
                q.elements[pos].left = 0;
              } else {
                q.elements[pos].qty = q.elements[pos].mindis;
                q.elements[pos].left -= q.elements[pos].mindis;
              }
            }
          }
          if(q.elements[pos].qty === 0 ){
            updateAcceptStatus(q.elements[pos].order_id);
            q.elements[pos].category = -1;
            if(pos === 0) {
              q.dequeue();
            }
          }
        }
        if (q.elements[pos].description === 2) {
          q.elements[pos].minq = 1;
        }
        order.qty=0;
      } else if((q.elements[pos].qty >= mindis && minq === 0)|| minq === 1){
        //execute partial order
        if(order.category === 0) {
          acceptOrder(id, q.elements[pos].order_id, q.elements[pos].price, order.qty);
        } else {
          acceptOrder(q.elements[pos].order_id, id, q.elements[pos].price, order.qty);
        }
        msg = "Partial order executed!\n"
        //updateAcceptStatus(q.elements[pos].order_id);
        //update qty
        order.qty-=q.elements[pos].qty;
        q.elements[pos].qty = 0;
        if(q.elements[pos].description === 3) {
          if(q.elements[pos].left > 0) {
            if(q.elements[pos].left < q.elements[pos].mindis) {
              q.elements[pos].qty = q.elements[pos].left;
              q.elements[pos].left = 0;
            } else {
              q.elements[pos].qty = q.elements[pos].mindis;
              q.elements[pos].left -= q.elements[pos].mindis;
            }
          }
        }
        if(q.elements[pos].qty === 0 ){
          updateAcceptStatus(q.elements[pos].order_id);
          q.elements[pos].category = -1;
          if(pos === 0) {
            q.dequeue();
          }
        }
        order.minq = 1;
      } else {
        if(order.order_type === 1) {
          rejectOrder(id);
          msg += "Order rejected!\n";
        } else {
          qb.enqueue(order);
          if(order.category === 0)
            msg = "Order waiting! No sellers\n"
          else
            msg = "Order waiting! No buyers\n"
        }
        return;
      }
    }
  }
}

//----------------------------------------------------------------------------------


//execute every 24 hours! Remove expired limit orders
function execute() {
  var ts = new Date();
  //console.log(ts);
  for(var i=0; i < qb.elements.length; i++) {
    if(qb.elements[i].category !== -1) {
      console.log(qb.elements[i].order_time);
      break;
    }
  }
}

//setInterval(() => execute(qs), 1000)

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
    console.log("u generated");
    //qty
    var randomQty = Math.floor(Math.random() * 1000 ) + 1;
    console.log("q generated");
    //category
    var randomCat = Math.round(Math.random());
    console.log("c generated");
    //type
    var randomType = Math.round(Math.random())+1;
    console.log("t generated");
    //price
    var minPrice = parseFloat(marketPrice - (0.12*marketPrice)).toFixed(2);
    var maxPrice = parseFloat(marketPrice + (0.12*marketPrice)).toFixed(2);
    var randomPrice = parseFloat(random(minPrice, maxPrice)).toFixed(2);
    //description
    var d = Math.floor(Math.random() * 4);
    //var d=0;
    console.log("d generated");
    //mindis
    var randomMindis = 0;
    if(d === 2 || d === 3){
      randomMindis = Math.floor(random(1, randomQty));
    }
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

    console.log("all generated");
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
        if(d === 0 || d === 3) {
          console.log("None");
          orders(qs, id, randomOrder.rows[0]);
          console.log("doneb");
        } else if(d === 1) {
          console.log("All or none");
          allOrders(qs, id, randomOrder.rows[0]);
          console.log("doneba");
        } else if (d === 2) {
          console.log("Minimum fill");
          minOrders(qs, id, randomOrder.rows[0]);
          console.log("donebm");
        }
      } else {
        console.log("Sell order");
        if(d === 0 || d === 3) {
          console.log("None" + d);
          console.log("Order random: " + randomOrder.rows[0]);
          orders(qb, id, randomOrder.rows[0]);
          console.log("dones");
        } else if(d === 1) {
          console.log("All or none");
          allOrders(qb, id, randomOrder.rows[0]);
          console.log("donesa");
        } else if (d === 2) {
          console.log("Minimum fill");
          minOrders(qb, id, randomOrder.rows[0]);
          console.log("donesm");
        }
      }
    }
    console.log(msg);
  } catch (err) {
    console.error(err.message);
  }
}

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  exit();
  // application specific logging, throwing an error, or other logic here
});

/*window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled rejection (promise: ', event.promise, ', reason: ', event.reason, ').');
});*/

setInterval(() => generate(), 1000);

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

app.get('/totalOrders', async(req, res) => {
  try {
    const trades = await pool.query(
      "SELECT * FROM orders"
    );
    res.json(trades); //returns json data
  } catch (err) {
      console.error(err.message);
  }
});

app.get('/tradeData', async(req, res) => {
  try {
    const trades = await pool.query(
      "SELECT * FROM trades"
    );
    res.json(trades); //returns json data
  } catch (err) {
      console.error(err.message);
  }
});

app.get('/rejectedOrders', async(req, res) => {
  try {
    var status=0;
    const rejOrders = await pool.query(
      "SELECT * FROM orders where status = $1", [status]
    );
    res.json(rejOrders); //returns json data
  } catch (err) {
      console.error(err.message);
  }
});

app.get('/waitingOrders', async(req, res) => {
  try {
    var status=2;
    const waitOrders = await pool.query(
      "SELECT * FROM orders where status = $1", [status]
    );
    res.json(waitOrders); //returns json data
  } catch (err) {
      console.error(err.message);
  }
});

app.post('/investments', async(req, res) => {
  try {
    const id = req.body.id;
    const orders = await pool.query(
      "SELECT SUM(price) FROM orders WHERE status = 1 AND user_id = $1 AND category = 0", [id]
    );
    res.json(orders); //returns json data
  } catch (err) {
      console.error(err.message);
  }
});

app.post('/benefits', async(req, res) => {
  try {
    const id = req.body.id;
    const orders = await pool.query(
      "SELECT SUM(price) FROM orders WHERE status = 1 AND user_id = $1 AND category = 1", [id]
    );
    res.json(orders); //returns json data
  } catch (err) {
      console.error(err.message);
  }
});

app.post('/userTrades', async(req, res) => {
  try {
    const id = req.body.id;
    const orders = await pool.query(
      "SELECT * FROM orders WHERE status = 1 AND user_id = $1", [id]
    );
    res.json(orders); //returns json data
  } catch (err) {
      console.error(err.message);
  }
});

app.post('/orderData', async(req, res) => {
  try {
    const id = req.body.id;
    console.log(id);
    const orders = await pool.query(
      "SELECT * FROM orders WHERE user_id = $1", [id]
    );
    console.log("Orders" + orders);
    res.json(orders); //returns json data
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

    //get last order's id
    const getOrder = await pool.query(
      //returning * makes it easier to check in POSTMAN!
      "SELECT order_id, order_time FROM orders ORDER BY order_time DESC LIMIT 1"
    );

    var id = getOrder.rows[0].order_id;
    var time = getOrder.rows[0].order_time;

    if(status === 2) {
      if(category === 0) {
        console.log("Buy order");
        if(description === 0 || description === 3) {
          console.log("None");
          orders(qs, id, newOrder.rows[0]);
          console.log("doneb");
        } else if(description === 1) {
          console.log("All or none");
          allOrders(qs, id, newOrder.rows[0]);
        } else if (description === 2) {
          console.log("Minimum fill");
          minOrders(qs, id, newOrder.rows[0]);
        }
      } else {
        console.log("Sell order");
        if(description === 0 || description === 3) {
          console.log("None");
          console.log("dones");
          orders(qb, id, newOrder.rows[0]);
        } else if(description === 1) {
          console.log("All or none");
          allOrders(qb, id, newOrder.rows[0]);
        } else if (description === 2) {
          console.log("Minimum fill");
          minOrders(qb, id, newOrder.rows[0]);
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
