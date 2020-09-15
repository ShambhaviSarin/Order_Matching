import React from "react";
import web from "./investing.svg";
import './Animation.css';

const Animation = () => {
    return (
        <>
            <section id="header" className="d-flex align-items-center">
                <div className="container-fluid nav_bg">
                    <div className="row" style={{ marginTop: '15%', marginBottom:'12%', marginLeft:'5%'}}>
                        <div className="col-10 mx-auto">
                            <div className="row">
                                <div className="col-md-6 pt-lg-50 order-lg-1">
                                    <h2 style={{ marginLeft: '-30%' }}> Investing in your future is now</h2>
                                    <h3 className="mt-3" style={{ marginLeft: '-30%' }}>Smarter.<br />Simpler.<br /> Safer.</h3>
                                </div>
                                <div className="col-lg-6  pt-lg-50  order-lg-2 header-img">
                                <img src={web} className="img-fluid animated" alt="home img"/>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
        );
}

export default Animation;
