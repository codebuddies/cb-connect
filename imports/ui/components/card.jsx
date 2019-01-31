import React from 'react';

class Card extends React.Component{
    render() {
        return (
            <div className="card">
                <p>{this.props.intro}</p>
                <p>{this.props.description}</p>
            </div>
        )
    }
}

export default Card;