import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from './AuthProvider';
import { PropTypes } from 'prop-types';

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ user }) => <Route render={props => (user ? <Component {...props} /> : <Redirect to="/login" />)} {...rest} />}
  </AuthConsumer>
);

AuthenticatedRoute.propTypes = {
  component: PropTypes.func,
};

export default AuthenticatedRoute;
