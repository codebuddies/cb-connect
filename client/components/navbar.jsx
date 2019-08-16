import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button, Container, Dropdown } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import { AuthContext } from '../hoc/AuthProvider';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogout() {
    Meteor.logout();
  }

  render() {
    const { user } = this.context;

    return (
      <React.Fragment>
        <Container>
          <Navbar>
            <Link to="/" className="navbar-brand">
              CodeBuddies Connect
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav className="mr-auto" />
            {user && user.profile.moderator === true ? (
              <Link to="/moderator" className="nav-link mr-sm-2">
                Match Users
              </Link>
            ) : (
              ''
            )}
            <Link to="/faq" className="nav-link mr-sm-2">
              FAQ
            </Link>
            {user ? (
              <Link to="/dashboard" className="nav-link mr-sm-2">
                Dashboard
              </Link>
            ) : (
              ''
            )}
            {user ? (

              <Dropdown>
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                  My Account
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/my-profile">Profile</Dropdown.Item>
                  {/* todos : add my settings page. */}
                  <Dropdown.Item href="#">Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={this.handleLogout} >Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

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

NavigationBar.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object,
};

NavigationBar.contextType = AuthContext;
export default NavigationBar;
