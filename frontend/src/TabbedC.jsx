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
    <div><div style={{marginTop:'4%',marginLeft:'10%',marginBottom:'-2%',fontSize:'3rem'}}><font color="#240250">Company Financials</font></div><br/><br/>
    <div className="card text-centre text-dark" style={{marginLeft:'10%',width:'78rem', height:'25rem', marginBottom:'10%'}}>
      <Nav tabs style={{marginTop:'1%',marginLeft:'1%',marginRight:'1%'}}>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Quaterly Results
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Profit and Loss
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
      <TabContent activeTab={activeTab} style={{marginLeft:'1%',marginRight:'1%',marginTop:'5%'}}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <h4>Tab 1 Contents KSFHDASLKZSHFDHA KHFLSDXMORKCMWELIRHUSEBYDRFHOIAS;JMDAESOFKJSELDFVNFKCNGDLKJGESDESCFSDKFGODRJGOIRTHJBNGLFVMDFOPGJPRTGJRTHBs<br/><br/></h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
        <Row>
          <Col sm="12">
            <h4>Tab 2 Contents KSFHDASLKZSHFDHA KHFLSDXMORKCMWELIRHUSEBYDRFHOIAS;JMDAESOFKJSELDFVNFKCNGDLKJGESDESCFSDKFGODRJGOIRTHJBNGLFVMDFOPGJPRTGJRTHBs<br/><br/></h4>
          </Col>
        </Row>
        </TabPane>
        <TabPane tabId="3">
        <Row>
          <Col sm="12">
            <h4>Tab 3 Contents KSFHDASLKZSHFDHA KHFLSDXMORKCMWELIRHUSEBYDRFHOIAS;JMDAESOFKJSELDFVNFKCNGDLKJGESDESCFSDKFGODRJGOIRTHJBNGLFVMDFOPGJPRTGJRTHBs<br/><br/></h4>
          </Col>
        </Row>
        </TabPane>
        <TabPane tabId="4">
        <Row>
          <Col sm="12">
            <h4>Tab 4 Contents KSFHDASLKZSHFDHA KHFLSDXMORKCMWELIRHUSEBYDRFHOIAS;JMDAESOFKJSELDFVNFKCNGDLKJGESDESCFSDKFGODRJGOIRTHJBNGLFVMDFOPGJPRTGJRTHBs<br/><br/></h4>
          </Col>
        </Row>
        </TabPane>
      </TabContent>
    </div>
    </div>
  );
}

export default Tabs;
