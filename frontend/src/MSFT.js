import {Progress} from 'reactstrap';
import React from 'react';
import './Card-style.css';
import './MSFT.css';

const News = props => {
    return (
      <div ><div style={{marginTop:'10%',marginLeft:'10%',marginBottom:'-3%',fontSize:'3rem'}}><font color="#240250">Shareholding Pattern</font></div><br/><br/>
        <div className="card text-centre" style={{marginLeft:'10%',width:'78rem', height:'30rem'}}>
          <div className="text-dark" style={{padding:'2rem 10rem',marginBottom:'-8%'}} >
                <h3 className="card-title" style={{textAlign:'left',marginTop:'5%'}}><font color="#240250">
                    <div id="HASH" class="blue-msg">
                    <span id="time-HASH" class="smalltext">The Vanguard Group</span>
                    <span class="ios-circle"><h5>7.87%</h5></span>
                    </div></font></h3>
                    <Progress now={7.87} max={10} label={`7.87%`} srOnly />
                <h3 className="card-title" style={{textAlign:'left',marginTop:'2%'}}><font color="#240250">
                    <div id="HASH" class="blue-msg">
                    <span id="time-HASH" class="smalltext">BlackRock Fund Advisors</span>
                    <span class="ios-circle"><h5>4.65%</h5></span>
                    </div></font></h3>
                    <Progress now={4.65} max={10} label={`4.65%`} srOnly/>
                <h3 className="card-title" style={{textAlign:'left',marginTop:'2%'}}> <font color="#240250">
                    <div id="HASH" class="blue-msg">
                    <span id="time-HASH" class="smalltext">SgA Funds Management</span>
                    <span class="ios-circle"><h5>4.16%</h5></span>
                    </div></font></h3>
                    <Progress now={4.16} max={10} label={`4.16%`} srOnly/>
                <h3 className="card-title" style={{textAlign:'left',marginTop:'2%'}}>  <font color="#240250">
                    <div id="HASH" class="blue-msg">
                    <span id="time-HASH" class="smalltext">Fidelity Management & Research Co</span>
                    <span class="ios-circle"><h5>2.91%</h5></span>
                    </div></font></h3>
                    <Progress now={2.91} max={10} label={`2.91%`} srOnly/>
                <h3 className="card-title" style={{textAlign:'left',marginTop:'2%'}}>  <font color="#240250">
                    <div id="HASH" class="blue-msg">
                    <span id="time-HASH" class="smalltext">T. Rowe Price Associates</span>
                    <span class="ios-circle"><h5>2.42%</h5></span>
                    </div></font></h3>
                    <Progress now={2.42} max={10} label={`2.42%`} srOnly/>
           </div>

        </div>
        <br/><br/><br/>
        </div>
        );
}


export default News;
