import React, { useState, useEffect, useLayoutEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,UncontrolledDropdown,
  DropdownToggle,DropdownMenu,DropdownItem,NavbarText,Table,Button,TabContent,TabPane,Row,Col,
  UncontrolledCollapse,Form,FormGroup,Input,Label,Card,Container,CardHeader,CardBody, Media,
Badge, Progress, CardFooter, Pagination, PaginationItem, PaginationLink, UncontrolledTooltip} from 'reactstrap';
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight  } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import axios from "axios";
import classnames from 'classnames';
import FooterPage from './FooterPage';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
//import { Line, Bar } from "react-chartjs-2";
import {chartOptions,parseOptions,chartExample1,chartExample2} from "./charts.js";

const NavigationBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const search = window.location.search; // returns the URL query String
    const params = new URLSearchParams(search);
    const idFromURL = params.get('id');
    const [id, setId] = useState(idFromURL);
    //setId(idFromURL);

    const profileClick = () => {
      window.location = `/Profile?id=${id}`;
    }

    const dashClick = () => {
      window.location = `/Admin?id=${id}`;
    }

    return(
      <>
        <Navbar className="navbar-top navbar-horizontal navbar-light" expand="md">
          <Container className="px-4">
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
                <UncontrolledDropdown nav>
                  <DropdownToggle className="pr-0" nav>
                    <Media className="align-items-center">
                      <span className="avatar avatar-sm rounded-circle">
                        <img alt="..." src={require("./assets/img/theme/team-4-800x800.jpg")}/>
                      </span>
                      <Media className="ml-2 d-none d-lg-block">
                        <span className="mb-0 text-sm font-weight-bold" id="name">Admin</span>
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
                    <DropdownItem divider />
                    <DropdownItem href="/">
                      <i className="ni ni-user-run" />
                      <span>Logout</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </>
    );
}

const WaitingOrdersTable = (props) => {

  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const pageSize = 6;
  const search = window.location.search; // returns the URL query String
  const params = new URLSearchParams(search);
  const idFromURL = params.get('id');

  const waiting = () => {
    return(
      <Badge color="" className="badge-dot mr-4">
        <i className="bg-info" />
        waiting
      </Badge>
    );
  }

  const pageData = (items) => {
    return(
      items.map((row) => {
        return (
          <tr>
            <td>{row.order_id}</td>
            <td>{row.user_id}</td>
            <td>${row.price}</td>
            <td>{row.qty}</td>
            <td>{row.order_time}</td>
            <td>{(row.category)?"Sell":"Buy"}</td>
            <td>{(row.order_type)?"Market":"Limit"}</td>
            <td>{(row.description === 0)?"None":(row.description === 1)?"All or none":(row.description === 2)?"Minimum Fill":"Disclosed quantity"}</td>
            <td>{waiting()}</td>
            <td>{((row.description === 2)||(row.description === 3))?row.mindis:"Nil"}</td>
          </tr>
        );
      })
    );
  }

  useEffect(() => {

    axios.get(`http://localhost:1337/waitingOrders`).then(res => {
      const wd = res.data.rows;
      console.log(wd);
      setData(wd);
    }).catch(err => {
        console.log(err);
    });
  }, []);

  const [active, setActive] = useState(1);
  const [one, setOne] = useState(0);
  const [two, setTwo] = useState(1);
  const [three, setThree] = useState(2);

  const increment = () => {
    if(page < Math.floor(data.length/pageSize)) {
      var p = page+1;
      if(p === 1)
        setActive(2);

      setOne(page);
      setTwo(page+1);
      setThree(page+2);
      setPage(p);
    }
  }

  const decrement = () => {
    if(page > 0) {
      var p = page-1;
      if(p === 0)
        setActive(1);

      if(p !== 0) {
        setOne(page-2);
        setTwo(page-1);
        setThree(page);
      }
      setPage(p);
    }
  }

  return(
    <>
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Rejected orders</h3>
              </CardHeader>
              <Table className="align-items-center bg-transparent border-0" responsive style={{color:'white', overflow:'hidden', marginBottom:'-1%', borderTop:'1px solid #5272e4'}}>
                <thead style={{borderTop:'1px solid #5272e4'}}>
                  <tr style={{color:'#5272e4', backgroundColor:'#18264d', borderBottom:'1px solid #5272e4'}}>
                    <th scope="col">Order Id</th>
                    <th scope="col">User Id</th>
                    <th scope="col">Price</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Time</th>
                    <th scope="col">Category</th>
                    <th scope="col">Type</th>
                    <th scope="col">Extra condition</th>
                    <th scope="col">Status</th>
                    <th scope="col">Conditional quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {pageData(data.slice(page,page+pageSize))}
                </tbody>
              </Table>
              <CardFooter className="py-4" style={{backgroundColor:'#18264d'}}>
                  <nav aria-label="...">
                    <Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
                      <PaginationItem >
                        <PaginationLink href="#pablo" onClick={() => decrement()}>
                          <FontAwesomeIcon icon={faAngleLeft} />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className={(active === 1)?"active":""}>
                        <PaginationLink href="#pablo" onClick={() => {
                          setPage(one);
                          setActive(1);
                        }}>
                          {one+1}
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className={(active === 2)?"active":""}>
                        <PaginationLink href="#pablo" onClick={() => {
                          setPage(two);
                          setActive(2);
                        }}>
                          {two+1}
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className={(active === 3)?"active":""}>
                        <PaginationLink href="#pablo" onClick={() => setPage(three)}>
                          {three+1}
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#pablo" onClick={() => increment()}>
                          <FontAwesomeIcon icon={faAngleRight} />
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
      <WaitingOrdersTable />
    </div>
  );
}

const Admin2 = (props) => {
    return (
      <div>
        <div>
          <Sidebar />
        </div>
        <div style={{marginLeft:'13%'}}>
          <NavigationBar/>
        </div>
        <div style={{marginLeft: '20%', marginRight:'5%'}}>
          <br/><br/><br/><br/>
          <AdminHeader />
          <Vieew/>
          <FooterPage />
        </div>
      </div>
    );
}

export default Admin2;