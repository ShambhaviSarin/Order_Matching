import React, { useState } from 'react';
import { TabContent, Table, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import './Card-style.css';
import './MSFT.css';

const About = (props) => {
  return (

    <div><div style={{marginTop:'-5%',marginLeft:'10%',marginBottom:'-2%',fontSize:'2rem'}}><font color="#240250">Company Statistics</font></div><br/><br/>
    <div className="card text-centre text-dark" style={{marginLeft:'10%',width:'50rem', height:'25rem', marginBottom:'10%'}}>
    <Table borderless  style={{marginTop:'8%',marginLeft:'3%',marginRight:'0%'}}>
      <tbody >
        <tr >
          <th>Market Cap</th>
          <th>Forward P/E 1yr</th>
          <th>P/E Ratio</th>
          <th>Industry P/E</th>
        </tr>
        <tr>
          <td>1,566,806,863,662</td>
          <td>32.67</td>
          <td>36.01</td>
          <td>36.31</td>
        </tr><br/>
        <tr>
        <th>Div. Yield</th>
        <th>BookValue</th>
        <th>Revenue(TTM)</th>
        <th>ROE</th>
        </tr>
        <tr>
          <td>0.98%</td>
          <td>13.35</td>
          <td>143.02B</td>
          <td>39%</td>
        </tr>
      </tbody>
    </Table>
    </div>
    <div style={{marginTop:'-5%',marginLeft:'10%',marginBottom:'-2%',fontSize:'2rem'}}><font color="#240250">About the Company</font></div><br/><br/>
    <div className="text-centre text-dark" style={{marginLeft:'10%',width:'50rem', height:'30rem', marginBottom:'10%'}}>
    <p style={{marginLeft:'0%',marginTop:'3%',marginRight:'1%0',marginBottom:'1%'}}>About Microsoft Corporation
      Microsoft Corporation is a technology company. The Company develops, licenses, and supports a range of software products, services and devices.
      The Company's segments include Productivity and Business Processes, Intelligent Cloud and More Personal Computing. The Company's products include
      operating systems; cross-device productivity applications; server applications; business solution applications; desktop and server management tools;
      software development tools; video games, and training and certification of computer system integrators and developers. It also designs, manufactures,
      and sells devices, including personal computers (PCs), tablets, gaming and entertainment consoles, phones, other intelligent devices,
      and related accessories, that integrate with its cloud-based offerings. It offers an array of services, including cloud-based solutions that provide
      customers with software, services, platforms, and content, and it provides solution support and consulting services.</p>
    <p style={{marginLeft:'0%',marginTop:'2%',marginRight:'0%',marginBottom:'2%'}}>
    <h5 className="card-title" style={{textAlign:'left',marginTop:'5%'}}><font color="#240250">
        <div id="HASH" class="blue-msg">
        <span id="time-HASH" class="smalltext">INDUSTRY</span>
        <span class="ios-circle"><h5>EXECUTIVE LEADERSHIP</h5></span>
        </div></font></h5>
  <h3 className="card-title" style={{textAlign:'left',marginTop:'-3%'}}><font color="#240250">
        <div id="HASH" class="blue-msg">
        <span id="time-HASH" class="smalltext">Software & Programming</span>
        <span class="ios-circle"><h3>John Wendell Thompson</h3></span>
        </div></font></h3>
  <h5 className="card-title" style={{textAlign:'left',marginTop:'-1%'}}><font color="#240250">
            <div id="HASH" class="blue-msg">
            <span id="time-HASH" class="smalltext">CONTACT INFO</span>
            <span class="ios-circle"><h5>Independent Non-Executive Chairman of the Board</h5></span>
            </div></font></h5>
  <h3 className="card-title" style={{textAlign:'left',marginTop:'-3%'}}><font color="#240250">
            <div id="HASH" class="blue-msg">
            <span id="time-HASH" class="smalltext">https://www.microsoft.com/en-us</span>
            <span class="ios-circle"><h3>John Wendell Thompson</h3></span>
            </div></font></h3>
            </p>
    </div>
    </div>

  );
}

export default About;
