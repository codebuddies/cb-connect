import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './templates/layout';
import './templates/navbar';
import './templates/landing/landing';
import './templates/entry_process/entry_process';
import './templates/faq/faq';
import './templates/login/login';
import './templates/woohoo/woohoo';

FlowRouter.route('*', {
  action() {
    // Show 404 error page using Blaze
    // this.render('notFound');
    //
    // // Can be used with BlazeLayout,
    // // and ReactLayout for React-based apps
  },
});

FlowRouter.route('/', {
  name: 'landing',
  action() {
    BlazeLayout.render('app_layout', { top: 'navbar', main: 'landing' });
  },
});

FlowRouter.route('/apply', {
  name: 'apply',
  action() {
    BlazeLayout.render('app_layout', { top: 'navbar', main: 'entry_process' });
  },
});

FlowRouter.route('/faq', {
  name: 'FAQ',
  action() {
    BlazeLayout.render('app_layout', { top: 'navbar', main: 'faq' });
  },
});

FlowRouter.route('/login', {
  name: 'login',
  action() {
    BlazeLayout.render('app_layout', { top: 'navbar', main: 'login' });
  },
});

FlowRouter.route('/woohoo', {
  name: 'woohoo',
  action() {
    BlazeLayout.render('app_layout', { main: 'woohoo' });
  }
});
