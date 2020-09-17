import React, { useState, useEffect, useLayoutEffect, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,UncontrolledDropdown,
  DropdownToggle,DropdownMenu,DropdownItem,NavbarText,Table,Button,TabContent,TabPane,Row,Col,
  UncontrolledCollapse,Form,FormGroup,Input,Label,Card,Container,CardHeader,CardBody, Media,
Badge, Progress, CardFooter, Pagination, PaginationItem, PaginationLink, UncontrolledTooltip, CardTitle } from 'reactstrap';
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faChartBar,  faChartPie, faUsers, faPercent, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import axios from "axios";
import classnames from 'classnames';
import FooterPage from './FooterPage';
//import UserHeader from './UserHeader';
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
//import { Line, Bar } from "react-chartjs-2";
import {chartOptions,parseOptions,chartExample1,chartExample2} from "./charts.js";

const NavigationBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const orderClick = () => {
      window.location = `/Orders?id=${props.id}`;
    }

    const profileClick = () => {
      window.location = `/Profile?id=${props.id}`;
    }

    const dashClick = () => {
      window.location = `/Shares?id=${props.id}`;
    }

    return(
      <Navbar className="navbar-top navbar-horizontal navbar-light" expand="md">
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
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img alt="..." src={require("./assets/img/theme/team-4-800x800.jpg")}/>
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold" id="name">{props.name}</span>
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
                    <span>My orders</span>
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
    );
}



const OrderTable = (props) => {

  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const pageSize = 6;
  const search = window.location.search; // returns the URL query String
  const params = new URLSearchParams(search);
  const idFromURL = params.get('id');

  const accepted = () => {
    return(
      <Badge color="" className="badge-dot mr-4">
        <i className="bg-success" />
        accepted
      </Badge>
    );
  }

  const rejected = () => {
    return(
      <Badge color="" className="badge-dot mr-4">
        <i className="bg-danger" />
        rejected
      </Badge>
    );
  }

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
            <td>{(row.status === 2)?waiting():(row.status === 1)?accepted():rejected()}</td>
            <td>{((row.description === 2)||(row.description === 3))?row.mindis:"Nil"}</td>
          </tr>
        );
      })
    );
  }

  useEffect(() => {
    const d = {
        id : idFromURL
    }
    console.log(data);
    axios.post('http://localhost:1337/orderData',d).then(res=>{
      const data = res.data.rows;
      console.log(res.data.rows);
      setData(data);
      //setItems(data.slice(0,pageSize));
    }).catch(error => {console.log(error)});
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
                <h3 className="text-white mb-0">Your orders</h3>
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
      <OrderTable />
    </div>
  );
}

const UserHeader = (props) => {

    //const [id, setId] = useState(-1);
    //const id = props.id;
    const [investments, setInvestments] = useState(0);
    const [benefits, setBenefits] = useState(0);
    const [orders, setOrders] = useState(0);
    const [trades, setTrades] = useState(0);
    //const [perf, setPerf] = useState(0);

    useEffect(() => {
      const search = window.location.search; // returns the URL query String
      const params = new URLSearchParams(search);
      const idFromURL = params.get('id');
      console.log(idFromURL);

      const data = {
        id: idFromURL
      }

      axios.post(`http://localhost:1337/investments`, data).then(res => {
        const data = res.data.rows[0].sum;
        console.log(data);
        setInvestments(data);
      }).catch(err => {
          console.log(err);
      });

      axios.post(`http://localhost:1337/benefits`, data).then(res => {
        const data = res.data.rows[0].sum;
        console.log(data);
        setBenefits(data);
      }).catch(err => {
          console.log(err);
      });

      axios.post(`http://localhost:1337/orderData`, data).then(res => {
        const data = res.data.rows;
        console.log(data);
        setOrders(data.length);
      }).catch(err => {
          console.log(err);
      });

      axios.post(`http://localhost:1337/userTrades`, data).then(res => {
        const data = res.data.rows;
        console.log(data);
        setTrades(data.length);
      }).catch(err => {
          console.log(err);
      });

    }, []);

    return (
      <>
        <div style={{marginTop:'-5%', marginBottom:'10%'}}>
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0" style={{background:'#e0e0f8'}}>
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Investments
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{investments}</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <FontAwesomeIcon icon={faChartBar}/>
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <FontAwesomeIcon icon={faArrowUp}/> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0" style={{background:'#e0e0f8'}}>
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Benefits
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{benefits}</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <FontAwesomeIcon icon={faChartPie}/>
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-danger mr-2">
                          <FontAwesomeIcon icon={faArrowDown}/> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last week</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0" style={{background:'#e0e0f8'}}>
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Total orders
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{orders}</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <FontAwesomeIcon icon={faUsers}/>
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-warning mr-2">
                          <FontAwesomeIcon icon={faArrowDown}/> 1.10%
                        </span>{" "}
                        <span className="text-nowrap">Since yesterday</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0" style={{background:'#e0e0f8'}}>
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Performance
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{((trades/orders)*100).toFixed(2)}%</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <FontAwesomeIcon icon={faPercent}/>
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <FontAwesomeIcon icon={faArrowUp}/> 12%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
}

const Orders = (props) => {

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

    return (
      <div style={{marginLeft: '10%', marginRight:'10%', marginTop:'1.5%'}}>
        <NavigationBar id={id} name={name}/>
        <hr style={{marginLeft: '-12%', marginRight:'-12%', marginTop:'-0.2%'}}/>
        <br/><br/><br/>
        <UserHeader id={id}/>
        <Vieew />
        <FooterPage/>
      </div>
    );
}

export default Orders;

/*

*/
