import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.css';
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,UncontrolledDropdown,
  DropdownToggle,DropdownMenu,DropdownItem,NavbarText,Table,Button,TabContent,TabPane,Col,
  Form,FormGroup,Input,Label,Card} from 'reactstrap';
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import styled from 'styled-components';
import classnames from 'classnames';
import './Shares.css';

const NavigationBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return(
      <Navbar color="link" light expand="md" style={{marginTop:'0.8%'}}>
        <NavbarBrand href="/"><img src={require('./logo.png')} alt="logo" height="50"/></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink target="_blank" href="https://github.com/ShambhaviSarin/Order_Matching">GitHub</NavLink>
            </NavItem>
          </Nav>
          <NavbarText style={{marginRight:'-4%'}}>
          <Nav>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret style={{color:'#2c6976'}}>
                <FontAwesomeIcon icon={faUserCircle} size="2x" color="#2c6976"/>
              </DropdownToggle>

              <DropdownMenu right>
                <Table borderless hover>
                <theader>
                <tr>
                <DropdownItem>
                  <th><FontAwesomeIcon icon={faUserCircle}size="3x"/></th>
                  <th>Name<br/>Emailid</th>
                </DropdownItem>
                </tr>
                </theader>
                <DropdownItem divider />
                <tbody>
                <tr style={{marginTop:'-10%'}}>
                <DropdownItem>
                  <td><FontAwesomeIcon icon={faList} size="s"/></td>
                  <td>Orders</td>
                </DropdownItem>
                </tr>
                <tr style={{marginTop:'-10%'}}>
                <DropdownItem>
                  <td><FontAwesomeIcon icon={faCog} size="s"/></td>
                  <td>Settings</td>
                </DropdownItem>
                </tr>
                <DropdownItem divider />
                <tr>
                <Link to="/"><DropdownItem>
                  <td><FontAwesomeIcon icon={faSignOutAlt} size="s"/></td>
                  <td>Logout</td>
                </DropdownItem></Link>
                </tr>
                </tbody>
                </Table>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          </NavbarText>
        </Collapse>
      </Navbar>
    );
}

const OrdersForm = (props) => {
  const { register, errors, handleSubmit, formState } = useForm();
  const onSubmit = values => console.log(values);

  const [activeType, setActiveType] = useState(0);
  const toggle = (type) => {
    if(activeType !== type) setActiveType(type);
  }

  const StyledInput = styled.input`:focus {outline:none; border:none;}`;

  return(
    <Form onSubmit={handleSubmit(onSubmit)} style={{marginTop:'10%', marginLeft:'5%', marginRight:'5%', fontSize:'15px'}}>
      <FormGroup row>
        <Label for="shares" sm={2}>Shares</Label>
        <Col sm={10}>
          <StyledInput type="text" name="shares" id="shares" placeholder="  Enter quantity" style={{marginLeft:'45%', width:'55%', height:'95%', fontSize:'12px', background:'#cce7e8', color:'6E6E6E', border:'none'}} ref={register({required: true})}/>
          {errors.shares && (<span role="alert">This field is required</span>)}
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="price" sm={2}>Price</Label>
        <Col sm={4}>
          <Input type="select" name="type" id="OrderType"
          style={{cursor:'pointer', border:'none', marginLeft:'-18%', width:'100%', fontSize:'12px', fontWeight:'bold', marginTop:'4%'}}
          ref={register({required: true})} onChange={() => { toggle(!activeType); }}>
           <option>Limit</option>
           <option>Market</option>
         </Input>
        </Col>
        <Col sm={6}>
          <StyledInput type="text" readOnly={activeType} value={(activeType == 1) ? "MarketPrice" : null} placeholder="  Enter limit" name="price" id="price" style={{width:'100%', height:'95%', fontSize:'12px',  background:'#cce7e8', color:'6E6E6E', border:'none', }} ref={register({required: true})}/>
          {errors.price && (<span role="alert">This field is required</span>)}
        </Col>
      </FormGroup>
      <hr style={{borderTop: 'dashed 1px', color:'#BDBDBD', marginTop:'8%'}} />
      <Button type="submit" color="info" outline style={{width:'100%', marginTop: '31%'}}>{props.tab}</Button>
      <p style={{color:'#A4A4A4', marginTop:'2%'}}>100% SAFE AND SECURE</p>
    </Form>
  );
}

const BuySell = () => {
  const [activeTab, setActiveTab] = useState('1');
  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const HoverStyleBuy = {border:'white', outline: 'none', color:'#6E6E6E', width:"25%", marginLeft:'14%'}
  const [hoverStyleBuy, setHoverStyleBuy] = useState(0);
  const toggleHoverBuy = style => {
    if(hoverStyleBuy !== style) setHoverStyleBuy(style);
  }

  const HoverStyleSell = {border:'white', outline: 'none', color:'#6E6E6E', width:"25%", marginLeft:'11%'}
  const [hoverStyleSell, setHoverStyleSell] = useState(0);
  const toggleHoverSell = style => {
    if(hoverStyleSell !== style) setHoverStyleSell(style);
  }

  return(
    <div className="formS">
      <Nav tabs>
        <NavItem style={{width:'25%', cursor : 'pointer', fontWeight:'bold'}} onMouseEnter={() => { toggleHoverBuy(!hoverStyleBuy); }} onMouseLeave={() => { toggleHoverBuy(!hoverStyleBuy); }}>
          <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }} style={(activeTab === '1')?{border:'none', color:'#5dbcd2', borderBottom:'5px solid #5dbcd2'}:((hoverStyleBuy)?HoverStyleBuy:{color:'#6E6E6E'})} >
            BUY
          </NavLink>
        </NavItem>
        <NavItem style={{width:'25%', cursor : 'pointer', fontWeight:'bold'}} onMouseEnter={() => { toggleHoverSell(!hoverStyleSell); }} onMouseLeave={() => { toggleHoverSell(!hoverStyleSell); }}>
          <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }} style={(activeTab === '2')?{border:'none', color:'#5dbcd2', borderBottom:'5px solid #5dbcd2'}:((hoverStyleSell)?HoverStyleSell:{color:'#6E6E6E'})} >
            SELL
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>

        <TabPane tabId="1" style={{marginTop: '5%', fontSize:'15px'}}>
          <OrdersForm tab={"BUY"}/>
        </TabPane>

        <TabPane tabId="2" style={{marginTop: '5%', fontSize:'15px'}}>
          <OrdersForm tab={"SELL"}/>
        </TabPane>

      </TabContent>
    </div>
  );
}

const Shares = (props) => {
    return (
      <div style={{marginLeft: '10%', marginRight:'10%'}}>
        <NavigationBar />
        <hr style={{marginLeft: '-12%', marginRight:'-12%', marginTop:'-0.2%'}}/>
        <Table style={{width:'100%'}} borderless>
          <tbody>
            <tr>
              <td className="tabledata1"></td>
              <td className="tabledata2"><BuySell/></td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
}

export default Shares;
