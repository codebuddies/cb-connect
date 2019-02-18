import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthConsumer } from './AuthProvider'

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isLoggedIn, user }) => (
      <Route
        render={props =>
          isLoggedIn ? <Component user={user} {...props} /> : <Redirect to="/login" />
        }
        {...rest}
      />
    )}
  </AuthConsumer>
)

export default AuthenticatedRoute
