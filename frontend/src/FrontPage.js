import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link} from 'react-router-dom';
import Footer from './footer';
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

const FrontPage = () => {
    return(
       <div>
        <div style={{marginLeft: '5%', marginRight:'5%'}}>
          <NavigationBar />
          <hr style={{marginLeft: '-2%', marginRight:'-2%', marginBottom:'-10%'}}/>
        </div>
        <section id="main">
          <div className="main-text" style={{ marginTop: "10%" }}>
            <span>Investing in your future is now </span> <br /> Smarter. <br />Simpler.<br /> Safer.<br/>
          </div>
          <img src={require('./investing.svg')} alt="flogo" width="600px" height="600px" />
        </section>
        <Footer />
      </div>
    );
}

export default FrontPage;
