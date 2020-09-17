/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React, {useState} from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
// reactstrap components
import { Collapse,NavbarBrand,Navbar,NavItem,NavLink,Nav,Container} from "reactstrap";


const Sidebar = () => {

    const [collapse, setCollapse] = useState('true');
    // creates the links that appear in the left menu / Sidebar
    const createLinks = (routes) => {
      return routes.map((prop, key) => {
        return (
          <NavItem key={key}>
            <NavLink to={prop.path} tag={NavLinkRRD} activeClassName="active">
              <i className={prop.icon} />{prop.name}
            </NavLink>
          </NavItem>
        );
      });
    };

    var routes = [
      {
        path: "/Admin",
        name: "Trades",
        icon: "ni ni-check-bold text-success"
      },
      {
        path: "/Admin1",
        name: "Rejected Orders",
        icon: "ni ni-fat-remove text-orange"
      },
      {
        path: "/Admin2",
        name: "Waiting Orders",
        icon: "ni ni-bullet-list-67 text-yellow"
      },
      {
        path: "/AdminOrders",
        name: "Orders",
        icon: "ni ni-chart-bar-32 text-red"
      },
      {
        path: "/UserData",
        name: "Users",
        icon: "ni ni-single-02 text-info"
      }
    ];

    return (
      <Navbar className="navbar-vertical fixed-left navbar-light bg-white" expand="md" id="sidenav-main">
        <Container fluid>
          <NavbarBrand className="pt-0" style={{marginTop:'10%'}}>
            <img alt='..' className="navbar-brand-img" src={require('./purple_logo.png')} height="100px"/>
          </NavbarBrand>
          <Collapse navbar isOpen={true}>
            <Nav navbar>{createLinks(routes)}</Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
}

export default Sidebar;
