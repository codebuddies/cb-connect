import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { CardColumns, Card, Collapse } from 'react-bootstrap';
import MatchCard from '/client/components/match_card';

class DashboardCardsSection extends Component {
  render() {
    const { section, visibility, entries } = this.props;
    const sectionMapper = {
      Mentor: 'Mentees to help',
      Mentee: 'Mentors',
      'Open Source Project': 'Contributors to their Open Source project',
      'Contributor(s)': 'Open Source Projects to contribute to',
      'Accountability Partner': 'Accountabili-buddies',
      Other: 'Other',
    };
    return (
      <Collapse in={visibility}>
        <Card as="section" className="mb-2">
          <Card.Header className="text-capitalize">People looking for {sectionMapper[section]}</Card.Header>
          <Card.Body as={CardColumns}>
            {entries.length ? (
              entries.map((entry, i) => {
                return (
                  <MatchCard
                    key={i}
                    lookingFor={entry.lookingFor}
                    intro={entry.oneLineIntro}
                    skillHelpOther={entry.skillHelpOther}
                    skillImproveSelf={entry.skillImproveSelf}
                    timezone={entry.tz.title}
                    hideCard="true"
                  />
                );
              })
            ) : (
              <Card.Text>No active entries were found.</Card.Text>
            )}
          </Card.Body>
        </Card>
      </Collapse>
    );
  }
}

DashboardCardsSection.propTypes = {
  section: PropTypes.string,
  visibility: PropTypes.bool,
  entries: PropTypes.array,
};

export default DashboardCardsSection;
