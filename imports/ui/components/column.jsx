import React from 'react';
import Card from './card';

class Column extends React.Component{
    render() {
        return (
            <div className="column">
                <h2>{this.props.heading}</h2>
                <div className="cards">
                    <Card intro="one-line intro" description="one-line description" timezone="EST"/>
                    <Card intro="one-line intro" description="one-line description" timezone="EST"/>
                    <Card intro="one-line intro" description="one-line description" timezone="EST"/>
                    <Card intro="one-line intro" description="one-line description" timezone="EST"/>
                    <Card intro="one-line intro" description="one-line description" timezone="EST"/>
                    <Card intro="one-line intro" description="one-line description" timezone="EST"/>
                    <Card intro="one-line intro" description="one-line description" timezone="EST"/>
                    <Card intro="one-line intro" description="one-line description" timezone="EST"/>
                </div>
            </div>
        )
    }
}

export default Column;