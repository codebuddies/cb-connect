import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import pages
import Login from '../imports/ui/pages/login';
import Landing from '../imports/ui/pages/landing';
import Faq from '../imports/ui/pages/faq';
import Woohoo from '../imports/ui/pages/woohoo';
import Apply from '../imports/ui/pages/apply';
import ForgotPassword from '../imports/ui/pages/forgot_password';
import SetPassword from '../imports/ui/pages/set_password';
import Moderator from '../imports/ui/pages/moderator';
import Profile from '../imports/ui/pages/dashboard/profile';

// Import HOCs and components
import AuthenticatedRoute from '../imports/ui/hoc/AuthenticatedRoute';
import { AuthProvider } from '../imports/ui/hoc/AuthProvider';
import Navbar from '../imports/ui/components/navbar';

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
