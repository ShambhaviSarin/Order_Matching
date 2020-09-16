import React from 'react';
import {Row, Col, Nav, NavItem, NavLink} from 'reactstrap';

const FooterPage = () => {
  return (
    <footer className="footer" style={{marginLeft:'7%', marginRight:'7%'}}>
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © 2020{" "}
            <a className="font-weight-bold ml-1" rel="noopener noreferrer" href="/">
              M.A.R.S.S
            </a>
          </div>
        </Col>
        <Col xl="6">
          <Nav className="nav-footer justify-content-center justify-content-xl-end">
            <NavItem>
              <NavLink href="/" rel="noopener noreferrer">
                M.A.R.S.S
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink rel="noopener noreferrer" href="#pablo">
                About Us
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </footer>
  );
}

export default FooterPage;
