import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';


class NavbarWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Navbar className="navbar navbar-expand-lg container">
          <Navbar.Brand href="/">
             CodeBuddies Connect
           </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Nav className="mr-auto"></Nav>
            <Nav.Link className="mr-sm-2" href="/faq">FAQ</Nav.Link>
            <Button variant="outline-success" className="btn btn-primary btn-sm btn-border">Login</Button>
          </Navbar>
          {this.props.children}
      </React.Fragment>
    );
  }
}

export default NavbarWrapper;
