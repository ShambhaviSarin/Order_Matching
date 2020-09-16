import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import img1 from './assets/image1.jpg';
import './Card-style.css';

const News = props => {
    return (
      <div ><br/><br/><br/><br/><br/>
        <div className="card text-centre" style={{marginLeft:'20%',width:'20rem'}}>
            <div className="overflow">
                <img src={props.imgsrc} alt="image" className='card-img-top'/>
            </div>
                <div className="text-dark" style={{padding:'3rem 0rem'}} >
                    <h1 className="card-title" style={{textAlign:'center'}}>{props.title}</h1>
                    <p className="card-text text-secondary">
                    <font color="black"><h3 style={{textAlign:'center'}}>
                    {props.content}</h3></font>
                    </p>
                    <a href={props.link} className="btn btn-outline-success" style={{marginLeft:'33%'}} >Go to this link</a>
                </div>
        </div>
        <br/><br/><br/><br/><br/>
        </div>
        );
}


export default News;
