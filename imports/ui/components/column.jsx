import React from 'react';
import Card from './card';

class Column extends React.Component{
    render() {
        return (
            <div className="column">
                <h2>{this.props.heading}</h2>
                <div className="cards">
                    {console.log(this.props)}
                    {this.props.cards.map((card) => {
                        return <Card intro={card.intro} description={card.description} timezone={card.timezone}/>
                    })}
                    
                </div>
            </div>
        )
    }
}

export default Column;