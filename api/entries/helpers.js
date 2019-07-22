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
    Entries.update({ _id: data.idA }, { $set: { matched: data.idB } });
    Entries.update({ _id: data.idB }, { $set: { matched: data.idA } });
  },
};

export default EntriesHelper;
