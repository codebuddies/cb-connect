import React, {Component} from 'react'
import {CardDeck, Card, Collapse} from 'react-bootstrap'
import MatchCard from './match_card'

class DashboardCardsSection extends Component {
  render () {
    const {section, visibility} = this.props

    return (
      <Collapse in={visibility}>
        <Card as='section' className='mb-4'>
          <Card.Header className='text-capitalize'>
            People looking for {section}
          </Card.Header>
          <Card.Body>
              <CardDeck className='d-block'>
                <MatchCard name="Test" overview='some text'/>
              </CardDeck>					
          </Card.Body>
        </Card>
      </Collapse>
    )
  }
}

export default DashboardCardsSection
