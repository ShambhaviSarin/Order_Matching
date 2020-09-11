import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Login.css';
import { Link} from 'react-router-dom';
import axios from "axios";
import {Navbar,NavbarBrand,Nav,NavItem,NavLink,Button,
  TabContent,TabPane,Row,Col,Form,FormGroup,Input,Label} from 'reactstrap';
import classnames from 'classnames';

const NavigationBar = () => {
  return(
    <Navbar color="link" light expand="md" style={{marginTop:'1%'}}>
      <NavbarBrand href="/"><img src={require('./logo.png')} alt="logo" height="50"/></NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink target="_blank" href="https://github.com/ShambhaviSarin/Order_Matching">GitHub</NavLink>
          </NavItem>
        </Nav>
    </Navbar>
  );
}

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState('1');
  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('Male');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailLogin, setEmailLogin] = useState('');
  const [pwdLogin, setPwdLogin] = useState('');

  const StyleTab = {border:'none', color:'#5dbcd2', borderBottom:'5px solid #5dbcd2'}

  const HoverStyleLogin = {border:'white', outline: 'none', color:'#6E6E6E', width:"50%", marginLeft:'25%'}
  const [hoverStyleLogin, setHoverStyleLogin] = useState(0);
  const toggleHoverLogin = style => {
    if(hoverStyleLogin !== style) setHoverStyleLogin(style);
  }

  const HoverStyleReg = {border:'white', outline: 'none', color:'#6E6E6E', width:"50%", marginLeft:'25%'}
  const [hoverStyleReg, setHoverStyleReg] = useState(0);
  const toggleHoverReg = style => {
    if(hoverStyleReg !== style) setHoverStyleReg(style);
  }

  return (
    <div className="form">
      <Nav tabs style={{marginTop:'2%'}}>
        <NavItem style={{width:'50%', cursor:'pointer', fontWeight:'bold'}} onMouseEnter={() => { toggleHoverLogin(!hoverStyleLogin); }} onMouseLeave={() => { toggleHoverLogin(!hoverStyleLogin); }}>
          <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }} style={(activeTab === '1')?StyleTab:((hoverStyleLogin)?HoverStyleLogin:{color:'#6E6E6E'})}>
            LOGIN
          </NavLink>
        </NavItem>
        <NavItem style={{width:'50%', cursor:'pointer', fontWeight:'bold'}} onMouseEnter={() => { toggleHoverReg(!hoverStyleReg); }} onMouseLeave={() => { toggleHoverReg(!hoverStyleReg); }}>
          <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }} style={(activeTab === '2')?StyleTab:((hoverStyleReg)?HoverStyleReg:{color:'#6E6E6E'})}>
            REGISTER
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>

        <TabPane tabId="1" style={{marginTop: '10%'}}>
          <Form>
             <FormGroup row>
               <Label for="email" sm={2}>Email</Label>
               <Col sm={10}>
                 <Input type="email" name="email" id="emailLogin" placeholder="marss@ubs.com" onChange={event => setEmailLogin(event.target.value)}/>
               </Col>
             </FormGroup>
             <FormGroup row>
               <Label for="password" sm={2}>Password</Label>
               <Col sm={10}>
                 <Input type="password" name="password" id="passwordLogin" placeholder="Enter your password" onChange={event => setPwdLogin(event.target.value)}/>
               </Col>
             </FormGroup>
          </Form>
          <Button color="info" outline style={{marginTop:'2%', marginBottom:'2%'}} onClick={()=>{
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

                for(var row = 0; row<data.length; row++) {
                  if(data[row].email === emailLogin) {
                    emFound = true;
                    console.log('Email found');
                    if(data[row].pwd === pwdLogin) {
                      pwCorrect = true;
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
                  window.location = "/Shares";
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
              var ul = document.createElement('ul');
              document.getElementById('errors').innerHTML="";
              document.getElementById('errors').appendChild(ul);
              errors.forEach(function (err) {
                let li = document.createElement('li');
                ul.appendChild(li);
                li.innerHTML += err;
              });
            }

          }}>SIGN IN</Button>
          <p id="errors" style={{textAlign: 'left', marginLeft:'25%', marginTop:'5%'}}></p>
        </TabPane>

        <TabPane tabId="2" style={{marginTop: '10%'}}>
          <Form style={{marginLeft:'-10%'}}>
            <FormGroup row>
              <Label for="email" sm={4}>Email</Label>
              <Col sm={8}>
                <Input type="email" name="email" id="emailRegister" placeholder="marss@ubs.com" onChange={event => setEmail(event.target.value)}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="name" sm={4}>Name</Label>
              <Col sm={8}>
                <Input type="text" name="name" id="name" placeholder="Enter your name" onChange={event => setName(event.target.value)}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="password" sm={4}>Password</Label>
              <Col sm={8}>
                <Input type="password" name="password" id="passwordRegister" placeholder="Enter your password" onChange={event => setPassword(event.target.value)}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="password" sm={4}>Confirm Password</Label>
              <Col sm={8}>
                <Input type="password" name="password" id="passwordRegisterConfirm" placeholder="Confirm your password" onChange={event => setConfirmPassword(event.target.value)}/>
              </Col>
            </FormGroup>
            <Row form style={{marginTop:'5%', marginRight:'-15%'}} inline>
             <Col md={6}>
               <FormGroup row style={{marginLeft: '12%'}}>
                 <Label for="contact" style={{marginTop:'1%'}}>Contact</Label>
                 <Col md={9}>
                  <Input type="text" name="contact" id="contact" placeholder="Enter your number" onChange={event => setContact(event.target.value)}/>
                 </Col>
               </FormGroup>
             </Col>
             <Col md={6}>
               <FormGroup row style={{marginRight: '-12%'}}>
                 <Label for="gender" style={{marginTop:'1%'}}>Gender</Label>
                 <Col md={7}>
                   <Input type="select" name="gender" id="gender" style={{cursor:'pointer'}} onChange={event => setGender(event.target.value)}>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Others</option>
                  </Input>
                </Col>
               </FormGroup>
             </Col>
           </Row>
          </Form>
          <Button style={{marginTop: '2%'}} color="info" outline onClick = {() => {
            var dataValid=false;
            var errors=[];

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
            var pwd = /^[A-Za-z]\w{7,14}$/;
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
                  console.log(res.data);
                  window.location = "/Shares";
                }).catch(error => {console.log(error)});
            } else {
              var ul = document.createElement('ul');
              document.getElementById('errors1').innerHTML="";
              document.getElementById('errors1').appendChild(ul);
              errors.forEach(function (err) {
                let li = document.createElement('li');
                ul.appendChild(li);
                li.innerHTML += err;
              });
            }
          }}>SIGN UP</Button>
          <p id="errors1" style={{textAlign: 'left', marginLeft:'20%', marginTop:'5%'}}></p>
        </TabPane>
      </TabContent>
    </div>
  );
}

const Login = () => {
    return(
      <div style={{marginLeft: '10%', marginRight:'10%'}}>
          <NavigationBar />
          <hr style={{marginLeft: '-12%', marginRight:'-12%'}}/>
          <LoginForm />
      </div>
    );
}

export default Login;
