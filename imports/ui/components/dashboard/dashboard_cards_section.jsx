import React, { Component } from 'react';
import { CardDeck, Card } from 'react-bootstrap';
import MatchCard from './match_card';

class DashboardCardsSection extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Card as='section' className='mb-4'>
        <Card.Header className='text-capitalize'>
          People looking for {this.props.section}
        </Card.Header>
        <Card.Body>
          <CardDeck className='d-block'>
            <MatchCard name='angelo cordon' overview='some text'/>
          </CardDeck>					
        </Card.Body>
      </Card>
    )
  }
}

export default DashboardCardsSection;
