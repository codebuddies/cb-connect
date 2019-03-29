import React, { Component } from 'react'
import { Card, Dropdown, ButtonGroup, Button } from 'react-bootstrap'

class MatchCard extends Component {
  constructor (props) {
    super(props)
    console.log(props)
  }

  render () {
    return (
      <Card style={{ width: '33%' }}>
        <Card.Body>
          <Card.Title className='font-weight-normal text-capitalize'>
            { this.props.lookingFor }
          </Card.Title>
          <Card.Text>
            { this.props.oneLineIntro }
          </Card.Text>
          <Card.Text className="timezone">
            { this.props.timezone }
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
    )
  }
}

export default MatchCard
