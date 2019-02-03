import React from 'react';

function Entry(props) {
      const { timezone, lookingFor, oneLineIntro } = props;
        return (
            <div className="entry">
                <span className="pull-right">♥</span>
                <p>{oneLineIntro}</p>
                <p>{lookingFor}</p>
                <p>{timezone}</p>
            </div>
        )
}

export default Entry;
