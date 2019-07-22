import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import { _ } from 'lodash';
import { timezones } from '/lib/data/timezones';
import { categories } from '/lib/data/categories';
import EntriesHelper from '/api/entries/helpers.js';

Accounts.onCreateUser((options, user) => {
  const customizedUser = Object.assign(
    {
      complete: false,
      moderator: false,
    },
    user
  );

  if (options.profile) {
    customizedUser.profile = options.profile;
  }

  return customizedUser;
});

Meteor.methods({
  'entry.request'(data) {
    check(data, {
      entryId: String,
    });
    EntriesHelper.requestEntry(data);
  },
  'entry.flag'(data) {
    check(data, {
      reason: String,
      userId: String,
      entryId: String,
    });
    EntriesHelper.updateFlags(data);
  },
  'entry.match'(data) {
    check(data, {
      from: String,
      sendTo1: String,
      sendTo2: String,
      subject: String,
      html1: String,
      html2: String,
      idA: String,
      idB: String,
    });
    EntriesHelper.matchUser(data);
    try {
      Email.send({
        to: data.sendTo1,
        cc: data.sendTo2,
        from: data.from,
        subject: data.subject,
        html: data.html1,
      });
      Email.send({ to: data.sendTo2, cc: data.sendTo1, from: data.from, subject: data.subject, html: data.html2 });
    } catch (e) {
      console.log(e);
    }
  },
  'users.enroll'(data) {
    check(data, {
      category: String,
      name: String,
      oneLineIntro: String,
      lookingFor: String,
      skillHelpOther: String,
      skillImproveSelf: String,
      email: String,
      timezone: String,
    });

    const timezone = _.find(timezones, { id: data.timezone });
    const category = _.find(categories, { id: data.category });

    // check if user exists or not.
    const actor = Accounts.findUserByEmail(data.email);
    if (actor) {
      throw new Meteor.Error('user.enroll', 'User with this email already exists.');
    } else {
      const { email, name, oneLineIntro, lookingFor, skillHelpOther, skillImproveSelf } = data;
      const { id: category_id, short_label: category_title } = category;
      const { id: tz_id, label_text: tz_title, daylight_saving, value: tz_offset } = timezone;

      // create new user
      const options = {
        email: email,
        profile: {
          name: name,
          intro: oneLineIntro,
          skillHelpOther: skillHelpOther,
          skillImproveSelf: skillImproveSelf,
          moderator: false,
          tz: {
            id: tz_id,
            title: tz_title,
            offset: tz_offset,
            daylight_saving: daylight_saving,
          },
          categories: [
            {
              id: category_id,
              title: category_title,
              note: lookingFor,
            },
          ],
        },
        complete: false,
      };

      // create a user
      const userId = Accounts.createUser(options);

      if (userId) {
        // if running in dev, set a default password so user can login
        if (Meteor.isDevelopment) {
          Accounts.setPassword(userId, 'password');
        }
        // create new entry
        const entry = {
          userId: userId,
          category: {
            id: category_id,
            title: category_title,
          },
          tz: {
            id: tz_id,
            title: tz_title,
            offset: tz_offset,
            daylightSaving: daylight_saving,
          },
          lookingFor,
          skillHelpOther,
          skillImproveSelf,
          oneLineIntro,
          verified: false,
          matched: '',
          flags: [],
          preferences: [],
          requesters: [],
          previousMatches: [],
        };

        EntriesHelper.add(entry);
        try {
          return Accounts.sendEnrollmentEmail(userId);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e);
        }
      }
    }
  },
});
