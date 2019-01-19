import './enrollment_set_password.html'
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.enrollment_set_password.onCreated(function () {
  let instance = Template.instance();

  instance.processing =  new ReactiveVar( false );

});

Template.enrollment_set_password.helpers({
  processing() {
    return Template.instance().processing.get();
  }
});

Template.enrollment_set_password.events({
  "submit #set-password-form": function(event, template) {
    event.preventDefault();

    if ($.trim(template.find("#password").value) == '') {
      return Bert.alert( 'Password', 'warning', 'growl-top-right' );
    }
    if ($.trim(template.find("#repeatPassword").value) == '') {
      return Bert.alert( 'Repeat Password', 'warning', 'growl-top-right' );
    }
    if ($.trim(template.find("#password").value) !== $.trim(template.find("#repeatPassword").value) ) {
      return Bert.alert( 'Passwords do not match', 'warning', 'growl-top-right' );
    }

    template.processing.set('true');

    const password = template.find('#password').value;
    const token = FlowRouter.getParam('token');

    Accounts.resetPassword(token, password, function (error) {
      if (error) {
            console.error('resetPassword', error.reason);
            template.processing.set('false');
            // return Bert.alert( error.reason, 'danger', 'growl-top-right' );
        } else {
          template.processing.set('false');
          FlowRouter.go('/');
          // return Bert.alert('Welcome To (O.o) !', 'success');
        }
    });
  }
});

Template.enrollment_set_password.onDestroyed(function () {
    this.processing.set( false );
});
