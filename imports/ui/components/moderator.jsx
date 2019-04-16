import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from './hoc/AuthProvider'
import BoardContainer from '/imports/ui/containers/board.jsx';

class Moderator extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { user } = this.context
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
}

Moderator.contextType = AuthContext
export default Moderator
