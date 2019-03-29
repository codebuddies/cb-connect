import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Entries from '/imports/api/entries/entries.js';
import Board from '/imports/ui/components/board/board.jsx';

const BoardContainer = withTracker(() => {
  const entriesHandle = Meteor.subscribe('entries.board');
  const loading = !entriesHandle.ready();
  const entries = Entries.find().fetch();
  const currentUser = Meteor.userId();

  return {
    loading,
    entries,
  };
})(Board);

export default BoardContainer;
