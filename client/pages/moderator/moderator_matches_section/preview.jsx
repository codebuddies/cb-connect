import React, { Component } from 'react';
import './_preview_email.scss';
import { Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

class PreviewEmail extends Component {
  constructor(props) {
    super(props);
    this.matchUsers = this.matchUsers.bind(this);
    this.state = {};
  }
  matchUsers() {
    //alert('matched');
    //Meteor.call()
    Meteor.call('entry.match', data, (error, result) => {
      if (error) {
        this.setState({ error: error.reason, processing: false });
      }
      if (result) {
        this.setState({ processing: false });
      }
    });
  }
  render() {
    return (
      <div className="container" id="preview_email">
        <div className="row">
          <h2>Preview Email</h2>
        </div>
        <Button onClick={this.matchUsers}>Match Users</Button>
      </div>
    );
  }
}

export default PreviewEmail;
