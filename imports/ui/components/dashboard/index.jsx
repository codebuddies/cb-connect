import React from 'react';
import { Container, Row, Col, CardDeck, Card } from 'react-bootstrap';
import DashboardSidebar from './dashboard_sidebar';

const Dashboard = props => {

  return (
    <Container>
      <Row>
        <Col sm='3'>
          <DashboardSidebar></DashboardSidebar>
        </Col>
        
        <Col>
          {/* Your Current Matches */}

          {/* Accordions:
          + Mentors
          + Mentees
          + OSS Projects
          + Contributors
          + Accountabili-buddies
					Other */}
					
          {/* Mentors */}
          <section className='dashboard-card-section'>
            <h1 className='h5 text-capitalize font-weight-normal'>
              People looking for mentors
            </h1>

            <CardDeck className='d-block'>
              <Card style={{ width: '33%' }}>
                <Card.Body>
                  Hello
                </Card.Body>
              </Card>
            </CardDeck>					
          </section>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard
