import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
// import BoardContainer from '/imports/ui/containers/board.jsx';
// import '/imports/ui/styles/_dashboard.scss';
import DashboardSidebar from './dashboard_sidebar';

const Dashboard = props => {
  const { user } = props;
  const { name } = user && user.profile || {}
  
  return (
    <Container>
      <Row>
        <DashboardSidebar></DashboardSidebar>
        <Col>
          <p className='font-weight-bold'>
            Your Current Matches
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard
