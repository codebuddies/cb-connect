import React from 'react';

class Card extends React.Component{
    render() {
      const { timezone, lookingFor, oneLineIntro } = this.props;
        return (
            <div className="card">
                <p>{oneLineIntro}</p>
                <p>{lookingFor}</p>
                <p>{timezone}</p>
            </div>
        )
    }
}

export default Card;
