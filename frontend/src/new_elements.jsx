import React, { Component } from 'react'
import Team from './Team';
import Contact from './contact';

const New_elements = () => {
  const team = [{
              "img": "img/team/01.jpg",
              "name": "John Doe",
              "job": "Director"
          },
          {
              "img": "img/team/02.jpg",
              "name": "Mike Doe",
              "job": "Senior Designer"
          }, {
              "img": "img/team/03.jpg",
              "name": "Jane Doe",
              "job": "Senior Designer"
          },{
              "img": "img/team/04.jpg",
              "name": "Karen Doe",
              "job": "Project Manager"
          },
          {
              "img": "img/team/05.jpg",
              "name": "Barren Doe",
              "job": "Project Manager"
          }
      ]
  const team2 = [
          {
              "img": "img/team/04.jpg",
              "name": "Karen Doe",
              "job": "Project Manager"
          },
          {
              "img": "img/team/05.jpg",
              "name": "Barren Doe",
              "job": "Project Manager"
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
      <Team data={team} />
      <Contact data={contact}/>
    </div>
  )
}
export default New_elements;
