import React, { Component } from 'react'
import { Card, CardDeck, Dropdown, ButtonGroup, Button } from 'react-bootstrap'
import '/imports/ui/styles/_cards.scss';

class MatchCard extends Component {
  constructor (props) {
    super(props)
    console.log(props)
  }

  render () {
    return (
      <CardDeck style={{ width: '50%' }}>
      <Card>
        <Card.Body>
          <Card.Title className='font-weight-normal text-capitalize'>
            { this.props.lookingFor }
          </Card.Title>
          <Card.Text>
            { this.props.oneLineIntro }
          </Card.Text>
          <Card.Text>
            <small className="text-muted">{ this.props.timezone }</small>
          </Card.Text>
          <Dropdown as={ButtonGroup} className='btn-block'>
            <Button className='btn-block' variant="primary">
              Request Connection
            </Button>
  
            <Dropdown.Toggle split variant="primary" />
  
            <Dropdown.Menu>
              <Dropdown.Item as='button'>Report</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Body>
      </Card>
      </CardDeck>
    )
  }
}

export default MatchCard
