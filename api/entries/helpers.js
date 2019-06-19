import Entries from '/api/entries';

const EntriesHelper = {
  add(data) {
    Entries.insert(data);
  },
  updateFlags(data) {
    Entries.update({ _id: data.entryId }, { $push: { flags: data } });
  },
  requestEntry(data) {
    Entries.update({ _id: data.entryId }, { $push: { requesters: data } });
  },
};

export default EntriesHelper;
