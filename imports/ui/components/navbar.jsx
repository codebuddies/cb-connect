import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';

class NavbarWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <Navbar>
            <Link to="/" className="navbar-brand">
              CodeBuddies Connect
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav className="mr-auto" />
            <Link to="/faq" className="nav-link mr-sm-2">
              FAQ
            </Link>
            <Link to="/login">
              <Button variant="outline-success" size="sm">
                Login
              </Button>
            </Link>
          </Navbar>
        </Container>
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default NavbarWrapper;
