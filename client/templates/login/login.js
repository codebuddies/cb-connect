// import './login.html';
// import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
//
// Template.login.onCreated(function () {
//   instance = this;
//   instance.processing = new ReactiveVar(false);
// });
//
// Template.login.events({
//   "submit #login-form": function(event, template) {
//     event.preventDefault();
//
//     const emailRegEx = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
//
//     if ($.trim(template.find("#selector").value) == '' || template.find("#selector").value.match(emailRegEx) == null) {
//       return Bert.alert( 'Email address', 'warning', 'growl-top-right' );
//     }
//
//     if ($.trim(template.find("#password").value) == '' ) {
//       return Bert.alert( 'Password', 'warning', 'growl-top-right' );
//     }
//
//     const email = template.find("#selector").value;
//     const password = template.find("#password").value;
//
//     Meteor.loginWithPassword(email, password, function(error){
//       if(error){
//         template.processing.set( false );
//         return Bert.alert( error.reason, 'danger', 'growl-top-right' );
//       }else{
//         template.processing.set( false );
//         FlowRouter.go('/');
//         return Bert.alert( 'Welcome Back !', 'success', 'growl-top-right' );
//
//       }
//     })
//   }
// });
