import React, { Component } from 'react';
import './_preview_email.scss';
import { Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';

class PreviewEmail extends Component {
  constructor(props) {
    super(props);
    this.matchUsers = this.matchUsers.bind(this);
    this.createEmail = this.createEmail.bind(this);
    this.state = {};
    //get user IDs of the two entries we want to match
    const getUserIds = [];
    this.props.cardsSelected.forEach(card => {
      getUserIds.push(card.userId);
    });
    this.props.handleUsersToMatch(getUserIds);
  }
  matchUsers() {
    //alert('matched');

    //TODO: define data
    Meteor.call('entry.match', data, (error, result) => {
      if (error) {
        this.setState({ error: error.reason, processing: false });
      }
      if (result) {
        this.setState({ processing: false });
      }
    });
  }
  createEmail(userData) {
    const user1 = userData[0];
    const user2 = userData[1];

    return (
      <div className="email">
        <h4>Hey {user1.userId},</h4>

        <p>
          After sifting through all of the submissions, we narrowed down the perfect {user1.category.title} for you this
          week.
        </p>

        <p>
          People who have connected through CodeBuddies have gone on to make projects together, host hangouts together,
          and keep each other accountable to their goals.
        </p>

        <p>As a reminder, you said you were looking for:</p>

        <h5>{user2.category.title}</h5>
        <ul>
          <li>
            <strong>One-line intro of yourself:</strong> {user1.oneLineIntro}
          </li>
          <li>
            <strong>What skills can you help others with?</strong> {user1.skillHelpOther}
          </li>
          <li>
            <strong>What skills are you trying to improve?</strong> {user1.skillImproveSelf}
          </li>
          <li>
            <strong>Timezone:</strong> {user1.tz.title}
          </li>
        </ul>

        <h5>Your CodeBuddy is {user2.userId}.</h5>
        <p>
          {user2.userId} is looking for {user1.category.title}
        </p>
        <ul>
          <li>
            <strong>One-line intro of {user2.userId}:</strong> {user2.oneLineIntro}
          </li>
          <li>
            <strong>Skill(s) {user2.userId} can help others with:</strong> {user2.skillHelpOther}
          </li>
          <li>
            <strong>Skill(s) {user2.userId} is trying to improve:</strong> {user2.skillImproveSelf}
          </li>
          <li>
            <strong>Timezone:</strong> {user2.tz.title}
          </li>
        </ul>
      </div>
    );
  }

  render() {
    const { cardsSelected, findUsersToMatch } = this.props;

    return (
      <div className="container" id="preview_email">
        <div className="row">
          <h2 className="center">Preview Emails</h2>
        </div>

        {this.createEmail(cardsSelected)}
        {this.createEmail([cardsSelected[1], cardsSelected[0]])}

        <Button onClick={this.matchUsers}>Match Users</Button>
      </div>
    );
  }
}

PreviewEmail.propTypes = {
  // We can check optional and required types here
  entries: PropTypes.array,
  users: PropTypes.array,
  cardsSelected: PropTypes.array,
  findUsersToMatch: PropTypes.array,
  handleUsersToMatch: PropTypes.func,
};

export default PreviewEmail;
