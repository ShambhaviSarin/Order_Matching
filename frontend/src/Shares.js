import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,UncontrolledDropdown,
  DropdownToggle,DropdownMenu,DropdownItem,NavbarText,Table,Button,TabContent,TabPane,Row,Col,
  UncontrolledCollapse,Form,FormGroup,Input,Label,Card,Container,CardHeader,CardBody} from 'reactstrap';
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faCog, faSignOutAlt, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import axios from "axios";
import classnames from 'classnames';
import './Shares.css';
//import { Line, Bar } from "react-chartjs-2";

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

  //console.log(props.marketPrice);
  const category = props.tab;
  const id = props.id;
  const [qty, setQty] = useState(0);
  const [type, setType] = useState('Limit');
  const [price, setPrice] = useState('500');
  const [description, setDescription] = useState(0);
  const [mindis, setMinDis] = useState(0);
  const [hidden, setHidden] = useState(1);
  //((description === 2) || (description === 3))?false:true

  useEffect(() => {
  const interval = setInterval(() => {
    axios.get(`http://localhost:1337/trades`).then(res => {
      const data = res.data;
      console.log(data);
      setPrice(data);
    }).catch(err => {
        console.log(err);
    });
  }, 1000);
    return () => clearInterval(interval);
  }, []);

  return(
    <Form style={{marginTop:'10%', marginLeft:'5%', marginRight:'5%', fontSize:'15px'}}>
      <FormGroup row>
        <Label for="shares" sm={2}>Shares</Label>
        <Col sm={10}>
          <Input type="text" name="shares" id="shares" placeholder="  Enter quantity" style={{marginLeft:'45%', width:'55%', height:'95%', fontSize:'12px', background:'#cce7e8', color:'6E6E6E', border:'none',textAlign:'center'}} onChange={event => setQty(event.target.value)}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="price" sm={2}>Price</Label>
        <Col sm={4}>
          <Input type="select" name="type" id="type" style={{cursor:'pointer', border:'none', marginLeft:'-18%', width:'100%', fontSize:'12px', fontWeight:'bold', marginTop:'4%'}} onChange={event => setType(event.target.value)}>
           <option>Limit</option>
           <option>Market</option>
         </Input>
        </Col>
        <Col sm={6}>
          <Input type="text" readOnly={(type === 'Market')?true:false} value={price} placeholder="  Enter limit" name="price" id="price" style={{width:'100%', height:'95%', fontSize:'12px',  background:'#cce7e8', color:'6E6E6E', border:'none', textAlign:'center'}} onChange={event => setPrice(event.target.value)}/>
        </Col>
      </FormGroup>
      <hr style={{borderTop: 'dashed 1px', color:'#BDBDBD', marginTop:'8%'}} />
      <p id="toggler" style={{textAlign:'left', align:'left', marginTop:'-5%'}}>
        <small style={{fontWeight:'bold', color:'#172b4d', cursor:'pointer'}}>
          <FontAwesomeIcon icon={faCaretRight}/>
          <Label style={{marginLeft:'1%', cursor:'pointer'}}>Advanced Options</Label>
        </small>
      </p>
      <UncontrolledCollapse toggler="#toggler" className="text-muted">
        <Row>
          <Col><Input type="radio" name="radio2" value="None" checked={true} onChange={event => {setDescription(0); setHidden(1)}} />No condition</Col>
          <Col><Input type="radio" name="radio2" value="AllOrNone" onChange={event => {setDescription(1); setHidden(1)}} />All or none</Col>
        </Row>
        <Row>
          <Col><Input type="radio" name="radio2" value="MinimumFill" onChange={event => {setDescription(2); setHidden(0)}} />Minimum fill</Col>
          <Col><Input type="radio" name="radio2" value="DisclosedQty" onChange={event => {setDescription(3); setHidden(0)}} />Disclosed quantity</Col>
        </Row>
        <Row>
          <Col><Input type="text" hidden={hidden} name="mindis" id="mindis" placeholder="  Enter minimum/disclosed quantity" style={{marginTop:'3%', width:'100%', height:'95%', fontSize:'12px', background:'#cce7e8', color:'6E6E6E', border:'none',textAlign:'center'}} onChange={event => setMinDis(event.target.value)}/></Col>
        </Row>
      </UncontrolledCollapse>
      <p id={props.id}></p>
      <Button type="submit" color="info" outline style={{width:'100%', marginTop: '3%'}} onClick={(e)=>{
        e.preventDefault();
        //document.getElementById('errors2').innerHTML="";
        var dataValid=false;
        var errors=[];

        var qtyValid = false;
        //var result = (qty - Math.floor(qty)) === 0;
        var result=1;
        if(qty === ""){
          errors.push("Quantity is a mandatory field.");
        } else if(result) {
            qtyValid=true;
        } else {
          errors.push("Quantity should be a whole number.");
        }

        var priceValid = false;
        if(/^\d*\.?\d*$/.test(price)) {
            priceValid=true;
        } else if(price === ""){
          errors.push("Price is a mandatory field for limit orders.");
        } else {
          errors.push("Invalid price.");
        }


        dataValid = qtyValid && priceValid;
        console.log(dataValid);

        if(dataValid) {
            var order_type = (type === 'Limit') ? 0 : 1;
            var cat = (category === 'BUY') ? 0 : 1;
            var status=2;
            //0->REJECTED
            //1->ACCEPTED
            //2->WAITING
            var tick = 0;
            var rem = price%1;
            if(order_type === 0 && rem%5 !== 0) {
              status=0;
              tick=1;
            }

            var minPrice = price - (0.1*price);
            var maxPrice = price + (0.1*price);
            var circuit = 0;
            if(order_type === 0) {
              if(price < minPrice || price > maxPrice) {
                status = 0;
                circuit = 1;
              }
            }

            const search = window.location.search; // returns the URL query String
            const params = new URLSearchParams(search);
            const idFromURL = params.get('id');

            var left = 0;
            if(description === 3) {
              left = qty;
            }

            var minq = 1;
            if(description === 2) {
              minq = 0;
            }

            const data = {
                uid : idFromURL,
                qty : qty,
                category: cat,
                type: order_type,
                price: price,
                description: description,
                status: status,
                left: left,
                mindis: mindis,
                minq : minq,
                tick: tick,
                circuit: circuit
            }
            console.log(data);
            axios.post('http://localhost:1337/orders',data).then(res=>{
              //console.log(res);
              console.log(res.data);
              document.getElementById(id).innerHTML=res.data;
            }).catch(error => {console.log(error)});
        } else {
          var ul = document.createElement('ul');
          document.getElementById(id).innerHTML="";
          document.getElementById(id).appendChild(ul);
          errors.forEach(function (err) {
            let li = document.createElement('li');
            ul.appendChild(li);
            li.innerHTML += err;
          });
        }
      }}>{props.tab}</Button>
      <p style={{color:'#A4A4A4', marginTop:'3%', fontSize:'12px'}}>100% SAFE AND SECURE</p>
    </Form>
  );
}

