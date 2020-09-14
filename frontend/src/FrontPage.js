import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link} from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarText, Button } from 'reactstrap';

const NavigationBar = () => {
  return(
    <Navbar color="#7c7cdd" light expand="md" style={{marginTop:'1%'}}>
      <NavbarBrand href="/"><img src={require('./logo.png')} alt="logo" height="50"/></NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink target="_blank" href="https://github.com/ShambhaviSarin/Order_Matching">GitHub</NavLink>
          </NavItem>
        </Nav>
        <NavbarText>
        <Nav>
          <Link to="/Login"><Button outline color="info">Login/Register</Button></Link>
        </Nav>
        </NavbarText>
      </Navbar>
  );
}


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


const FrontPage = () => {
    return(
       <div>
        <div style={{marginLeft: '5%', marginRight:'5%'}}>
          <NavigationBar />
          <hr style={{marginLeft: '-2%', marginRight:'-2%', marginBottom:'-10%'}}/>
        </div>
       <section id="main">
                <div className="main-text" style={{ marginTop: "10%" }}>
                    <span>Investing in your future is now </span> <br /> Smarter. <br />
                    Simpler.<br /> Safer.<br/> 
             </div>
              <img src={require('./investing.svg')} alt="flogo" width="600px" height="600px" />
        </section>
        <Footer />
      </div>
    );
}

export default FrontPage;

