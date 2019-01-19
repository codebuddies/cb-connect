import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle';
import './compatibilities/jquery-easing/jquery.easing';


Template.registerHelper('instance', function() {
  return Template.instance();
});

Template.registerHelper("inList", function(list, item) {
  if (list) {
    return list.indexOf(item) != -1;
  }
  return false;
});


import './routes.js';
import './head.html';
