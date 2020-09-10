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

//create orders
//Anytime we create or get data, it will take some time.
//Async provides a method called await() which waits for the function to complete before it continues
app.post("/login", async(req, res) => {
  try {
    var name = req.body.name;
    var contact = req.body.contact;
    var email= req.body.email;
    var gender = req.body.gender;
    var password = req.body.password;
    const newBooking = await pool.query(
      //returning * makes it easier to check in POSTMAN!
      "INSERT INTO users(full_name, contact, email, gender, pwd) VALUES ($1 , $2 , $3 , $4 , $5) RETURNING *",
      [name, contact, email, gender, password]
    );
    res.json("Accepted"); //returns accepted status code
    console.log(name);
  } catch (err) {
      console.error(err.message);
    }
});

app.post("/orders", async(req, res) => {
  try {
    var uid = req.body.uid;
    var qty= req.body.qty;
    var category = req.body.category;
    var type = req.body.type;
    var price = req.body.price;
    var description = req.body.description;
    var status=0;
    const newBooking = await pool.query(
      //returning * makes it easier to check in POSTMAN!
      "INSERT INTO orders(user_id, qty, category, order_type, price, description, status) VALUES ($1 , $2 , $3 , $4 , $5, $6, $7) RETURNING *",
      [uid, qty, category, type, price, description, status]
    );
    res.json("Accepted"); //returns accepted status code
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
