import React, { useState, useEffect, useLayoutEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,UncontrolledDropdown,
  DropdownToggle,DropdownMenu,DropdownItem,NavbarText,Table,Button,TabContent,TabPane,Row,Col,
  UncontrolledCollapse,Form,FormGroup,Input,Label,Card,Container,CardHeader,CardBody, Media,
Badge, Progress, CardFooter, Pagination, PaginationItem, PaginationLink, UncontrolledTooltip} from 'reactstrap';
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faCog, faSignOutAlt, faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import axios from "axios";
import classnames from 'classnames';
import FooterPage from './FooterPage';
import Header from './Header';
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
//import { Line, Bar } from "react-chartjs-2";
import {chartOptions,parseOptions,chartExample1,chartExample2} from "./charts.js";

const NavigationBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [name, setName] = useState('Jessica Jones');
    const [id, setId] = useState(-1);

    useEffect(() => {
      const search = window.location.search; // returns the URL query String
      const params = new URLSearchParams(search);
      const idFromURL = params.get('id');
      setId(idFromURL);
      console.log("Id " + idFromURL);
      axios.get(`http://localhost:1337/login`).then(res => {
        const data = res.data.rows;
        console.log(data);
        for(var row = 0; row<data.length; row++) {
          console.log("Entered");
          if(data[row].user_id == idFromURL) {
            console.log("Yes");
            console.log(data[row].full_name);
            setName(data[row].full_name);
            document.getElementById('name').value = data[row].full_name;
            console.log(name);
            break;
          }
        }
      }).catch(err => {
          console.log(err);
      });
    }, []);

    const orderClick = () => {
      window.location = `/Orders?id=${id}`;
    }

    const profileClick = () => {
      window.location = `/Profile?id=${id}`;
    }

    const dashClick = () => {
      window.location = `/Shares?id=${id}`;
    }

    return(
      <Navbar color="link" light expand="md" style={{marginTop:'0.8%'}}>
        <NavbarBrand href="/"><img src={require('./purple_logo.png')} alt="logo" height="50"/></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink target="_blank" href="https://github.com/ShambhaviSarin/Order_Matching">GitHub</NavLink>
            </NavItem>
          </Nav>
          <NavbarText style={{marginRight:'-4%'}}>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img alt="..." src={require("./assets/img/theme/team-4-800x800.jpg")}/>
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold" id="name">{name}</span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItem onClick = {() => dashClick()}>
                    <i className="ni ni-tv-2 text" />
                    <span>Dashboard</span>
                  </DropdownItem>
                  <DropdownItem onClick = {() => profileClick()}>
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem>
                  <DropdownItem onClick = {() => orderClick()}>
                    <i className="ni ni-calendar-grid-58" />
                    <span>Orders</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="/">
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </NavbarText>
        </Collapse>
      </Navbar>
    );
}

const OrderTable = () => {
  return(
    <>
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow" style={{backgroundColor:'#172b4d'}}>
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Your orders</h3>
              </CardHeader>
              <Table className="align-items-center bg-transparent border-0" responsive style={{backgroundColor:'#172b4d', color:'white', overflow:'hidden', marginBottom:'-1%'}}>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Order Id</th>
                    <th scope="col">User Id</th>
                    <th scope="col">Price</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Time</th>
                    <th scope="col">Category</th>
                    <th scope="col">Type</th>
                    <th scope="col">Extra condition</th>
                    <th scope="col">Conditional quantity</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr scope="row">
                    <td></td>
                    <td>$2,500 USD</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        pending
                      </Badge></td>
                  </tr>
                  </tbody>
                </Table>
                <CardFooter className="py-4" style={{backgroundColor:'#172b4d', marginTop:'-1%'}}>
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

const Vieew = () => {
  return(
    <div>
      <OrderTable />
    </div>
  );
}

const Orders = (props) => {
    return (
      <div style={{marginLeft: '10%', marginRight:'10%'}}>
        <NavigationBar />
        <hr style={{marginLeft: '-12%', marginRight:'-12%', marginTop:'-0.2%'}}/>
        <br/><br/><br/><br/>
        <Vieew/>
        <FooterPage />
      </div>
    );
}

export default Orders;

/*


);


*/
