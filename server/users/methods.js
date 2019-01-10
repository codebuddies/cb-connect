import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  'users.isExists' (email) {
    const user = Accounts.findUserByEmail(email);
    if (user) {
      return true;
    }
    return false;
  }
});
