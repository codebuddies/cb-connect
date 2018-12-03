import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle';
import './compatibilities/jquery-easing/jquery.easing';


Template.registerHelper('instance', function() {
  return Template.instance();
});


import './routes.js';
import './head.html';
