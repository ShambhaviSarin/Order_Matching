import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link} from 'react-router-dom';
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
    return(
       <div>
        <div style={{marginLeft: '10%', marginRight:'10%'}}>
          <NavigationBar />
          <hr style={{marginLeft: '-12%', marginRight:'-12%'}}/>
        </div>
        <div>
            <img src={require('./flogo.jpg')} alt="flogo" width="1550px" height="600px" />
        </div>
      </div>
    );
}

export default FrontPage;
