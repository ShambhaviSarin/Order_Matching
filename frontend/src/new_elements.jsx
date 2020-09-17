import React, { Component } from 'react'
import Team from './Team';
import Contact from './contact';
import CardUi from "./Cards";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
const New_elements = () => {
  const team = [{
              "img": "img/team/01.jpg",
              "name": "Shambhavi Sarin"
          },
          {
              "img": "img/team/02.jpg",
              "name": "Akhya Bajpai"
          }, {
              "img": "img/team/03.jpg",
              "name": "Shantanu Das"
          },{
              "img": "img/team/04.jpg",
              "name": "Malaika Bedi"
          },
          {
              "img": "img/team/05.jpg",
              "name": "Richa"
          }
      ]
  const contact =[{
        "address": "4321 California St, San Francisco, CA 12345 ",
        "phone": "+1 123 456 1234",
        "email": "info@company.com",
        "facebook": "fb.com",
        "twitter": "twitter.com",
        "youtube": "youtube.com"
    }
  ]

  return (
    <div>
      <CardUi/>
      <Team data={team} style={{textAlign:'center'}}/>
      <Contact data={contact}/>
    </div>
  )
}
export default New_elements;
