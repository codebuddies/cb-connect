import React, {Component} from 'react'
import {CardDeck, Card, Collapse} from 'react-bootstrap'
import MatchCard from './match_card'

class DashboardCardsSection extends Component {
  render () {
    const {section, visibility, entries} = this.props
    console.log(this.props.entries)
    return (
      <Collapse in={visibility}>
        <Card as='section' className='mb-4'>
          <Card.Header className='text-capitalize'>
            People looking for {section}
          </Card.Header>
          <Card.Body>
               {entries.length ? entries.map((entry, i) => (
                  <MatchCard lookingFor={entry.lookingFor} timezone={entry.tz.title} oneLineIntro={entry.oneLineIntro}/>
               )) : <Card.Text>No active entries were found.</Card.Text>}			
          </Card.Body>
        </Card>
      </Collapse>
    )
  }
}

export default DashboardCardsSection
