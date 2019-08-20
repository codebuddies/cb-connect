import React, { Component } from 'react';
import { AuthContext } from '../../hoc/AuthProvider';
import { Container } from 'react-bootstrap';

class MyProfile extends Component {
  render() {
    const { user } = this.context;
    console.log('MyProfile render');
    return (
      <Container fluid>
        <h2 className="text-center">profile</h2>
      </Container>
    );
  }
}

MyProfile.contextType = AuthContext;
export default MyProfile;
