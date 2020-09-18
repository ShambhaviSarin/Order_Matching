import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link} from 'react-router-dom';
import Footer from './footer';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarText, Button, Container, UncontrolledCollapse } from 'reactstrap';
import New_elements from "./new_elements.jsx";
import Animation from "./Animation.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const NavigationBar = () => {
  return(
    <Navbar className="navbar-top navbar-horizontal navbar-light" expand="md" style={{marginTop:'2%'}}>
      <Container className="px-0">
        <NavbarBrand to="/" tag={Link}>
          <img alt="..." src={require("./purple_logo.png")} style={{height:'50px'}}/>
        </NavbarBrand>
        <button className="navbar-toggler" id="navbar-collapse-main">
          <span className="navbar-toggler-icon" />
        </button>
        <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink className="nav-link-icon" target="_blank" href="https://github.com/ShambhaviSarin/Order_Matching">
                <FontAwesomeIcon icon={faGithub}/><span className="nav-link-inner--text">Github</span>
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="align-items-center d-none d-md-flex" navbar>
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
        </UncontrolledCollapse>
      </Container>
    </Navbar>
  );
}

const FrontPage = () => {
    return(
       <div >
        <div style={{marginLeft: '2%', marginRight:'5%'}}>
          <NavigationBar />
          <hr style={{marginLeft: '-2%', marginRight:'-5%', marginBottom:'-12%', marginTop:'0%'}}/>
        </div>
        <Animation/>
        <New_elements style={{background:'white'}}/>
        <Footer />
      </div>
    );
}

export default FrontPage;
