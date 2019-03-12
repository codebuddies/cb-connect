import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BoardContainer from '/imports/ui/containers/board.jsx';

const Moderator = props => {
  const { user } = props;
  const { name } = user && user.profile || {}
  return (
    <Container>
      <Row>
        <Col className="h-100" style={{marginTop:40}}>
          <hgroup className="mx-auto p-4 text-center">
            <h3>Hello {name}! You are logged in!</h3>
          </hgroup>
          <BoardContainer />
        </Col>
      </Row>
    </Container>

  )
}

export default Moderator
