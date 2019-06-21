import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { categories } from '/lib/data/categories.js';

import DashboardSidebar from './dashboard_sidebar';
import MatchesSection from './dashboard_matches_section';
import DashboardCardsSection from './dashboard_cards_section';

const sectionTargets = {
  //see: categories.js for numbers
  all: 'all',
  mentor: 3,
  mentee: 4,
  'open-source-project': 5,
  'contributor(s)': 6,
  'accountability-partner': 1,
  other: 2,
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Define all sections to be visible on initialize
      visibleSections: 'all',
    };
  }

  getEntries = () => {
    const { entries = [] } = this.props;
    const newId = this.state.visibleSections;

    this.props.handleCategoryChange(newId);
    return entries;
  };

  getTargetSections = section => {
    return sectionTargets[section];
  };

  // Set which section to be visible;
  // Binded handler to `DashboardSidebar` as a property for state hoisting
  handleVisibilityChange = section => {
    const targetSection = this.getTargetSections(section);
    this.setState({ visibleSections: targetSection }, function() {});
  };

  checkSectionVisibility = sectionKey => {
    const allSectionsVisible = this.state.visibleSections === 'all';
    const sectionIsVisible = this.state.visibleSections === sectionTargets[sectionKey];
    if (allSectionsVisible || sectionIsVisible) {
      return true;
    }
    return false;
  };

  render() {
    //Category comes from '/lib/data/categories.js' and is an array of objects
    const { currentUserName } = this.props;
    const sections = categories.map(section => {
      return section.short_label;
    });

    const DashboardSections = categories.map(section => {
      const key = section.short_label
        .toLowerCase()
        .split(' ')
        .join('-');
      const visible = this.checkSectionVisibility(key);
      return (
        <DashboardCardsSection
          entries={this.getEntries().filter(entry => entry.category.id === section.id)}
          section={section.short_label}
          key={key}
          users={this.props.users}
          visibility={visible}
        />
      );
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <div className="sticky-top mb-4">
              <DashboardSidebar
                sections={sections}
                currentUserName={currentUserName}
                onVisibilityChange={this.handleVisibilityChange}
              />
            </div>
          </div>
          <div className="col-sm-9">
            <MatchesSection ownEntries={this.props.ownEntries} />
            {DashboardSections}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  entries: PropTypes.array,
  users: PropTypes.array,
  handleCategoryChange: PropTypes.func,
  currentUserName: PropTypes.string,
  ownEntries: PropTypes.array,
};

export default Dashboard;
