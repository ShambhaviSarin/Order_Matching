import React, { Component } from "react";
import './random.css';

export class Team extends Component {
  render() {
    return (
      <div id="team" className="text-center" style={{background:'#f4f0ec'}}>
        <div className="container">
        <br/><br/>
          <div className="col-md-8 col-md-offset-2 section-title">
            <h1>Meet the Team</h1>
            <p>
              Building smarter applications for smart users, by:
            </p>
          </div>
          <div id="row" style={{align:'center'}}>
            {this.props.data
              ? this.props.data.map((d, i) => (
                  <div  key={`${d.name}-${i}`} className="col-md-3 col-sm-6 team" style={{marginLeft:'0%',marginLeft:'5%'}}>
                    <div className="thumbnail" >
                      {" "}
                      <img src={d.img} alt="..." className="team-img"/>
                      <div className="caption">
                        <h4>{d.name}</h4>
                        <p>{d.job}</p>
                      </div>
                    </div>
                  </div>
                ))
              : "loading"}
          </div>
        </div>
        <br/><br/><br/><br/>
      </div>
    );
  }
}
export default Team;
