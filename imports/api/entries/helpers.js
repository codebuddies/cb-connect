import Entries from '/imports/api/entries';

const EntriesHelper = {
  add(data) {
    Entries.insert(data);
  },
  updateFlags(data) {
    Entries.update({ _id: data.entryId }, { $push: { flags: data } });
  },
};

export default EntriesHelper;
