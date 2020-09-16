import TabContainer from '../node_modules/react-bootstrap/TabContainer';
import React from 'react';
import Tabs from '../node_modules/react-bootstrap/Tabs';
import Tab from '../node_modules/react-bootstrap/Tab';
import MS from './MSFT';


const TabbedC = () =>{
  return(

    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
      <Tab eventKey="home" title="Home">
        <MS/>

      </Tab>
      <Tab eventKey="profile" title="Profile">

      </Tab>
      <Tab eventKey="contact" title="Contact">

      </Tab>
    </Tabs>
  );
}

export default TabbedC;
