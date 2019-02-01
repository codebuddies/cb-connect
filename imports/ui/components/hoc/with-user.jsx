import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const WithUser = (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoggedin: !!Meteor.userId()
      }
    }

    componentDidMount() {
      Accounts.onLogout(_ => this.setState({isLoggedin: false}))
      Accounts.onLogin(_ => this.setState({isLoggedin: true}))
    }

    render() {
      return <Component {...this.props} user={Meteor.user()} />
    }
  }
}

export default WithUser
