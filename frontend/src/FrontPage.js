import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link} from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarText, Button } from 'reactstrap';
import {ScrollToTopOnMount, SectionsContainer, Section, Header, Footer} from 'react-fullpage';

const NavigationBar = () => {
  return(
    <Header>
      <Navbar color="#7c7cdd" light expand="md" style={{marginTop:'1%'}}>
        <NavbarBrand href="/"><img src={require('./logo.png')} alt="logo" height="50"/></NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
            </NavItem>
          </Nav>
          <NavbarText>
          <Nav>
            <Link to="/Login"><Button outline color="info">Login/Register</Button></Link>
          </Nav>
          </NavbarText>
        </Navbar>
      </Header>
  );
}

const FullScreenSlider = () => {
  let options = {
      sectionClassName:     'section',
      anchors:              ['sectionOne', 'sectionTwo', 'sectionThree'],
      scrollBar:            false,
      navigation:           true,
      verticalAlign:        false,
      sectionPaddingTop:    '0%',
      sectionPaddingBottom: '0%',
      arrowNavigation:      true
    };
  return(
    <div>
      <Header>
        <a href="/" style={{marginTop:'100px'}}><img src={require('./logo.png')} alt="logo" height="50"/></a>
        <a target="_blank" href="https://github.com/ShambhaviSarin/Order_Matching">GitHub</a>
        <a href="#sectionOne">Section One</a>
        <a href="#sectionTwo">Section Two</a>
        <a href="#sectionThree">Section Three</a>
      </Header>
      <ScrollToTopOnMount />
      <SectionsContainer className="container" {...options}>
        <Section className="custom-section" verticalAlign="true" data-percentage="100">
          <img src={require('./growth.svg')} alt="logo" />
        </Section>
        <Section data-percentage="100">Page 2</Section>
        <Section>Page 3</Section>
      </SectionsContainer>
    </div>
  );
}


const FrontPage = () => {
  return (
    <div>
      <FullScreenSlider />
    </div>
  );
}

export default FrontPage;
