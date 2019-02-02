import { seedEntries, unseedEntries } from './entries';

export const databaseSeeder = () => {
  seedEntries(20);
};

export const databaseSeedRemover = () => {
  unseedEntries();
};
