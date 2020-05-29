import { Meteor } from 'meteor/meteor';
import Entries from '/api/entries';

Meteor.publish('entries.board', function() {
  return Entries.find({}, { limit: 100 });
});

Meteor.publish('allUsers', function() {
  return Meteor.users.find({});
});
