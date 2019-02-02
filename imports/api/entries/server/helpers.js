import Entries from '/imports/api/entries/entries.js';

const EntriesHelper = {
  add(data) {
    Entries.insert(data);
  },
};

export default EntriesHelper;
