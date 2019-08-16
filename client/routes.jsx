import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import pages
import Login from './pages/login';
import Landing from './pages/landing';
import Faq from './pages/faq';
import Woohoo from './pages/woohoo';
import Apply from './pages/apply';
import ForgotPassword from './pages/forgot_password';
import SetPassword from './pages/set_password';
import Profile from './pages/dashboard/profile';
import Moderator from './pages/moderator/moderator_matches_section';
import MyProfile from './pages/user/my_profile.jsx';

// Import HOCs and components
import AuthenticatedRoute from './hoc/AuthenticatedRoute';
import { AuthProvider } from './hoc/AuthProvider';
import Navbar from './components/navbar';

export const renderRoutes = () => (
  <Router>
    <AuthProvider>
      <Navbar>
        <Switch>
          <AuthenticatedRoute exact path="/dashboard" component={Profile} />
          <AuthenticatedRoute exact path="/my-profile" component={MyProfile} />
          <Route path="/moderator" component={Moderator} />
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
