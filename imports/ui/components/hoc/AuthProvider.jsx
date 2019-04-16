import React from 'react'
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
const AuthContext = React.createContext()

class AuthProvider extends React.Component {
  constructor() {
    super()
  }
  state = {
    user: null
    }

  componentDidMount() {
    Accounts.onLogout(_ => this.setState({ user: null }))
    Accounts.onLogin(_ => this.setState({ user: Meteor.user() }))
  }

  render() {
    return (
      <AuthContext.Provider
        value={{ user: this.state.user }}
      >
      {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer, AuthContext }
