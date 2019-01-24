import './forgot_password.html';
Template.forgot_password.onCreated(function() {
  instance = this;
  instance.processing = new ReactiveVar(false);
});

Template.forgot_password.helpers({
  processing() {
    return Template.instance().processing.get();
  },
});

Template.forgot_password.events({
  'submit #forgot-password-form': function(event, template) {
    event.preventDefault();

    const emailRegEx = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if ($.trim(template.find('#email').value) == '' || template.find('#email').value.match(emailRegEx) == null) {
      return Bert.alert('Invalid Email address', 'warning', 'growl-top-right');
    }

    const email = template.find('#email').value;
    template.processing.set(true);

    Accounts.forgotPassword({ email: email }, function(error) {
      if (error) {
        template.processing.set(false);
        return Bert.alert(error.reason, 'warning', 'growl-top-right');
      } else {
        template.processing.set(false);
        template.find('#email').value = '';
        return Bert.alert('Check your email for instructions', 'success');
      }
    });
  },
});
