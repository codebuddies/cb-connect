import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';

function Entry(props) {
      const { timezone, lookingFor, oneLineIntro } = props;
        return (
            <div className="entry">
                <FavoriteIcon></FavoriteIcon>
                <p>{oneLineIntro}</p>
                <p>{lookingFor}</p>
                <p>{timezone}</p>
            </div>
        )
}

export default Entry;
