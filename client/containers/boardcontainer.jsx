import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Entries from '/api/entries';
import Board from '/client/pages/moderator/moderator_matches_section/board.jsx';

const BoardContainer = withTracker(() => {
  const entriesHandle = Meteor.subscribe('entries.board');
  const loading = !entriesHandle.ready();
  const entries = Entries.find().fetch();
  const users = Meteor.users.find().fetch();
  // eslint-disable-next-line no-unused-vars
  const currentUser = Meteor.userId();
  return {
    loading,
    entries,
    users,
  };
})(Board);

export default BoardContainer;
