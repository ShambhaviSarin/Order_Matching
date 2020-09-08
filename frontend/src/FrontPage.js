import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import {Navbar,NavbarBrand,Nav,NavItem,NavLink,NavbarText,Button} from 'reactstrap';

const NavigationBar = () => {
  return(
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">M.A.R.S.S.</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="https://github.com/ShambhaviSarin/Order_Matching">GitHub</NavLink>
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
  //render(){
    return(
      <div>
        <NavigationBar />
      </div>
    );
  //}
}

export default FrontPage;
