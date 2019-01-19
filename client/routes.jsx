import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../imports/ui/components/login.jsx'
import Landing from '../imports/ui/components/landing.jsx'

export const renderRoutes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </Router>
);

// <Route path="/faq" component={Faq} />
// <Route path="/apply" component={Apply} />
// <Route path="/woohoo" component={Woohoo} />
