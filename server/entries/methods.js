import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Entries } from '../../lib/collections/entries';

Meteor.methods({
  'entries.add' (data) {

    // check if user exists or not.
    const {step3: {email, timezoneOffset, timezoneId, timezoneDaylightSaving, timezoneTitle } = {} } = data;
    const {step2: {name, intro, request } = {} } = data;
    const {step1: {category } = {} } = data;
    const actor = Accounts.findUserByEmail(email);

    const tz = {
      id: timezoneId,
      title: timezoneTitle,
      offset: timezoneOffset,
      daylight: Number(timezoneDaylightSaving)
    }

    if (actor) {
      // add new entry

      // const entry = {
      //   actor: {
      //     id: actor._id,
      //     name: name
      //   },
      //   category: category,
      //   request: request,
      //   tz: tz
      // }
      //
      // Entries.insert(entry);

    } else {

      // create new user
      const options = {
        email,
        profile: {
          name: name,
          intro: intro,
          tz: tz
        }
      }

      // create a user
      const userId = Accounts.createUser(options);

      if (userId) {

        // send welcome email
        Accounts.sendVerificationEmail(userId);
        // add new entry

        const entry = {
          actor: {
            id: userId,
            name: name
          },
          category: category,
          request: request,
          tz: tz,
          active: false,
          preferences: null,
          current_match: null,
          previous_matches: null
        }

        Entries.insert(entry);

      }

    }
  }
});
