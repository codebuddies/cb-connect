import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user) => {
  const customizedUser = Object.assign({
    complete: false,
  }, user);

  if (options.profile) {
    customizedUser.profile = options.profile;
  }

  return customizedUser;
});


Meteor.methods({
  'users.enroll' (data) {

    // check if user exists or not.
    const {step3: {email, timezoneOffset, timezoneId, timezoneDaylightSaving, timezoneTitle } = {} } = data;
    const {step2: {name, intro } = {} } = data;
    const {step1: {categories } = {} } = data;
    const actor = Accounts.findUserByEmail(email);

    const tz = {
      id: timezoneId,
      title: timezoneTitle,
      offset: timezoneOffset,
      daylight: Number(timezoneDaylightSaving)
    }

    if (actor) {


    } else {

      // create new user
      const options = {
        email,
        profile: {
          name: name,
          intro: intro,
          tz: tz,
          categories: categories
        }
      }

      // create a user
      const userId = Accounts.createUser(options);

      if (userId) {
        // send welcome email
        try {
            return Accounts.sendEnrollmentEmail(userId);
        } catch (e) {
            console.log(e);
        }

      }
    }
  }
});
