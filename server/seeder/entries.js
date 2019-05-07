import faker from 'faker';
import { categories } from '../../lib/data/categories';
import { timezones } from '../../lib/data/timezones';
import Entries from '/api/entries';

/**
 * This is a description of the foo function.
 * @function
 * @param {string}
 */
const generateEntry = () => {
  const { value: categoryId = null, label_text: categoryTitle = null } = faker.random.arrayElement(categories);

  const entry = {
    category: {
      id: categoryId,
      title: categoryTitle,
    },
    applicant: {
      name: faker.name.findName(),
      timezone: faker.random.arrayElement(timezones),
      introduction: faker.lorem.sentences(1),
    },
    purpose: faker.lorem.sentences(2),
    document_type: 'SEED',
  };

  return entry;
};

/**
 * This is a description of the foo function.
 * @function
 * @param {string}
 */
const seedEntries = (count = 0) => {
  if (Entries.find().count() !== 0) {
    return;
  }

  for (let i = 0; i < count; i++) {
    Entries.insert(generateEntry());
  }
};
const unseedEntries = () => {
  Entries.remove({ document_type: 'SEED' });
};

export { seedEntries, unseedEntries };
