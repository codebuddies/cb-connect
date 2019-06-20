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
  skillHelpOther: String,
  skillImproveSelf: String,
  verified: Boolean,
  flags: {
    type: Array,
    optional: true,
  },
  'flags.$': {
    type: Object,
    optional: true,
  },
  'flags.$.userId': {
    type: String,
  },
  'flags.$.reason': {
    type: String,
  },
  matched: String, //0: unmatched, 1: found suggested match, 2: accepted match, 3: confirmed connection
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) return new Date();
      if (this.isUpsert) return { $setOnInsert: new Date() };
      this.unset();
    },
  },
  preferences: {
    type: Array,
    optional: true,
  },
  'preferences.$': {
    type: Object,
    optional: true,
    blackbox: true,
  },
  'preferences.$.entryId': {
    type: String,
  },
  'preferences.$.createdAt': {
    type: Date,
  },
  requesters: {
    type: Array,
    optional: true,
  },
  'requesters.$': {
    type: Object,
    optional: true,
    blackbox: true,
  },
  'requesters.$.entryId': {
    type: String,
  },
  'requesters.$.createdAt': {
    type: Date,
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
