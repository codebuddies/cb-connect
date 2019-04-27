import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { PropTypes } from 'prop-types';

function Entry(props) {
  const { timezone, lookingFor, oneLineIntro } = props;
  return (
    <div className="entry">
      <span className="favorite">
        <FavoriteIcon className="favorite" />
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
  lookingFor: PropTypes.array,
  oneLineIntro: PropTypes.string,
};
export default Entry;
