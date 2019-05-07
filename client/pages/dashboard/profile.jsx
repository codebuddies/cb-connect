import React, { Component } from 'react';
import DashboardContainer from '/client/containers/dashboard.jsx';

class Profile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <DashboardContainer />
        </div>
      </div>
    );
  }
}

export default Profile;
