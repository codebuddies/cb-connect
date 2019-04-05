import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Entries from '/imports/api/entries/entries.js';
import Dashboard from '/imports/ui/components/dashboard/dashboard.jsx';

const categoryId = new ReactiveVar(3);
const handleCategoryChange = (id) => categoryId.set(id);

const DashboardContainer = withTracker((props) => {
  const entriesHandle = Meteor.subscribe('entries.board');
  const loading = !entriesHandle.ready();
  const currentUser = Meteor.user();
  const currentUserName = Meteor.user().profile.name;
  const categoryIdString = categoryId.get().toString();
  const entries = categoryIdString === 'all' ? Entries.find().fetch() : Entries.find({userId: {$ne: currentUser._id}, "category.id": categoryIdString}).fetch()
  
  const ownEntries = Entries.find({userId: {$eq: currentUser._id}, matched: "unmatched"}).fetch();
  return {
    loading,
    entries,
    currentUserName,
    ownEntries,
    handleCategoryChange
  };
})(Dashboard);

export default DashboardContainer;
