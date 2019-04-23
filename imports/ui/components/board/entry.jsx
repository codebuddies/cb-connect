import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

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

export default Entry;
