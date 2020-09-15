import React, { Component } from "react";
import './style.css';
import './random.css';

export class Contact extends Component {
  render() {
    return (

      <div style={{background:'#7c7cdd'}}>
        <div id="contact">
          <div className="container">
            <div className="col-md-8">
                <div className="section-title" style={{marginLeft:'-1%'}}>
                <br/><br/><br/><br/>
                <font color= "white">
                  <h1><font color= "white">Get In Touch</font></h1>
                  <p>Please fill out the form below to send us an email and we
                    will get back to you as soon as possible.
                  </p>
                  </font>
                </div>
                <form name="sentMessage" id="contactForm" noValidate>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          placeholder="Name"
                          required="required"
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          placeholder="Email"
                          required="required"
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      id="message"
                      className="form-control"
                      rows="4"
                      placeholder="Message"
                      required
                    ></textarea>
                    <p className="help-block text-danger"></p>
                  </div>
                  <div id="success"></div>
                  <button type="submit" className="btn btn-custom btn-lg">
                    Send Message
                  </button>
                  <br/><br/><br/><br/>
                </form>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Contact;
