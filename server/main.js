import { Meteor } from 'meteor/meteor';
import { databaseSeeder, databaseSeedRemover } from './seeder';

import './entries/methods';
import './entries/publications';

Meteor.startup(() => {
  // code to run on server at startup

  if (Meteor.settings.seeder) {
    databaseSeeder();
    console.log('database seeded');
  } else {
    databaseSeedRemover();
    console.log('seed data removed');
  }
});
