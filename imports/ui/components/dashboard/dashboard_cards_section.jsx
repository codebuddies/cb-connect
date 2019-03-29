import React, {Component} from 'react'
import {CardDeck, CardColumns, Card, Collapse} from 'react-bootstrap'
import MatchCard from './match_card'

class DashboardCardsSection extends Component {
  render () {
    const {section, visibility, entries} = this.props
    console.log(this.props.entries)
    const sectionMapper = {
      'Mentors': 'Mentees to help', 
      'Mentees': 'Mentors',
      'OSS Projects':'OSS Contributors to their project',
      'OSS Contributors': 'OSS Projects to contribute to',
      'Accountabili-buddies': 'Accountabili-buddies',
      'Other':'Other'
    }
    return (
      <Collapse in={visibility}>
        <Card as='section'>
          <Card.Header className='text-capitalize'>
            People looking for {sectionMapper[section]}
          </Card.Header>  
          <Card.Body>
               {entries.length ? entries.map((entry, i) => (
                  <MatchCard key={i} lookingFor={entry.lookingFor} timezone={entry.tz.title} oneLineIntro={entry.oneLineIntro}/>
               )) : <Card.Text>No active entries were found.</Card.Text>}			
          </Card.Body>
        </Card>
      </Collapse>
    )
  }
}

export default DashboardCardsSection
