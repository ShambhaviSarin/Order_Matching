import {Progress} from 'reactstrap';
import React from 'react';
import './Card-style.css';
import './MSFT.css';

const News = props => {
    return (
      <div ><div style={{marginTop:'10%',marginLeft:'10%',marginBottom:'-2%',fontSize:'2rem'}}><font color="#240250">Shareholding Pattern</font></div><br/><br/>
        <div className="card text-centre" style={{marginLeft:'10%',width:'50rem', height:'25rem'}}>
          <div className="text-dark" style={{padding:'2rem 10rem',marginBottom:'-8%'}} >
                <h3 className="card-title" style={{textAlign:'left',marginTop:'5%'}}><font color="#240250">
                    <div id="HASH" class="blue-msg">
                    <span id="time-HASH" class="smalltext">% of Shares Held by Institutions</span>
                    <span class="ios-circle"><h5>74.09%</h5></span>
                    </div></font></h3>
                  <Progress value='74.09'/>
                <h3 className="card-title" style={{textAlign:'left',marginTop:'2%'}}><font color="#240250">
                    <div id="HASH" class="blue-msg">
                    <span id="time-HASH" class="smalltext">% of Float Held by Institutions</span>
                    <span class="ios-circle"><h5>75.16%</h5></span>
                    </div></font></h3>
                    <Progress value='75.16'/>
                <h3 className="card-title" style={{textAlign:'left',marginTop:'2%'}}> <font color="#240250">
                    <div id="HASH" class="blue-msg">
                    <span id="time-HASH" class="smalltext">% of Top ten Institutes shares</span>
                    <span class="ios-circle"><h5>31.75%</h5></span>
                    </div></font></h3>
                    <Progress value='31.75'/>
                    <h3 className="card-title" style={{textAlign:'left',marginTop:'2%'}}> <font color="#240250">
                        <div id="HASH" class="blue-msg">
                        <span id="time-HASH" class="smalltext">% of Internal Shares</span>
                        <span class="ios-circle"><h5>1.42%</h5></span>
                        </div></font></h3>
                        <Progress value='1.42'/>
           </div>

        </div>
        <br/><br/><br/>
        </div>
        );
}


export default News;
