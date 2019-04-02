import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from './routes.jsx';

Meteor.startup(() => {
  if (Meteor.isProduction) {
    console = console || {};
    console.log = function() {};
  }
  render(renderRoutes(), document.getElementById('render-target'));
});
