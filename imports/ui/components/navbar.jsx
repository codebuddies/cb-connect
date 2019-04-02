import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import withUser from '/imports/ui/components/hoc/with-user.jsx';

import { Roles } from 'meteor/alanning:roles';
import Loading from './loading.jsx';

class NavbarWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogout() {
    Meteor.logout();
  }

  render() {
    const {user, userId } = this.props;
    return (
      <React.Fragment>
        <Container>
          <Navbar>
            <Link to="/" className="navbar-brand">
              CodeBuddies Connect
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav className="mr-auto" />
            {Roles.userIsInRole(Meteor.userId(), 'owner', 'CB') ? (
              <Link to="/moderator" className="nav-link mr-sm-2">
                Moderate
              </Link>
            ) : (
              ""
            )}
             {user ? (
              <Link to="/home" className="nav-link mr-sm-2">
                Profile
              </Link>
            ) : (
              ""
            )}
            <Link to="/faq" className="nav-link mr-sm-2">
              FAQ
            </Link>
            {user ? (
               <Link to="/dashboard" className="nav-link mr-sm-2">
                Dashboard
              </Link>
            ) : (
              ""
            )}
            {user ? (
              <Button variant="outline-success" size="sm" onClick={this.handleLogout}>
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="outline-success" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </Navbar>
        </Container>
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default withUser(NavbarWrapper);
