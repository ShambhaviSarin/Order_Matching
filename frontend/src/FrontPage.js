import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import {Navbar,NavbarBrand,Nav,NavItem,NavLink,NavbarText,Button} from 'reactstrap';

const NavigationBar = () => {
  return(
    <Navbar color="link" light expand="md" style={{marginTop:'1%'}}>
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
  //render(){
    return(
      <div style={{marginLeft: '10%', marginRight:'10%'}}>
        <NavigationBar />
        <hr />
      </div>
    );
  //}
}

export default FrontPage;
