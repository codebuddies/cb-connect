import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BoardContainer from '/imports/ui/containers/board.jsx';
import '/imports/ui/styles/_dashboard.scss';

const Dashboard = props => {
  console.log(props)
  const { user } = props;
  const { name } = user && user.profile || {}
  return (
    <Container id="dashboard">
      <Row>
        <Col className="h-100" style={{marginTop:40}}>
          <hgroup className="mx-auto p-4 text-center">
            <h3>Hello {name}! You are logged in!</h3>
            <h2>Previous matches</h2>
          </hgroup>
        </Col>
      </Row>
    </Container>

  )
}

export default Dashboard
