import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './templates/layout';
import './templates/navbar';
import './templates/landing';

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
  name: 'index',
  action() {
    BlazeLayout.render('app_layout', { top: 'navbar', main: 'landing' });
  },
});
