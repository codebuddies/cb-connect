import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../imports/ui/pages/login.jsx/index.js';
import Landing from '../imports/ui/pages/landing.jsx/index.js';
import Navbar from '../imports/ui/components/navbar.jsx';
import Faq from '../imports/ui/pages/faq.jsx';
import Woohoo from '../imports/ui/pages/woohoo.jsx/index.js';
import Apply from '../imports/ui/pages/apply.jsx/index.js';
import ForgotPassword from '../imports/ui/pages/forgot_password.jsx/index.js';
import SetPassword from '../imports/ui/pages/set_password.jsx/index.js';
import Moderator from '../imports/ui/pages/moderator.jsx/index.js';
import Profile from '../imports/ui/components/dashboard/profile';
import AuthenticatedRoute from '../imports/ui/hoc/AuthenticatedRoute';
import { AuthProvider } from '../imports/ui/hoc/AuthProvider';

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
