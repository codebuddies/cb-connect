import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Entries from '/api/entries';
import Board from '/client/pages/moderator/moderator_matches_section/board.jsx';

const usersToMatch = new ReactiveVar(['a', 'b']);
const handleUsersToMatch = arr => {
  usersToMatch.set(arr);
};

const BoardContainer = withTracker(() => {
  const entriesHandle = Meteor.subscribe('entries.board');
  const userEntries = Meteor.subscribe('allUsers');
  const loading = !entriesHandle.ready();
  const entries = Entries.find({ matched: 'false' }).fetch();
  const users = Meteor.users.find().fetch();

  const findUsersToMatch = Meteor.users.find({ _id: { $in: usersToMatch.get() } }).fetch();

  // eslint-disable-next-line no-unused-vars
  const currentUser = Meteor.userId();
  return {
    loading,
    entries,
    users,
    handleUsersToMatch,
    findUsersToMatch,
  };
})(Board);

export default BoardContainer;
