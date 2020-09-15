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
import { faTransgenderAlt } from '@fortawesome/free-solid-svg-icons';
import PageFooter from './PageFooter.js';

const Reg = () => {

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('Male');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [privacyPolicy, setPrivacyPolicy] = useState(0);

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Sign up with</small>
            </div>
            <div className="text-center">
              <Button className="btn-neutral btn-icon mr-4" color="default" href="#pablo" onClick={e => e.preventDefault()}>
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
              <small>Or sign up with credentials</small>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Name" type="text" name="name" id="name" onChange={event => setName(event.target.value)}/>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Email" type="email" name="email" id="emailRegister" onChange={event => setEmail(event.target.value)} autoComplete="new-email"/>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-mobile-button" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Contact" type="text" name="contact" id="contact" onChange={event => setContact(event.target.value)}/>
                </InputGroup>
              </FormGroup>
              <FormGroup check>
                <Row className="text-muted mb-3">
                  <Col sm={1} style={{marginLeft:'-2%', fontWeight:'bold'}}><FontAwesomeIcon icon={faTransgenderAlt}/></Col>
                  <Col sm={3} style={{marginLeft:'-3.5%', fontWeight:'bold'}}><Label>Gender:</Label></Col>
                  <Col ><Input type="radio" name="radio2" value="Male" checked={true} onChange={event => setGender(event.target.value)}/>Male</Col>
                  <Col ><Input type="radio" name="radio2" value="Female" onChange={event => setGender(event.target.value)} />Female</Col>
                  <Col ><Input type="radio" name="radio2" value="Others" onChange={event => setGender(event.target.value)} />Others</Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Password" type="password" autoComplete="new-password" onChange={event => setPassword(event.target.value)}/>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Confirm password" type="password" autoComplete="new-password" onChange={event => setConfirmPassword(event.target.value)}/>
                </InputGroup>
              </FormGroup>
              <div className="text-muted font-italic">
                <small>password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input className="custom-control-input" id="customCheckRegister" type="checkbox" onChange={event => setPrivacyPolicy(1)}/>
                    <label className="custom-control-label" htmlFor="customCheckRegister">
                      <span className="text-muted">I agree with the{" "}
                        <a href="#pablo" onClick={e => e.preventDefault()}>Privacy Policy</a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="button" onClick = {() => {
                  var dataValid=false;
                  var errors=[];
                  document.getElementById('errors1').innerHTML="";

                  var policy = false;
                  if(privacyPolicy === 1)
                    policy = true;
                  else {
                    errors.push("Terms and conditions are mandatory!");
                  }

                  var conValid = false;
                  var con = /[1-9]+[0-9]+/;
                  if(con.test(contact) && contact.length === 10) {
                      conValid=true;
                  } else if(contact === ""){
                    errors.push("Contact is a mandatory field.");
                  } else {
                    errors.push("Invalid contact number.");
                  }

                  var emValid = false;
                  var em = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                  if(em.test(email)) {
                      emValid=true;
                  } else if(email === ""){
                    errors.push("Email is a mandatory field.");
                  } else {
                    errors.push("Invalid email id.");
                  }

                  var pwdValid = false;
                  var pwd = /^[A-Za-z0-9]\w{7,14}$/;
                  if(pwd.test(password) && password.length >= 8 && password===confirmPassword) {
                      pwdValid=true;
                  } else if(password === ""){
                    errors.push("Password is a mandatory field.");
                  } else if (password !== confirmPassword) {
                    errors.push("Confirmed Password doesn't match Password");
                  } else {
                    errors.push("Password should be atleast 8 characters and contain atleast a number.");
                  }

                  dataValid = conValid && emValid && pwdValid;

                  if(dataValid) {
                      const data = {
                          name : name,
                          contact : contact,
                          email : email,
                          gender : gender,
                          password : password
                      }
                      console.log(data);
                      axios.post('http://localhost:1337/login',data).then(res=>{
                        console.log(res);
                        //console.log(res.data);
                        var id = res.data.rows[0].user_id;
                        console.log(id);
                        window.location = `/Shares?id=${id}`;
                      }).catch(error => {console.log(error)});
                  } else {
                    var ul = document.createElement('p');
                    document.getElementById('errors1').innerHTML="";
                    document.getElementById('errors1').appendChild(ul);
                    errors.forEach(function (err) {
                      let li = document.createElement('li');
                      ul.appendChild(li);
                      li.innerHTML += err;
                    });
                  }
                }}>Create account</Button>
                <p id="errors1" className ="text-center mt-3"></p>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
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
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="nav-link-icon" to="/Login" tag={Link}>
                  <i className="ni ni-key-25" />
                  <span className="nav-link-inner--text">Login</span>
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

const Register = () => {

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
          <Reg/>
        </Row>
      </Container>
    <PageFooter />
    </div>
    </>
);
}

/*
<NavItem>
  <NavLink className="nav-link-icon" to="/admin/user-profile" tag={Link}>
    <i className="ni ni-single-02" />
    <span className="nav-link-inner--text">Profile</span>
  </NavLink>
</NavItem>
}*/

export default Register;
