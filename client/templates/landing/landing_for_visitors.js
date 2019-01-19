import './landing_for_visitors.html';
import { Entries } from '../../../lib/collections/entries';
import { categories } from '../../../lib/data/categories';

Template.landing_for_visitors.onCreated(function() {
  const instance = this;
  instance.subscribe('entries.board');
});

Template.landing_for_visitors.helpers({
  categories() {
    return categories;
  },
  entries(category) {
    return Entries.find({ 'category.id': category });
  },
});
