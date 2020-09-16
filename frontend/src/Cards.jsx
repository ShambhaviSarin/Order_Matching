import React,{Component} from 'react';
import Ca from './CardUi.jsx';
import img1 from './assets/image1.jpg';
import img2 from './assets/image2.jpg';
import img3 from './assets/image3.jpg';
class Cards extends Component{
  render(){
    return(
    <div className="container-fluid d-flex justify-content-center">
        <div className="row">
            <div className="col-md-4">
                <Ca imgsrc={img1} title="The Economic Times" content="This zero-debt firm powers its way up the ladder; BUY calls galore" link="https://economictimes.indiatimes.com/markets/stocks/news/this-zero-debt-firm-powers-its-way-up-the-ladder-buy-calls-galore/articleshow/78102405.cms" />
            </div>
            <div className="col-md-4">
                <Ca imgsrc={img2} title="Financial Express" content="Stock selection: Value investing is essential in today’s market" link="https://www.financialexpress.com/market/stock-selection-value-investing-is-essential-in-todays-market/2083176/"/>
            </div>
            <div className="col-md-4">
                <Ca imgsrc={img3} title="THE WALL STREET" content="Why Did Stock Markets Rebound From Covid with Time?" link="https://www.wsj.com/articles/why-did-stock-markets-rebound-from-covid-in-record-time-here-are-five-reasons-11600182704"/>
            </div>
        </div>
    </div>
    );
  }
}

export default Cards;
