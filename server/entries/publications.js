import { Entries } from '../../lib/collections/entries';

Meteor.publish("entries.board", function(argument) {
  return Entries.find({}, {limit: 19});
});
