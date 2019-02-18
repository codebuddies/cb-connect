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
import Home from '../imports/ui/components/home.jsx';
import Moderator from '../imports/ui/components/moderator.jsx';
import AuthenticatedRoute from '../imports/ui/components/hoc/AuthenticatedRoute';
import { AuthProvider } from '../imports/ui/components/hoc/AuthProvider';
import withUser from '../imports/ui/components/hoc/with-user';

export const renderRoutes = () => (
  <Router>
    <AuthProvider>
      <Navbar>
        <Switch>
          <AuthenticatedRoute path="/home" component={Home} />
          <AuthenticatedRoute path="/moderator" component={Moderator} />
          <RouteWithOutUser path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <RouteWithOutUser exact path="/enroll-account/:token" component={SetPassword} />
          <RouteWithOutUser exact path="/reset-password/:token" component={SetPassword} />
          <Route exact path="/faq" component={Faq} />
          <RouteWithOutUser path="/apply" component={Apply} />
          <Route path="/woohoo" component={withUser(Woohoo)} />
          <Route exact path="/" component={Landing} />
        </Switch>
      </Navbar>
    </AuthProvider>
  </Router>
);


const RouteWithOutUser = withUser(({ user, component: Component, ...rest }) => {
  const { pathname } = window.location;
  if (!user) {
    return <Route {...rest} render={props => <Component {...props} user={user} />} />;
  } else if (pathname !== '/home' && pathname === rest.path) {
    console.log('getting redirected to home..')
    return <Redirect push to="/home" />;
  }
  return null;
});
