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
import { PieChart,
  Legend,
} from 'react-minimal-pie-chart';

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

const Graphs = (props) => {

  const [activeTab, setActiveTab] = useState('1');
  const [activeNav, setActiveNav] = useState(1);
  const [chartData, setChartData] = useState('data1');

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    var chartData1 = (chartData === "data1") ? "data2" : "data1";
    setChartData(chartData1)
  };

  const [w, setW] = useState(31.5);
  const [r, setR] = useState(31.8);
  const [a, setA] = useState(36.66);
  const [total, setTotal] = useState(15975);

  useEffect(() => {
    axios.get(`http://localhost:1337/rejectedOrders`).then(res => {
      const data = res.data.rows.length;
      console.log(data);
      setR(data);
      console.log(r);
    }).catch(err => {
        console.log(err);
    });

    axios.get(`http://localhost:1337/waitingOrders`).then(res => {
      const data = res.data.rows.length;
      console.log(data);
      setW(data);
      console.log(w);
    }).catch(err => {
        console.log(err);
    });

    axios.get(`http://localhost:1337/totalOrders`).then(res => {
      const data = res.data.rows.length;
      console.log(data);
      setTotal(data);
      console.log(total);
      const a = total - (w+r);
      setA(a);
      setW((w/total)*100);
      setR((r/total)*100);
      setA((a/total)*100);
      console.log(w);
      console.log(r);
      console.log(a);
    }).catch(err => {
        console.log(err);
    });
  }, []);

  return (
    <>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="6">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Microsoft Corporation (MSFT)
                    </h6>
                    <h2 className="text-white mb-0">Orders</h2>
                  </div>
                  <div className="col">
                  <Nav className="justify-content-end" pills>
                  </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                <PieChart
                  radius={50}
                  labelStyle={{
                    fontSize: '3px'
                    }}
                  label={(props) => { return props.dataEntry.title;}}
                  data={[
                    { title: 'Waiting orders ', value: 31.5, color: '#89CFF0',label:true,legend:true },
                    { title: 'Completed orders', value: 32.8, color: '#99badd',label:true,legend:true},
                    { title: 'Rejected orders ', value: 35.7, color: '#4682b4',label:true,legend:true }
                  ]}
                  legendData={[{ name: 'Promoters: 33' }, { name: 'Foreign institution: 33' }, { name: 'Public Holding: 10' }]}
                  legendPosition="bottom"
                />;
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Total orders</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

const AdminOrders = (props) => {
    return (
      <div>
        <div>
          <Sidebar />
        </div>
        <div style={{marginRight:'-10%'}}>
          <NavigationBar/>
        </div>
        <div style={{marginLeft:'20%', marginTop:'8%', marginRight:'3%'}}>
          <AdminHeader />
        </div>
        <div style={{marginLeft: '20%', marginRight:'-13%', marginTop:'-5%'}}>
          <br/><br/><br/><br/>
          <Graphs/>
        </div>
        <div style={{marginLeft:'17%'}}>
          <FooterPage />
        </div>
      </div>
    );
}

export default AdminOrders;
