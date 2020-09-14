import React from 'react';
import {Navbar,NavbarBrand,Nav,NavItem,NavLink,Button,TabContent,TabPane,Row,Col,
  Form,FormGroup,Input,Label,Card, Container,UncontrolledCollapse,CardHeader,
  CardBody,InputGroupAddon,InputGroupText,InputGroup} from 'reactstrap';

const PageFooter = () => {
  return (
    <>
      <footer className="py-5">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-left text-muted">
                © 2020{" "}
                <a className="font-weight-bold ml-1" target="_blank">M.A.R.S.S</a>
              </div>
            </Col>
            <Col xl="6">
              <Nav className="nav-footer justify-content-center justify-content-xl-end">
                <NavItem>
                  <NavLink target="_blank">M.A.R.S.S</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink target="_blank">About Us</NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default PageFooter;
