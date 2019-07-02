import React from 'react';
import MatchCard from '../../../components/match_card';
import { PropTypes } from 'prop-types';

class Column extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedCards: [],
    };
  }
  render() {
    const { entries, cardsSelected, allowSelection } = this.props;

    return (
      <div className="column">
        <h2>{this.props.heading}</h2>
        <div className="entries">
          {entries.map((entry, i) => (
            <MatchCard
              key={i}
              entry={entry}
              lookingFor={entry.lookingFor}
              oneLineIntro={entry.oneLineIntro}
              timezone={entry.tz.title}
              skillHelpOther={entry.skillHelpOther}
              skillImproveSelf={entry.skillImproveSelf}
              cardsSelected={cardsSelected}
              allowSelection={allowSelection}
            />
          ))}
        </div>
      </div>
    );
  }
}

Column.propTypes = {
  // We can check optional and required types here
  entries: PropTypes.array,
  heading: PropTypes.string,
  allowSelection: PropTypes.bool,
};

export default Column;
