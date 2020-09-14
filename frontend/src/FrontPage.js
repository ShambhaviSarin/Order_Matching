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
              <NavLink target="_blank" href="https://github.com/ShambhaviSarin/Order_Matching">GitHub</NavLink>
            </NavItem>
            <a href="#sectionOne">Section One</a>
            <a href="#sectionTwo">Section Two</a>
            <a href="#sectionThree">Section Three</a>
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


const FrontPage = () => {
  let options = {
      sectionClassName:     'section',
      anchors:              ['sectionOne', 'sectionTwo', 'sectionThree'],
      scrollBar:            false,
      navigation:           true,
      verticalAlign:        false,
      sectionPaddingTop:    '25%',
      sectionPaddingBottom: '25%',
      arrowNavigation:      true
    };
  return (
    <div>
      <NavigationBar />
      <ScrollToTopOnMount />
      <SectionsContainer className="container" {...options}>
        <Section className="custom-section" verticalAlign="true">
          <img src={require('./growth.svg')} alt="logo" />
        </Section>
        <Section>Page 2</Section>
        <Section>Page 3</Section>
      </SectionsContainer>
    </div>
  );
}

export default FrontPage;
