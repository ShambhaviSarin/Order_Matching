import React, { useState, useEffect, useLayoutEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,UncontrolledDropdown,
  DropdownToggle,DropdownMenu,DropdownItem,NavbarText,Table,Button,TabContent,TabPane,Row,Col,
  UncontrolledCollapse,Form,FormGroup,Input,Label,Card,Container,CardHeader,CardBody, Media} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faCog, faSignOutAlt, faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import axios from "axios";
import classnames from 'classnames';
import FooterPage from './FooterPage';
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import {chartOptions,parseOptions,chartExample1,chartExample2} from "./charts.js";

const NavigationBar = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const id = props.id;

  const orderClick = () => {
    window.location = `/Orders?id=${id}`;
  }

  const profileClick = () => {
    window.location = `/Profile?id=${id}`;
  }

  const dashClick = () => {
    if(id == 47) {
      window.location = `/Admin?id=47`;
    } else {
      window.location = `/Shares?id=${id}`;
    }
  }

  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img alt="..." src={require("./white_logo.png")} style={{height:'50px'}}/>
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/"><img alt="..." src={require("./white_logo.png")}/></Link>
                </Col>
              </Row>
            </div>
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
                  {(id!=47)?(<DropdownItem onClick = {() => orderClick()}>
                    <i className="ni ni-calendar-grid-58" />
                    <span>My orders</span>
                  </DropdownItem>):null}
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

const UserHeader = (props) => {
  return (
    <>
      <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{ minHeight: "600px", backgroundImage: "url(" + require("./assets/img/theme/profile-cover.jpg") + ")",
          backgroundSize: "cover", backgroundPosition: "center top" }}>
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row style={{marginTop:'-35%'}}><NavigationBar id={props.id} name={props.name}/></Row>
          <Row style={{marginLeft:'-77%', textAlign:'center'}}>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Hello {props.name}!</h1>
              <p className="text-white mt-0 mb-5">
                This is your profile page. You can see the progress you've<br/>
                made with your work and manage your projects or assigned tasks
              </p>
              <Button color="info" href="#pablo" onClick={e => e.preventDefault()}>
                Edit profile
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

const Vieew = (props) => {
  return (
    <>
      <UserHeader id={props.id} name={props.name}/>
      {/* Page content */}
      <Container className="mt--7" fluid style={{marginLeft:'16.5%'}}>
        <Row>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4" >
                    <Button color="primary" href="#pablo" onClick={e => e.preventDefault()} size="sm">
                      Change password
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form >
                  <h6 className="heading-small text-muted mb-4">User information</h6>
                  <div className="pl-lg-4" >
                    <Row>
                      <Col lg="5" style={{marginRight:'5%'}}>
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-username">
                            Name
                          </label>
                          <Input className="form-control-alternative" value={props.name} id="input-username" type="text" readOnly={true}/>
                        </FormGroup>
                      </Col>
                      <Col lg="5">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-email">
                            Email address
                          </label>
                          <Input className="form-control-alternative" id="input-email" value={props.email} type="email" readOnly={true}/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="5" style={{marginRight:'5%'}}>
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-first-name" >
                            Contact
                          </label>
                          <Input className="form-control-alternative" value={props.contact} id="input-first-name" type="text" readOnly={true}/>
                        </FormGroup>
                      </Col>
                      <Col lg="5">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-last-name">
                            Gender
                          </label>
                          <Input className="form-control-alternative" value={props.gender} id="input-last-name" type="text" readOnly={true}/>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

const Profile = (props) => {

  const [name, setName] = useState('Jessica Jones');
  const [id, setId] = useState(-1);
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [gender, setGender] = useState('');

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
          setEmail(data[row].email);
          setContact(data[row].contact);
          setGender(data[row].gender);
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
      <div>
        <Vieew id={id} name={name} email={email} contact={contact} gender={gender}/>
        <FooterPage />
      </div>
    );
}

export default Profile;
