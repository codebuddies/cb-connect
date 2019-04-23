import Entries from '/imports/api/entries/entries.js';

const EntriesHelper = {
  add(data) {
    Entries.insert(data);
  },
  updateFlags(data) {
    Entries.update({ _id: data.entryId }, { data });
  },
};

export default EntriesHelper;
