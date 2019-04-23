import { Meteor } from 'meteor/meteor';
import Entries from '/imports/api/entries/entries.js';

Meteor.publish('entries.board', function() {
  return Entries.find({}, { limit: 100 });
});
