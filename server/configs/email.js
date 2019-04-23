import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Accounts.emailTemplates.siteName = Meteor.settings.private.siteInfo.name;
Accounts.emailTemplates.from = Meteor.settings.private.emails.person;

Accounts.emailTemplates.enrollAccount.subject = user => {
  return `Welcome to CB Connect, ${user.profile.name}`;
};

Accounts.emailTemplates.enrollAccount.text = (user, url) => {
  return "You've joined CB Connect." + ' Please activate your account by simply clicking on the link below:\n\n' + url;
};