const BuySell = () => {
  return(
    <div>



    </div>
  );
}

const Vieew = () => {
  const [activeTab, setActiveTab] = useState('1');
  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const StyleTab = {border:'none', color:'#5dbcd2', borderBottom:'5px solid #5dbcd2'}

  const HoverStyleBuy = {border:'white', outline: 'none', color:'#6E6E6E'}
  const [hoverStyleBuy, setHoverStyleBuy] = useState(0);
  const toggleHoverBuy = style => {
    if(hoverStyleBuy !== style) setHoverStyleBuy(style);
  }

  const HoverStyleSell = {border:'white', outline: 'none', color:'#6E6E6E'}
  const [hoverStyleSell, setHoverStyleSell] = useState(0);
  const toggleHoverSell = style => {
    if(hoverStyleSell !== style) setHoverStyleSell(style);
  }

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
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Microsoft Corporation (MSFT)</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink>
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink>
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  Line
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
                      Place your order
                    </h6>
                    <h2 className="mb-0" style={{marginRight:'-8%', marginLeft:'-8%'}}>
                      <Nav tabs borderless>
                        <NavItem style={{cursor:'pointer', fontWeight:'bold', width:'50%', textAlign:'center'}} onMouseEnter={() => { toggleHoverBuy(!hoverStyleBuy); }} onMouseLeave={() => { toggleHoverBuy(!hoverStyleBuy); }}>
                          <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }} style={(activeTab === '1')?StyleTab:((hoverStyleBuy)?HoverStyleBuy:{color:'#6E6E6E'})} >
                            BUY
                          </NavLink>
                        </NavItem>
                        <NavItem style={{cursor:'pointer', fontWeight:'bold', width:'50%', textAlign:'center', marginRight:'-25%'}} onMouseEnter={() => { toggleHoverSell(!hoverStyleSell); }} onMouseLeave={() => { toggleHoverSell(!hoverStyleSell); }}>
                          <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }} style={(activeTab === '2')?StyleTab:((hoverStyleSell)?HoverStyleSell:{color:'#6E6E6E'})} >
                            SELL
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <TabContent activeTab={activeTab}>

                    <TabPane tabId="1" style={{marginTop: '5%', fontSize:'15px'}}>
                      <OrdersForm tab={"BUY"} id="errorsBuy"/>
                    </TabPane>

                    <TabPane tabId="2" style={{marginTop: '5%', fontSize:'15px'}}>
                      <OrdersForm tab={"SELL"} id="errorsSell"/>
                    </TabPane>

                  </TabContent>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

const Shares = (props) => {
    return (
      <div style={{marginLeft: '10%', marginRight:'10%'}}>
        <NavigationBar />
        <hr style={{marginLeft: '-12%', marginRight:'-12%', marginTop:'-0.2%'}}/>
        <Vieew />
      </div>
    );
}

export default Shares;



/*
<Table style={{width:'100%'}} borderless>
  <tbody>
    <tr>
      <td className="tabledata1">{props.marketPrice}</td>
      <td className="tabledata2"><BuySell/></td>
    </tr>
  </tbody>
</Table>
*/
