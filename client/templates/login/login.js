import './login.html';

Template.login.onCreated(function () {
  instance = this;
  instance.processing = new ReactiveVar(false);
});
