import React from 'react';

const Footer = () => {
    return (
        <div className="main-footer" style={{ background:"#7c7cdd"}}>
        <div className="footer-middle">
        <div className="container">
            <div className="row">
            <div className="col-md-3 col-sm-6">
                <h4 style={{ marginTop: '20%' }}>header</h4>
                <ul className="list-unstyled">
                    <li>hello</li>
                    <li>heya</li>
                    <li>hola</li>
                    <li>bonjour</li>
                </ul>
            </div>
            <div className="col-md-3 col-sm-6">
                <h4 style={{ marginTop: '20%' }}>header</h4>
                <ul className="list-unstyled">
                    <li>hello</li>
                    <li>heya</li>
                    <li>hola</li>
                    <li>bonjour</li>
                </ul>
            </div>
            <div className="col-md-3 col-sm-6">
                <h4 style={{ marginTop: '20%' }}>header</h4>
                <ul className="list-unstyled">
                    <li>hello</li>
                    <li>heya</li>
                    <li>hola</li>
                    <li>bonjour</li>
                </ul>
            </div>
            <div className="col-md-3 col-sm-6">
            <h4 style={{ marginTop: '20%' }}>header</h4>
                <ul className="list-unstyled">
                    <li>hello</li>
                    <li>heya</li>
                    <li>hola</li>
                    <li>bonjour</li>
                </ul>
            </div>
          </div>
        {/*footer bottom*/}
           <div className="footer-bottom">
           <p className="text-xs-centre">
            &copy;{new Date().getFullYear()} M.A.R.S.S. App - All Rights Reserved
           </p>
           </div>
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
