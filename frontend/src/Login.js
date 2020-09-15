import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Login.css';
import { Link} from 'react-router-dom';
import axios from "axios";
import {Navbar,NavbarBrand,Nav,NavItem,NavLink,Button,TabContent,TabPane,Row,Col,
  Form,FormGroup,Input,Label,Card, Container,UncontrolledCollapse,CardHeader,
  CardBody,InputGroupAddon,InputGroupText,InputGroup} from 'reactstrap';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import PageFooter from './PageFooter.js';

const Page = () => {

    const [emailLogin, setEmailLogin] = useState('');
    const [pwdLogin, setPwdLogin] = useState('');

    return(
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button className="btn-neutral btn-icon" color="default" href="#pablo" onClick={e => e.preventDefault()}>
                <span className="btn-inner--icon">
                  <img alt="..." src={require("./assets/img/icons/common/github.svg")}/>
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button className="btn-neutral btn-icon" color="default" href="#pablo" onClick={e => e.preventDefault()}>
                <span className="btn-inner--icon">
                  <img alt="..." src={require("./assets/img/icons/common/google.svg")}/>
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Email" type="email" name="email" id="emailLogin" autoComplete="new-email" onChange={event => setEmailLogin(event.target.value)}/>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Password" type="password" name="password" id="passwordLogin" autoComplete="new-password" onChange={event => setPwdLogin(event.target.value)}/>
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input className="custom-control-input" id=" customCheckLogin" type="checkbox"/>
                <label className="custom-control-label" htmlFor=" customCheckLogin">
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={()=>{
                  var dataValid = false;
                  var errors=[];
                  var emLoginValid = false;
                  var pwdLoginValid = false;
                  if(emailLogin === ""){
                    errors.push("Email cannot be blank");
                  } else {
                    emLoginValid = true;
                  }

                  if ( pwdLogin === "") {
                    errors.push("Password cannot be blank");
                  } else {
                    pwdLoginValid = true;
                  }

                  dataValid = emLoginValid && pwdLoginValid;

                  if(dataValid) {
                    axios.get(`http://localhost:1337/login`).then(res => {
                      const data = res.data.rows;
                      console.log(data);
                      console.log(data[0].email);
                      console.log(emailLogin);
                      var emFound = false;
                      var pwCorrect = false;
                      var formValid = false;
                      var id;

                      for(var row = 0; row<data.length; row++) {
                        if(data[row].email === emailLogin) {
                          emFound = true;
                          console.log('Email found');
                          if(data[row].pwd === pwdLogin) {
                            pwCorrect = true;
                            id = data[row].user_id;
                          } else {
                            errors.push("Incorrect email id or password");
                          }
                          break;
                        }
                      }
                      if(emFound === false) {
                        errors.push("Incorrect email id or password");
                      }

                      formValid = emFound && pwCorrect;
                      console.log(formValid);

                      if(formValid) {
                        window.location = `/Shares?id=${id}`;
                      } else {
                        var ul = document.createElement('ul');
                        document.getElementById('errors').innerHTML="";
                        document.getElementById('errors').appendChild(ul);
                        errors.forEach(function (err) {
                          let li = document.createElement('li');
                          ul.appendChild(li);
                          li.innerHTML += err;
                        });
                      }

                    }).catch(err => {
                        console.log(err);
                    });
                  } else {
                    var ul = document.createElement('p');
                    document.getElementById('errors').innerHTML="";
                    document.getElementById('errors').appendChild(ul);
                    errors.forEach(function (err) {
                      let li = document.createElement('li');
                      ul.appendChild(li);
                      li.innerHTML += err;
                    });
                  }

                }}>Sign in</Button>
                <p id="errors" className ="text-center mt-3"></p>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a className="text-light" href="#pablo" onClick={e => e.preventDefault()}>
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a className="text-light" href="#pablo" onClick={e => e.preventDefault()}>
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    );
}

const NavigationBar = () => {
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
                <NavLink className="nav-link-icon" to="/Register" tag={Link}>
                  <i className="ni ni-circle-08" />
                  <span className="nav-link-inner--text">Register</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link-icon" target="_blank" href="https://github.com/ShambhaviSarin/Order_Matching">
                  <FontAwesomeIcon icon={faGithub}/><span className="nav-link-inner--text">Github</span>
                </NavLink>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
}

const Login = () => {
  return(
    <>
    <div className="main-content" style={{background:'#172b4d'}}>
      <NavigationBar />
      <div className="header bg-gradient-info py-7 py-lg-8">
        <div className="separator separator-bottom separator-skew zindex-100" style={{height:'500%'}}>
          <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
            <polygon className="fill-default" points="0,100 2560,100 2560,20" />
          </svg>
        </div>
      </div>
      {/* Page content */}
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Page/>
        </Row>
      </Container>
    <PageFooter />
    </div>
    </>
);
}

export default Login;
