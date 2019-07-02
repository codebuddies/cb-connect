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
  matchUser(data) {
    //TODO: Update both entries to say matched: true
  },
};

export default EntriesHelper;
