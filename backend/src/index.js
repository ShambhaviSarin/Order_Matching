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
   var str = "";
   for(var i = 0; i < this.elements.length; i++)
       console.log(this.elements[i]);
   return str;
};

Queue.prototype.length = function() {
    return this.elements.length;
}

let qb = new Queue();
let qs = new Queue();
var marketPrice = 500;
var msg="Temporary";

//first element category cannot be -1
//if -1 then pop
function getMinPriceOrder(q) {
  var minPos = -1;
  console.log("min price entered");
  while (minPos === -1) {
    minPos = 0;
    if(q.elements[minPos].category === -1) {
      q.dequeue()
      minPos = -1;
      if(q.isEmpty()) {
        return -1;
      }
    }
  }
  for(var i = 0; i < q.elements.length; i++) {
    if(q.elements[i].category !== -1 && q.elements[i].price < q.elements[minPos].price) {
      minPos = i;
    }
  }
  return minPos;
}

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
  const trade = await pool.query(
    "INSERT INTO trades(buyer_id, seller_id, price, qty) VALUES ($1 , $2 , $3 , $4 ) RETURNING *",
    [bid, sid, price, qty]
  );
}

//execute buy limit order
function buyLimitOrders(q, id, order) {
  if(q.isEmpty()) {
    qb.enqueue(order);
    msg = "Order waiting! No sellers\n"
  } else {
    while(order.qty != 0) {
      var pos = getMinPriceOrder(q);
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
        msg = "Order executed!"
        marketPrice = q.elements[pos].price;
        //console.log("Trade executed");
        updateAcceptStatus(id);
        //update qty
        q.elements[pos].qty -= order.qty;
        if(q.elements[pos].qty === 0) {
          updateAcceptStatus(q.elements[pos].order_id);
          q.elements[pos].category = -1;
          if(pos === 0) {
            q.dequeue();
          }
        }
        order.qty=0;
      } else {
        //execute partial order
        acceptOrder(id, q.elements[pos].order_id, q.elements[pos].price, q.elements[pos].qty);
        msg = "Partial order executed!\n"
        marketPrice = q.elements[pos].price;
        updateAcceptStatus(q.elements[pos].order_id);
        //update qty
        order.qty-=q.elements[pos].qty;
        q.elements[pos].qty = 0;
        q.elements[pos].category = -1;
        if(pos === 0) {
          q.dequeue();
        }
      }
    }
  }
}

//execute sell limit order
function sellLimitOrders(q, id, order) {
  if(q.isEmpty()) {
    qs.enqueue(order);
    msg = "Order waiting! No buyers\n"
  } else {
    while(order.qty != 0) {
      var pos = getMinPriceOrder(q);
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
        marketPrice = q.elements[pos].price;
        msg = "Order executed!"
        //console.log("Trade executed");
        updateAcceptStatus(id);
        //update qty
        q.elements[pos].qty -= order.qty;
        if(q.elements[pos].qty === 0) {
          updateAcceptStatus(q.elements[pos].order_id);
          q.elements[pos].category = -1;
          if(pos === 0) {
            q.dequeue();
          }
        }
        order.qty=0;
      } else {
        //execute partial order
        acceptOrder(q.elements[pos].order_id, id, q.elements[pos].price, q.elements[pos].qty);
        msg = "Partial order executed\n"
        marketPrice = q.elements[pos].price;
        updateAcceptStatus(q.elements[pos].order_id);
        //update qty
        order.qty-=q.elements[pos].qty;
        q.elements[pos].qty = 0;
        q.elements[pos].category = -1;
        if(pos === 0) {
          q.dequeue();
        }
      }
    }
  }
}

