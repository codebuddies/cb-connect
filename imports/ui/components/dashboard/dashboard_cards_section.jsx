import React, { Component } from 'react';
import { CardDeck, Card } from 'react-bootstrap';

class DashboardCardsSection extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <section className='dashboard-cards-section'>
        <div className="dashboard-cards-section-header">
          <h1 className='h5 text-capitalize font-weight-normal'>
            People looking for {this.props.section}
          </h1>
        </div>

        <CardDeck className='d-block'>
          <Card style={{ width: '33%' }}>
            <Card.Body>
              Card
            </Card.Body>
          </Card>
        </CardDeck>					
      </section>
    )
  }
}

export default DashboardCardsSection;
