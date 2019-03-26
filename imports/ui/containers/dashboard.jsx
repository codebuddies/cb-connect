import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Entries from '/imports/api/entries/entries.js';
import Dashboard from '/imports/ui/components/dashboard/dashboard.jsx';

const DashboardContainer = withTracker(() => {
  const entriesHandle = Meteor.subscribe('entries.board');
  const loading = !entriesHandle.ready();
  const entries = Entries.find().fetch();
  return {
    loading,
    entries,
  };
})(Dashboard);

export default DashboardContainer;
