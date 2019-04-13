import Entries from '/imports/api/entries/entries.js';

const EntriesHelper = {
  add(data) {
    Entries.insert(data);
  },
  update(data) {
    Entries.update({ _id: 'tbJfBm7KjwXznhnFj' }, { $set: data });
  },
};

export default EntriesHelper;
