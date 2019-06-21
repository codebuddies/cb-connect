import React from 'react';
import MatchCard from '../../../components/match_card';
import { PropTypes } from 'prop-types';

class Column extends React.Component {
  render() {
    const { entries, users } = this.props;
    return (
      <div className="column">
        <h2>{this.props.heading}</h2>
        <div className="entries">
          {entries.map((entry, i) => {
            //TODO: draw from findOneUser.profile.intro, etc.
            const userId = entry.userId;
            const findOneUser = users.filter(user => user._id === userId)[0];
            return (
              <MatchCard
                key={i}
                user={findOneUser}
                lookingFor={entry.lookingFor}
                skillHelpOther={entry.skillHelpOther}
                skillImproveSelf={entry.skillImproveSelf}
                timezone={entry.tz.title}
                hideCard="true"
              />
            );
          })}
        </div>
      </div>
    );
  }
}

Column.propTypes = {
  // We can check optional and required types here
  entries: PropTypes.array,
  heading: PropTypes.string,
  users: PropTypes.array,
};

export default Column;
