Project: Creating Order Matching System with Specific Type of Orders

Objective:
Creating live order matching software that is used for trading of various financial securities using all type of orders. The order matching software is used to match buy orders with sell orders.

High-level Requirements:
1. Understanding all type of orders and capabilities of the trading system.
2. The orders will flow in live in a simulated environment – so a dummy order flow has to be
created.
3. User must also be able to input the orders.
4. Market rules regarding volatility checks, tick sizes, circuit breakers need to be incorporated.

Software Requirements:
Creating live order matching software that is used for trading of Microsoft shares.

Requirement 1: Order Generator

  1. Develop a random order generator that will generate dummy buy and sell orders and send them to be processed by the Order Matching System.

  2. Each order should contain below info:
    a. Order ID
    b. Order Time (till milliseconds)
    c. Quantity
    d. Order Type
    e. Price (if applicable)
    f. Extra Condition (if applicable)
  3. The order generator should have a manual order criteria entry screen to enter order generation criteria.
  4. Below criteria should be present on this screen:
    a. [Mandatory Selection] Quantity i.e. the number of securities in this order
    b. [Mandatory Selection] Order Category – to identify whether the order was to buy or
    sell
    c. [Mandatory Selection] Order Type (only one type can be selected at a time)
      i. Type1: Limit (User has to specify any price up to 2 decimals subject to Tick Size and Circuit rules. This is the price at which User wants to buy Facebook shares or sell them)
      ii. Type2: Market (without price)
    d. [Optional Selection] Extra condition:
      i. No Extra Condition
      ii. “All or None” i.e. If this criteria is selected, then while order matching, the
      entire quantity of securities should be available to buy or sell. Otherwise the
      trade should not be successful.
      iii. Minimum Fill
      iv. Disclosed Quantity
  5. All the orders generated from the order generator based on above criteria along with all the order details should be exported to MS Excel and placed into a folder. File name should contain timestamp of when these random orders were generated.

Requirement 2: Order Matching
  1. This system should perform order matching to determine which orders were successful and which ones did not succeed.
  2. Order Matching Criteria:
    a. Price has to match
    b. Time of order (if multiple orders with same price, then check time, which one came first)
    c. Quantity
  3. Types of Orders:
    a. “Limit” Orders (when the buy/sell orders are with a price)
      i. Scenario 1: Seller is selling at a price and buyer exists to buy at the same price - expected outcome of the order is that trade is executed successfully.
      ii. Scenario 2: Seller is selling at a price but buyer does not exists to buy at the same price or vice versa - expected outcome order should be waiting.
    b. “Market” orders (when the buy/sell orders are without a price)
      i. User enters an order to buy and there are sellers at various prices then the
      order should be executed at the lowest price.
      ii. User tries to enter an order to buy and there is no seller for that quantity,
      then system should not accept the order.
  4. Circuit Checks  
     Orders should not be accepted if it is 10% higher/lower than the last traded price.
  5. Tick Size
     Limit Orders can only be entered in multiples of 0.05$.
 
Requirement 3: Display Trade List
  1. Develop a screen to display the outcome of the orders processed by the Order Matching System.
    a. Display Trade List
      i. Trade list is for orders that resulted into successful trades.
      ii. Each trade should have a Trade ID.
      iii. Orders that were matched should also be mentioned along with the Trade ID.
  2. List Waiting Orders
    a. Waiting Orders do not have Trade ID since a successful trade did not take place.
  3. List Rejected orders.
    a. Rejected orders do not have Trade ID since a successful trade did not take place.
