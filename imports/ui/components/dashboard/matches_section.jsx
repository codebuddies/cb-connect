import React from 'react'
import { Card, Nav, Tab } from 'react-bootstrap'
import MatchCard from './match_card'

const MatchesSection = (props) => {
  const {ownEntries} = props;
  return (
    <Tab.Container defaultActiveKey='currentMatches'>
      <Card as='section' className='mb-4'>
        <Card.Header>
          <Nav variant='tabs' defaultActiveKey='currentMatches'>
            <Nav.Item>
              <Nav.Link eventKey='currentMatches'>
                Current Matches
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='pastMatches'>Past Matches</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Tab.Content as={ Card.Body }>
          <Tab.Pane eventKey='currentMatches'>
            {ownEntries.length ? ownEntries.map((entry, i) => (
                  <MatchCard key={i} lookingFor={entry.lookingFor} timezone={entry.tz.title} oneLineIntro={entry.oneLineIntro} ownCard="true"/>
               )) : <Card.Text>You don't have any current matches.</Card.Text>}			
          </Tab.Pane>
          <Tab.Pane eventKey='pastMatches'>
            <Card.Text>
              You don't have any past matches.
            </Card.Text>
          </Tab.Pane>
        </Tab.Content>
      </Card>
    </Tab.Container>
  )
}

export default MatchesSection
