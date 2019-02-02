import React from 'react';
import Card from './card';

class Column extends React.Component {
  render() {
    const { cards } = this.props;

    return (
      <div className="column">
        <h2>{this.props.heading}</h2>
        <div className="cards">
          {cards.map((card, i) => (
            <Card key={i} lookingFor={card.lookingFor} oneLineIntro={card.oneLineIntro} timezone={card.tz.title} />
          ))}
        </div>
      </div>
    );
  }
}

export default Column;
