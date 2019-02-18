import React from 'react'
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
const AuthContext = React.createContext()

class AuthProvider extends React.Component {
  constructor() {
    super()
  }
  state = {
    loggedIn: !!Meteor.userId(),
    user: ''
    }

  componentDidMount() {
    Accounts.onLogout(_ => this.setState({ loggedIn: false }))
    Accounts.onLogin(_ => this.setState({ loggedIn: true, user: Meteor.user() }))
  }

  render() {
    return (
      <AuthContext.Provider
        value={{ isLoggedIn: this.state.loggedIn, user: this.state.user }}
      >
      {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer, AuthContext }
