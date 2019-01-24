import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from './routes.jsx';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-target'));
});

Template.registerHelper('inList', function(list, item) {
  if (list) {
    return list.indexOf(item) != -1;
  }
  return false;
});

import './routes.js';
import './head.html';
