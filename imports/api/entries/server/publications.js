import Entries from '/imports/api/entries/entries.js';

Meteor.publish('entries.board', function(argument) {
  return Entries.find({}, { limit: 19 });
});
