import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,UncontrolledDropdown,
  DropdownToggle,DropdownMenu,DropdownItem,NavbarText,Button} from 'reactstrap';


const FrontPage = () => {
  //render(){
    return(
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">M.A.R.S.S.</NavbarBrand>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
            </Nav>
            <NavbarText>
            <Nav>
              <Link to="/Shares"><Button outline color="info">Login/Register</Button></Link>
            </Nav>
            </NavbarText>
          </Navbar>
      </div>
    );
  //}
}

export default FrontPage;
