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

  return (
    <>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Microsoft Corporation (MSFT)
                    </h6>
                    <h2 className="text-white mb-0">Shareholding pattern</h2>
                  </div>
                  <div className="col">
                  <Nav className="justify-content-end" pills>
                    {/*<NavItem>
                      <NavLink className={classnames("py-2 px-3", {active: activeNav === 1})} href="#pablo" onClick={e => toggleNavs(e, 1)}>
                        <span className="d-none d-md-block">Month</span>
                        <span className="d-md-none">M</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className={classnames("py-2 px-3", {active: activeNav === 2})} href="#pablo" onClick={e => toggleNavs(e, 2)}>
                        <span className="d-none d-md-block">Week</span>
                        <span className="d-md-none">W</span>
                      </NavLink>
                    </NavItem>*/}
                  </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                {/*<div className="chart">
                  <Line
                    data={chartExample1[chartData]}
                    options={chartExample1.options}
                    getDatasetAtEvent={e => console.log(e)}
                  />
                </div>*/}
                
                <PieChart
                  radius={40}
                  labelStyle={{
                    fontSize: '3px'
                    }}
                  label={(props) => { return props.dataEntry.title;}}
                  data={[
                    { title: 'Promoter', value: 33, color: '#99badd',label:true,legend:true},
                    { title: 'Foreign Institution ', value: 33, color: '#4682b4',label:true,legend:true },
                    { title: 'Public Holding ', value: 33, color: '#89CFF0',label:true,legend:true }
                  ]}
                  legendData={[{ name: 'Promoters: 33' }, { name: 'Foreign institution: 33' }, { name: 'Public Holding: 10' }]}
                  legendPosition="bottom"

                  
                />;
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

const Vieew = () => {
  return(
    <div>
      <Graphs />
    </div>
  );
}

const AdminOrders = (props) => {
    return (
      <div>
        <div>
          <Sidebar />
        </div>
        <div style={{marginLeft:'13%'}}>
          <NavigationBar/>
        </div>
        <div style={{marginLeft: '13%', marginRight:'1%'}}>
          <br/><br/><br/><br/>
          <AdminHeader />
          <Vieew/>
          <FooterPage />
        </div>
      </div>
    );
}

export default AdminOrders;
