import React from 'react';
import Entry from './entry';
import { PropTypes } from 'prop-types';

class Column extends React.Component {
  render() {
    const { entries } = this.props;

    return (
      <div className="column">
        <h2>{this.props.heading}</h2>
        <div className="entries">
          {entries.map((entry, i) => (
            <Entry key={i} lookingFor={entry.lookingFor} oneLineIntro={entry.oneLineIntro} timezone={entry.tz.title} />
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
};

export default Column;
