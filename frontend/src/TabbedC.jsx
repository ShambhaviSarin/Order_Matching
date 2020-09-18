import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import './Card-style.css';

const Tabs = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div><div style={{marginTop:'0%',marginLeft:'10%',marginBottom:'-2%',fontSize:'2rem'}}><font color="#240250">Company Financials</font></div><br/><br/>
    <div className="card text-centre text-dark" style={{marginLeft:'10%',width:'50rem', height:'30rem', marginBottom:'10%'}}>
      <Nav tabs style={{marginTop:'1%',marginLeft:'1%',marginRight:'1%'}}>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Annual Income Statement
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Quarterly Income Statement
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            Balance Sheet
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle('4'); }}
          >
            Cash Flow
          </NavLink>
        </NavItem>
        </Nav>
      <TabContent activeTab={activeTab} style={{marginLeft:'4%',marginRight:'1%',marginTop:'3%'}}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <img src={require('./assets/annualis.png')} alt="fb" width="750px" height="400px" style={{align:'centre'}}/>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
        <Row>
          <Col sm="12">
              <img src={require('./assets/quarterlyIs.PNG')} alt="fb" width="750px" height="400px" style={{align:'centre'}}/>
            </Col>
        </Row>
        </TabPane>
        <TabPane tabId="3">
        <Row>
          <Col sm="12">
              <img src={require('./assets/balancesheet.PNG')} alt="fb" width="750px" height="400px" style={{align:'centre'}}/>
            </Col>
        </Row>
        </TabPane>
        <TabPane tabId="4">
        <Row>
          <Col sm="12">
                <img src={require('./assets/cashflow.PNG')} alt="fb" width="750px" height="400px" style={{align:'centre'}}/>
                  </Col>
        </Row>
        </TabPane>
      </TabContent>
    </div>
    </div>
  );
}

export default Tabs;
