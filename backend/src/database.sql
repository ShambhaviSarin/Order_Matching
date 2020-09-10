/*POSTGRES CODE*/

psql -U postgres
/*Enter password*/

CREATE DATABASE order_matching;
\c order_matching


CREATE TABLE users (
	user_id serial PRIMARY KEY,
	full_name VARCHAR ( 100 ) NOT NULL,
	contact VARCHAR (15) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
  gender VARCHAR(10) NOT NULL,
  pwd VARCHAR(50) NOT NULL
);

CREATE TABLE orders (
	order_id serial PRIMARY KEY,
  user_id INT NOT NULL,
  order_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
	qty INT NOT NULL,
  category INT NOT NULL,
  order_type INT NOT NULL,
  price INT NOT NULL,
	description INT NOT NULL,
  status INT NOT NULL,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
	     REFERENCES users(user_id)
);

CREATE TABLE trades (
	trade_id serial PRIMARY KEY,
	buyer_id INT NOT NULL,
	seller_id INT NOT NULL,
	price INT NOT NULL,
  qty INT NOT NULL,
  trade_time TIMESTAMP (3) NOT NULL,
  CONSTRAINT fk_tradeBuy
    FOREIGN KEY(buyer_id)
	     REFERENCES orders(order_id),
  CONSTRAINT fk_tradeSell
    FOREIGN KEY(seller_id)
       REFERENCES orders(order_id)
);
