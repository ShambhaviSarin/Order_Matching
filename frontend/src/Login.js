import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Login.css';
import { Link} from 'react-router-dom';
import {Navbar,NavbarBrand,Nav,NavItem,NavLink,Button,
  TabContent,TabPane,Row,Col,Form,FormGroup,Input,Label} from 'reactstrap';
import classnames from 'classnames';

const NavigationBar = () => {
  return(
    <Navbar color="link" light expand="md" style={{marginTop:'1%'}}>
      <NavbarBrand href="/">M.A.R.S.S.</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="https://github.com/ShambhaviSarin/Order_Matching">GitHub</NavLink>
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

  return (
    <div className="form">
      <Nav tabs>
        <NavItem style={{width:'50%'}}>
          <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }} style={{cursor : 'pointer'}}>
            LOGIN
          </NavLink>
        </NavItem>
        <NavItem style={{width:'50%'}}>
          <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }} style={{cursor : 'pointer'}}>
            REGISTER
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>

        <TabPane tabId="1" style={{marginTop: '5%'}}>
          <Form>
             <FormGroup row>
               <Label for="email" sm={2}>Email</Label>
               <Col sm={10}>
                 <Input type="email" name="email" id="emailLogin" placeholder="marss@ubs.com" />
               </Col>
             </FormGroup>
             <FormGroup row>
               <Label for="password" sm={2}>Password</Label>
               <Col sm={10}>
                 <Input type="password" name="password" id="passwordLogin" placeholder="Enter your password" />
               </Col>
             </FormGroup>
          </Form>
          <Link to="/Shares"><Button color="info" outline>SIGN IN</Button></Link>
        </TabPane>

        <TabPane tabId="2" style={{marginTop: '5%'}}>
          <Form>
            <FormGroup row>
              <Label for="email" sm={4}>Email</Label>
              <Col sm={8}>
                <Input type="email" name="email" id="emailRegister" placeholder="marss@ubs.com" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="name" sm={4}>Name</Label>
              <Col sm={8}>
                <Input type="text" name="name" id="name" placeholder="Enter your name" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="password" sm={4}>Password</Label>
              <Col sm={8}>
                <Input type="password" name="password" id="passwordRegister" placeholder="Enter your password" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="password" sm={4}>Confirm Password</Label>
              <Col sm={8}>
                <Input type="password" name="password" id="passwordRegisterConfirm" placeholder="Confirm your password" />
              </Col>
            </FormGroup>
            <Row form style={{marginTop:'5%', marginRight:'-15%'}} inline>
             <Col md={6}>
               <FormGroup row style={{marginLeft: '15%'}}>
                 <Label for="contact">Contact</Label>
                 <Col md={9}>
                  <Input type="text" name="contact" id="contact" placeholder="Enter your number"/>
                 </Col>
               </FormGroup>
             </Col>
             <Col md={6}>
               <FormGroup row style={{marginRight: '-15%'}}>
                 <Label for="gender" style={{marginTop:'1%'}}>Gender</Label>
                 <Col md={7}>
                   <Input type="select" name="gender" id="gender" style={{cursor:'pointer'}}>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Others</option>
                  </Input>
                </Col>
               </FormGroup>
             </Col>
           </Row>
          </Form>
          <Link to="/Shares"><Button style={{marginTop: '1%'}} color="info" outline>SIGN UP</Button></Link>
        </TabPane>

      </TabContent>

    </div>
  );
}

const Login = () => {
  //render(){
    return(
      <div style={{marginLeft: '10%', marginRight:'10%'}}>
          <NavigationBar />
          <hr />
          <LoginForm />
      </div>
    );
  //}
}

export default Login;

/*
return(
  <div align="center">
    <Form>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="marss@ubs.com" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="Enter your password" />
          </FormGroup>
        </Col>
      </Row>
    </Form>


);
*/
