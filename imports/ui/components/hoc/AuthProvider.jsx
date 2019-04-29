import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { PropTypes } from 'prop-types';
const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  constructor() {
    super();
  }
  state = {
    user: null,
  };

  componentDidMount() {
    Accounts.onLogout(() => this.setState({ user: null }));
    Accounts.onLogin(() => this.setState({ user: Meteor.user() }));
  }

  render() {
    return <AuthContext.Provider value={{ user: this.state.user }}> {this.props.children} </AuthContext.Provider>;
  }
}

AuthProvider.propTypes = {
  children: PropTypes.any,
};

const AuthConsumer = AuthContext.Consumer;

AuthProvider.propTypes = {
  children: PropTypes.element,
};

export { AuthProvider, AuthConsumer, AuthContext };
