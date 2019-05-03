import React from 'react';
import { MdFavorite } from 'react-icons/md';
import { PropTypes } from 'prop-types';

function Entry(props) {
  const { timezone, lookingFor, oneLineIntro } = props;
  return (
    <div className="entry">
      <span className="favorite">
        <MdFavorite className="favorite" />
      </span>
      <p>{oneLineIntro}</p>
      <p>{lookingFor}</p>
      <p>{timezone}</p>
    </div>
  );
}

Entry.propTypes = {
  // We can check optional and required types here
  timezone: PropTypes.string,
  lookingFor: PropTypes.string,
  oneLineIntro: PropTypes.string,
};
export default Entry;
