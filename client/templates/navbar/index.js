import './navbar.html';



Template.navbar.events({
  "click #logout": function(event, template) { 
     Meteor.logout();
  }
});
