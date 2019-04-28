import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from './AuthProvider';

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ user }) => <Route render={props => (user ? <Component {...props} /> : <Redirect to="/login" />)} {...rest} />}
  </AuthConsumer>
);

AuthenticatedRoute.propTypes = {
  component: PropTypes.func,
};
export default AuthenticatedRoute;
