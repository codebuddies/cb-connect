import React, { Component } from 'react';
import './_preview_email.scss';
import { Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';
import ReactDOMServer from 'react-dom/server';

class PreviewEmail extends Component {
  constructor(props) {
    super(props);
    this.matchUsers = this.matchUsers.bind(this);
    this.createEmail = this.createEmail.bind(this);

    //get user IDs of the two entries we want to match
    const getUserIds = [];
    this.props.cardsSelected.forEach(card => {
      getUserIds.push(card.userId);
    });
    this.props.handleUsersToMatch(getUserIds);
  }
  matchUsers(email1Content, email2Content, email1SendTo, email2SendTo, idA, idB) {
    //A and B because they do not necessarily correspond to email1 and email2
    //alert('matched');
    const html1 = ReactDOMServer.renderToStaticMarkup(email1Content);
    const html2 = ReactDOMServer.renderToStaticMarkup(email2Content);
    let data = {
      from: 'codebuddies-connect-volunteers@codebuddies.org',
      sendTo1: email1SendTo,
      sendTo2: email2SendTo,
      subject: 'Introducing your CodeBuddies Connect Match!',
      html1: html1,
      html2: html2,
      idA: idA,
      idB: idB,
    };
    console.log(data);

    Meteor.call('entry.match', data, (error, result) => {
      if (error) {
        this.setState({ error: error.reason, processing: false });
        console.log(error);
      }
      if (result) {
        this.setState({ processing: false, cardsSelected: [] });
        alert('email sent!');
      }
    });
  }
  createEmail(userData, userInfo) {
    if (userInfo.length > 0) {
      const user1 = userData[0];
      const user2 = userData[1];
      let userInfo1 = userInfo[0]._id === user1.userId ? userInfo[0] : userInfo[1];
      let userInfo2 = userInfo[1]._id === user2.userId ? userInfo[1] : userInfo[0];
      return {
        id: userInfo1._id,
        sendTo: userInfo1.emails[0].address,
        content: (
          <div className="email">
            <p>Hey {userInfo1.profile.name},</p>

            <p>
              After sifting through all of the submissions, we narrowed down the perfect {user1.category.title} for you
              this week.
            </p>

            <p>
              People who have connected through CodeBuddies have gone on to make projects together, host hangouts
              together, and keep each other accountable to their goals.
            </p>

            <p>As a reminder, you said you were looking for:</p>

            <p>
              <strong>{user2.category.title}</strong>
            </p>
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

            <h3>
              <strong>Your CodeBuddy is</strong> {userInfo2.profile.name}.
            </h3>
            <p>
              {userInfo2.profile.name} is looking for the following category: <strong>{user1.category.title}</strong>
            </p>
            <ul>
              <li>
                <strong>One-line intro from {userInfo2.profile.name}:</strong> {user2.oneLineIntro}
              </li>
              <li>
                <strong>Skill(s) {userInfo2.profile.name} can help others with:</strong> {user2.skillHelpOther}
              </li>
              <li>
                <strong>Skill(s) {userInfo2.profile.name} is trying to improve:</strong> {user2.skillImproveSelf}
              </li>
              <li>
                <strong>Timezone:</strong> {user2.tz.title}
              </li>
            </ul>
          </div>
        ),
      };
    }
  }

  render() {
    const { cardsSelected, findUsersToMatch } = this.props;
    const email1 =
      findUsersToMatch.length > 0 ? this.createEmail(cardsSelected, findUsersToMatch) : { content: 'Loading...' };
    const email2 =
      findUsersToMatch.length > 0
        ? this.createEmail([cardsSelected[1], cardsSelected[0]], findUsersToMatch)
        : { content: 'Loading...' };

    return (
      <div className="container" id="preview_email">
        <div className="row">
          <h2 className="center">Preview Emails</h2>
        </div>
        {email1.content}
        {email2.content}

        <Button
          onClick={() =>
            this.matchUsers(
              email1.content,
              email2.content,
              email1.sendTo,
              email2.sendTo,
              cardsSelected[0]._id,
              cardsSelected[1]._id
            )
          }
        >
          Match Users
        </Button>
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
