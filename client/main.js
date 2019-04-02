import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import AppContainer from './routes.jsx';

Meteor.startup(() => {
  render(<AppContainer />, document.getElementById('render-target'));
});
