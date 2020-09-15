import React, { Component } from "react";
import './random.css';
import { Row, Col } from 'reactstrap';


const Pictures = (props) =>{
  return(
    <div>
      <div className="thumbnail">
        {" "}
        <img src={props.img} alt="..." className="team-img" />
        <div className="caption">
          <h4>{props.name}</h4>
          <p>{props.job}</p>
        </div>
      </div>
    </div>
  );
}

const Team = () =>{
    return (
      <div id="team" className="text-center" style={{background:'#f4f0ec'}}>
        <div className="container">
        <br/><br/><br/>
          <div className="col-md-8 col-md-offset-2 section-title">
            <h1>Meet the Team</h1>
            <p>
              Our team of developers
            </p>
          </div>
          <div class="container">
                <div class="row">
                  <div class="col-sm">
                        <Pictures img = './team/01.jpg' name="Shambhavi Sarin" job="Developer"/>
                  </div>
                  <div class="col-sm">
                        <Pictures img = './team/01.jpg' name="Shambhavi Sarin" job="Developer"/>
                  </div>
                  <div class="col-sm">
                          <Pictures img = './team/01.jpg' name="Shambhavi Sarin" job="Developer"/>
                  </div>
            </div>
        </div>

          
        </div>
        <br/><br/><br/>
      </div>
    );

}

export default Team;
