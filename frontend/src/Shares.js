import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,UncontrolledDropdown,
  DropdownToggle,DropdownMenu,DropdownItem,NavbarText} from 'reactstrap';

const Shares = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">M.A.R.S.S.</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
            </Nav>
            <NavbarText>
            <Nav>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Orders
                  </DropdownItem>
                  <DropdownItem>
                    Settings
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            </NavbarText>
          </Collapse>
        </Navbar>
        <div>Hello!</div>
      </div>
    );
  }

export default Shares;
