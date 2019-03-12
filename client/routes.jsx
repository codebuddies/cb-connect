import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../imports/ui/components/login.jsx';
import Landing from '../imports/ui/components/landing.jsx';
import Navbar from '../imports/ui/components/navbar.jsx';
import Faq from '../imports/ui/components/faq.jsx';
import Woohoo from '../imports/ui/components/woohoo.jsx';
import Apply from '../imports/ui/components/apply.jsx';
import ForgotPassword from '../imports/ui/components/forgot_password.jsx';
import SetPassword from '../imports/ui/components/set_password.jsx';
import Moderator from '../imports/ui/components/moderator.jsx';
import withUser from '../imports/ui/components/hoc/with-user.jsx';

export const renderRoutes = () => (
  <Router>
    <Switch>
      <Navbar>
        <Route exact path="/" component={Landing} />
        <RouteWithUser exact path="/dashboard" component={Dashboard} />
        <RouteWithOutUser exact path="/login" component={Login} />
        <RouteWithOutUser exact path="/forgot-password" component={ForgotPassword} />
        <RouteWithOutUser exact path="/enroll-account/:token" component={SetPassword} />
        <RouteWithOutUser exact path="/reset-password/:token" component={SetPassword} />
        <RouteWithUser exact path="/moderator" component={Moderator} />
        <Route exact path="/faq" component={Faq} />
        <RouteWithOutUser path="/apply" component={Apply} />
        <Route path="/woohoo" component={withUser(Woohoo)} />
      </Navbar>
    </Switch>
  </Router>
);

// All routes where user supposed to be logged in
// If user is not logged in, redirect them to login page
const RouteWithUser = withUser(({ user, component: Component, ...rest }) => {
  const { pathname } = window.location;

  if (user) {
    return <Route {...rest} render={props => <Component {...props} user={user} />} />;
  } else if (pathname !== '/login' && pathname === rest.path) {
    return <Redirect push to="/login" />;
  }
  return null;
});

const RouteWithOutUser = withUser(({ user, component: Component, ...rest }) => {
  const { pathname } = window.location;
  if (!user) {
    return <Route {...rest} render={props => <Component {...props} user={user} />} />;
  } else if (pathname !== '/dashboard' && pathname === rest.path) {
    return <Redirect push to="/dashboard" />;
  }
  return null;
});
