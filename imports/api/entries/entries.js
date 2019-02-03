import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
const Entries = new Mongo.Collection('entries');
import SimpleSchema from 'simpl-schema';

let Schema = new SimpleSchema({
  userId: String,
  category: Object,
  'category.id': String,
  'category.title': String,
  tz: Object,
  'tz.id': String,
  'tz.title': String,
  'tz.offset': String,
  'tz.daylightSaving': String,
  lookingFor: String,
  oneLineIntro: String,
  verified: Boolean,
  matched: Boolean,
  preferences: {
    type: Array,
    optional: true,
  },
  'preferences.$': {
    type: Object,
    optional: true,
    blackbox: true,
  },
  currentMatch: {
    type: String,
    optional: true,
  },
  previousMatches: {
    type: Array,
    optional: true,
    blackbox: true,
  },
  'previousMatches.$': {
    type: Object,
    optional: true,
    blackbox: true,
  },
});

Entries.attachSchema(Schema);

// Deny all client-side updates on the Entries collection
// https://guide.meteor.com/security.html#allow-deny
Entries.deny({
  insert() {
    return true;
  },

  update() {
    return true;
  },

  remove() {
    return true;
  },
});

export default Entries;
