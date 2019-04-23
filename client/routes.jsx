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
import Profile from '../imports/ui/components/dashboard/profile';
import AuthenticatedRoute from '../imports/ui/components/hoc/AuthenticatedRoute';
import { AuthProvider } from '../imports/ui/components/hoc/AuthProvider';

export const renderRoutes = () => (
  <Router>
    <AuthProvider>
      <Navbar>
        <Switch>
          <AuthenticatedRoute path="/dashboard" component={Profile} />
          <AuthenticatedRoute path="/moderator" component={Moderator} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/enroll-account/:token" component={SetPassword} />
          <Route exact path="/reset-password/:token" component={SetPassword} />
          <Route exact path="/faq" component={Faq} />
          <Route path="/apply" component={Apply} />
          <Route path="/woohoo" component={Woohoo} />
          <Route exact path="/" component={Landing} />
        </Switch>
      </Navbar>
    </AuthProvider>
  </Router>
);
