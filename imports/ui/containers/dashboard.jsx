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
  const categoryIdString = categoryId.get().toString();

  const entries = Entries.find({userId: {$ne: currentUser._id}, "category.id": categoryIdString}, {limit: 9}).fetch();
  
  const ownEntries = Entries.find().fetch();
  return {
    loading,
    entries,
    ownEntries,
    handleCategoryChange
  };
})(Dashboard);

export default DashboardContainer;
