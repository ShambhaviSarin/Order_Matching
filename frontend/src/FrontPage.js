import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link} from 'react-router-dom';
import Footer from './footer';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarText, Button } from 'reactstrap';
import New_elements from "./new_elements.jsx";

const NavigationBar = () => {
  return(
    <Navbar color="#7c7cdd" light expand="md" style={{marginTop:'1%'}}>
      <NavbarBrand href="/"><img src={require('./purple_logo.png')} alt="logo" height="50"/></NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink target="_blank" href="https://github.com/ShambhaviSarin/Order_Matching">GitHub</NavLink>
          </NavItem>
        </Nav>
        <NavbarText>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink className="nav-link-icon" to="/Login" tag={Link}>
                <i className="ni ni-key-25" />
                <span className="nav-link-inner--text">Login</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link-icon" to="/Register" tag={Link}>
                <i className="ni ni-circle-08" />
                <span className="nav-link-inner--text">Register</span>
              </NavLink>
            </NavItem>
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
          <hr style={{marginLeft: '-2%', marginRight:'-2%', marginBottom:'-12%', marginTop:'0%'}}/>
        </div>
        <section id="main">
          <div className="main-text" style={{ marginTop: "10%" }}>
            <span>Investing in your future is now </span> <br /> Smarter. <br />Simpler.<br /> Safer.<br/>
          </div>
          <img src={require('./investing.svg')} alt="flogo" width="600px" height="600px" />
        </section>
        <New_elements/>
        <Footer />
      </div>
    );
}

export default FrontPage;