//execute market order
function marketOrders(q, id, qty) {
  if(q.isEmpty()) {
    rejectOrder(id);
    msg += "Order rejected!\n";
  } else {
    while(qty != 0) {
      var pos = getMinPriceOrder(q);
      if(pos === -1) {
        rejectOrder(id);
        msg += "Order rejected!\n";
      } else if(q.elements[pos].qty >= qty) {
        //trade executes
        acceptOrder(id, q.elements[pos].order_id, q.elements[pos].price, qty);
        msg += "Order executed!\n";
        marketPrice = q.elements[pos].price;
        updateAcceptStatus(id);
        //update qty
        q.elements[pos].qty -= qty;
        if(q.elements[pos].qty === 0) {
          updateAcceptStatus(q.elements[pos].order_id);
          q.elements[pos].category = -1;
          if(pos === 0) {
            q.dequeue();
          }
        }
        qty=0;
      } else {
        //execute partial order
        acceptOrder(id, q.elements[pos].order_id, q.elements[pos].price, q.elements[pos].qty);
        msg += "Partial order executed!\n";
        marketPrice = q.elements[pos].price;
        updateAcceptStatus(q.elements[pos].order_id);
        //update qty
        qty-=q.elements[pos].qty;
        q.elements[pos].qty = 0;
        q.elements[pos].category = -1;
        if(pos === 0) {
          q.dequeue();
        }
      }
    }
  }
}

//execute every 24 hours! Remove expired limit orders
function execute(q) {
    console.log(q.print());
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
    console.log(randomUID);
    //qty
    var randomQty = Math.floor(Math.random() * 1000 ) + 1;
    //var randomQty=1;
    //category
    var randomCat = Math.floor(Math.random() * 2);
    //var randomCat = 1;
    //type
    var randomType = Math.floor(Math.random() * 2);
    //var randomType = 1;
    //price
    //var randomPrice = 1;
    var minPrice = marketPrice - (0.12*marketPrice);
    var maxPrice = marketPrice + (0.12*marketPrice);
    var randomPrice = Math.round(((Math.random() * maxPrice)+minPrice)*100)/100;
    //description
    var d = 0;
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
    msg="";
    const newOrder = await pool.query(
      "INSERT INTO orders(user_id, qty, category, order_type, price, description, status) VALUES ($1 , $2 , $3 , $4 , $5, $6, $7) RETURNING *",
      [randomUID, randomQty, randomCat, randomType, randomPrice, d, randomStatus]
    );

    //get last order's id
    const getOrder = await pool.query(
      "SELECT order_id, order_time FROM orders ORDER BY order_time DESC LIMIT 1"
    );

    var id = getOrder.rows[0].order_id;
    var time = getOrder.rows[0].order_time;

    if(randomStatus === 2) {
      if(randomCat === 0) {
        //console.log("Buy order");
        if(randomType === 1) {
          //console.log("Market order");
          marketOrders(qs, id, randomQty);
        } else {
          //console.log("Limit order");
          buyLimitOrders(qs, id, newOrder.rows[0]);
        }
      } else if(randomCat === 1) {
        //console.log("Sell order");
        if(randomType === 1) {
          //console.log("Market order");
          marketOrders(qb, id, randomQty);
        } else {
          //console.log("Limit order");
          sellLimitOrders(qb, id, newOrder.rows[0]);
        }
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

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
    msg="";
    const newOrder = await pool.query(
      //returning * makes it easier to check in POSTMAN!
      "INSERT INTO orders(user_id, qty, category, order_type, price, description, status) VALUES ($1 , $2 , $3 , $4 , $5, $6, $7) RETURNING *",
      [uid, qty, category, type, price, description, status]
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
        if(type === 1) {
          console.log("Market order");
          marketOrders(qs, id, qty);
        } else {
          console.log("Limit order");
          buyLimitOrders(qs, id, newOrder.rows[0]);
          //execute(qb);
        }
      } else if(category === 1) {
        console.log("Sell order");
        if(type === 1) {
          console.log("Market order");
          marketOrders(qb, id, qty);
        } else {
          console.log("Limit order");
          sellLimitOrders(qb, id, newOrder.rows[0]);
          //execute(qs);
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
