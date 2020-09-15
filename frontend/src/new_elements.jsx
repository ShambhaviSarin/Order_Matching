import React, { Component } from 'react'
import Team from './Team';
import Contact from './contact';
import './new_elements.css';

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
          },
          {
              "img": "img/team/04.jpg",
              "name": "Karen Doe",
              "job": "Project Manager"
          }
      ]


  return (
    <div>
      <Team data={team} />

    </div>
  )
}

export default New_elements;
