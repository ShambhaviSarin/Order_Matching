import React from 'react';

const Footer = () => {
    return (
        <div className="main-footer" style={{ background:"#242050"}}>
        <div className="footer-middle">
        <div className="container">
            <font color= "white">
            <div className="row"><br/><br/><br/>
            <div className="col-md-3 col-sm-6">
                <h2 style={{ marginTop: '20%' }}><font color= "white">Forex Trading</font></h2>
                <ul className="list-unstyled">
                    <li>What is Forex?</li>
                    <li>EUR/USD</li>
                    <li>USD/JPY</li>
                    <li>GBP/USD</li>
                </ul>
            </div>
            <div className="col-md-3 col-sm-6">
                <h2 style={{ marginTop: '20%' }}><font color= "white">Stock Market</font></h2>
                <ul className="list-unstyled">
                    <li>IPOs/FPOs</li>
                    <li>Market Data</li>
                    <li>Expert Views</li>
                    <li>NASDAQ</li>
                </ul>
            </div>
            <div className="col-md-3 col-sm-6">
                <h2 style={{ marginTop: '20%' }}><font color= "white">Education</font></h2>
                <ul className="list-unstyled">
                    <li>Trading for beginners</li>
                    <li>Economic indicators</li>
                    <li>Videos</li>
                    <li>Ebook</li>
                    <li>Order types</li>
                </ul>
            </div>
            <div className="col-md-3 col-sm-6">
            <h2 style={{ marginTop: '20%' }}><font color= "white">About</font></h2>
                  <ul className="list-unstyled">
                    <li>Why Choose Us?</li>
                    <li>Trader Benefits</li>
                    <li>Partners</li>
                    <li>Awards</li>
                    <li>FAQ</li>
                </ul>
            </div>
          </div>
          <hr/>
        {/*footer bottom*/}
           <div className="footer-bottom">
           <p className="text-xs-centre">
            &copy;{new Date().getFullYear()} M.A.R.S.S. App - All Rights Reserved
           </p>
           </div>
           </font>
        </div>
        </div>
        </div>
    );
}

export default Footer;

/*<div>
 <div style={{marginLeft: '5%', marginRight:'5%'}}>
   <NavigationBar />
   <hr style={{marginLeft: '-2%', marginRight:'-2%', marginBottom:'-10%'}}/>
 </div>
</div>
<section id="main">
         <div className="main-text" style={{ marginTop: "10%" }}>
             <span>Investing in your future is now </span> <br /> Smarter. <br />
             Simpler.<br /> Safer.<br/>
      </div>
      <UndrawReport
             primaryColor='#7c7cdd'
             height='520px'
      />
 </section>
 <Footer />*/
