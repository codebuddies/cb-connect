import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Entries from '/api/entries';
import Dashboard from '/client/pages/dashboard';

// eslint-disable-next-line no-undef
const categoryId = new ReactiveVar(3);
const handleCategoryChange = id => categoryId.set(id);

// eslint-disable-next-line no-unused-vars
const DashboardContainer = withTracker(props => {
  const entriesHandle = Meteor.subscribe('entries.board');
  const loading = !entriesHandle.ready();
  const currentUser = Meteor.user();
  const currentUserName = Meteor.user().profile.name;
  const categoryIdString = categoryId.get().toString();
  const users = Meteor.subscribe('users');
  const entries =
    categoryIdString === 'all'
      ? Entries.find({ userId: { $ne: currentUser._id } }).fetch()
      : Entries.find({
          userId: { $ne: currentUser._id },
          'category.id': categoryIdString,
        }).fetch();

  const ownEntries = Entries.find({ userId: { $eq: currentUser._id }, matched: 'unmatched' }).fetch();
  return {
    loading,
    entries,
    currentUserName,
    ownEntries,
    handleCategoryChange,
    users,
  };
})(Dashboard);

export default DashboardContainer;
