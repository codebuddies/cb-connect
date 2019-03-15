import React, { Component } from 'react';
import { CardDeck, Card, Button, ButtonGroup, Dropdown } from 'react-bootstrap';

class DashboardCardsSection extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Card as='section' className='mb-4'>
        <Card.Header className='font-weight-bold text-capitalize'>
          People looking for {this.props.section}
        </Card.Header>
        <Card.Body>
          <CardDeck className='d-block'>
            <Card style={{ width: '33%' }}>
              <Card.Body>
                <Card.Title className='font-weight-normal'>
                  Angelo Cordon
                </Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make 
                  up the bulk of the card's content.
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
        </Card.Body>
      </Card>
    )
  }
}

export default DashboardCardsSection;
