import { Meteor } from 'meteor/meteor';
import { databaseSeeder, databaseSeedRemover } from './seeder';
import './configs';
import './users/methods';

import '/api/entries/publications.js';
import '/api/entries/methods.js';

Meteor.startup(() => {
  // code to run on server at startup

  if (Meteor.settings.seeder) {
    databaseSeeder();
  } else {
    databaseSeedRemover();
  }

  const smtp = {
    username: Meteor.settings.private.smtp.username,
    password: Meteor.settings.private.smtp.password,
    server: Meteor.settings.private.smtp.host,
    port: Meteor.settings.private.smtp.port,
  };

  process.env.MAIL_URL =
    'smtp://' +
    encodeURIComponent(smtp.username) +
    ':' +
    encodeURIComponent(smtp.password) +
    '@' +
    encodeURIComponent(smtp.server) +
    ':' +
    smtp.port;
});
