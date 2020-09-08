import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,UncontrolledDropdown,
  DropdownToggle,DropdownMenu,DropdownItem,NavbarText,Table,Button,TabContent,TabPane,Row,Col,
  Form,FormGroup,Input,Label} from 'reactstrap';
import classnames from 'classnames';
import './Shares.css';

const NavigationBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return(
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">M.A.R.S.S.</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/ShambhaviSarin/Order_Matching">GitHub</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>
          <Nav>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Orders
                </DropdownItem>
                <DropdownItem>
                  Settings
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          </NavbarText>
        </Collapse>
      </Navbar>
    );
}

const OrdersForm = () => {
  const [activeTab, setActiveTab] = useState('1');
  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return(
    <div className="form">
      <Nav tabs>
        <NavItem style={{width:'50%'}}>
          <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }} style={{cursor : 'pointer'}}>
            BUY
          </NavLink>
        </NavItem>
        <NavItem style={{width:'50%'}}>
          <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }} style={{cursor : 'pointer'}}>
            SELL
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>

        <TabPane tabId="1" style={{marginTop: '5%'}}>
          <Form>
            <FormGroup row>
              <Label for="shares" sm={2}>Shares</Label>
              <Col sm={10}>
                <Input type="text" name="shares" id="sharesBuy" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="price" sm={2}>Price</Label>
              <Col sm={3}>
                <Input type="select" name="type" id="type" style={{cursor:'pointer'}}>
                 <option>Limit</option>
                 <option>Market</option>
               </Input>
              </Col>
              <Col sm={7}>
                <Input type="price" name="price" id="BuyPrice" />
              </Col>
            </FormGroup>
          </Form>
          <Button color="info" outline style={{width:'100%', marginTop: '2%'}}>BUY</Button>
        </TabPane>

        <TabPane tabId="2" style={{marginTop: '5%'}}>
          <Form>
            <FormGroup row>
              <Label for="shares" sm={2}>Shares</Label>
              <Col sm={10}>
                <Input type="text" name="shares" id="sharesSell" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="price" sm={2}>Price</Label>
              <Col sm={3}>
                <Input type="select" name="type" id="type" style={{cursor:'pointer'}}>
                 <option>Limit</option>
                 <option>Market</option>
               </Input>
              </Col>
              <Col sm={7}>
                <Input type="price" name="price" id="SellPrice" />
              </Col>
            </FormGroup>
          </Form>
          <Button color="info" outline style={{width:'100%', marginTop: '2%'}}>SELL</Button>
        </TabPane>

      </TabContent>
    </div>
  );
}

const Shares = (props) => {
    return (
      <div>
        <NavigationBar />
        <Table>
          <tbody>
            <tr>
              <td className="tabledata"></td>
              <td><OrdersForm/></td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
}

export default Shares;
