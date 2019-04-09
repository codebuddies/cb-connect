import React, { Component } from 'react'
import { Card, CardDeck, Dropdown, ButtonGroup, Button, Modal, Form } from 'react-bootstrap'
import '/imports/ui/styles/_cards.scss';
import { PropTypes } from 'prop-types';

class MatchCard extends Component {
  constructor (props) {
    super(props)
    this.showFlagModal = this.showFlagModal.bind(this);
    this.closeFlagModal = this.closeFlagModal.bind(this);
    this.submitFlagModal = this.closeFlagModal.bind(this);
    this.state = {
      showFlagModal: false,
    };
  }
  showFlagModal(event) {
    event.preventDefault();
    this.setState({ showFlagModal: true });
  }
  closeFlagModal(event) {
    event.preventDefault();
    this.setState({ showFlagModal: false });
  }
  submitFlagModal(event) {
    event.preventDefault();
    this.setState({ showFlagModal: false });
  }

  render() {
    const { oneLineIntro, lookingFor, ownCard, timezone } = this.props;
    return (
      <div>
      <Card>
        <Card.Body>
          <Card.Title className="font-weight-normal">{oneLineIntro}</Card.Title>
          <Card.Text>{lookingFor}</Card.Text>
          {ownCard === 'true' ? (
            ''
          ) : (
            <Dropdown as={ButtonGroup} className="btn-block">
              <Button className="btn-block" variant="primary">
                Request Match
              </Button>

              <Dropdown.Toggle split variant="primary" />

              <Dropdown.Menu>
                <Dropdown.Item as='button' onClick={this.showFlagModal}>Flag</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{timezone}</small>
        </Card.Footer>
      </Card>
      
      <Modal show={this.state.showFlagModal} onHide={this.closeFlagModal}>
      <Form>
        <Modal.Header closeButton onClick={this.closeFlagModal}>
          <Modal.Title>Why are you flagging this entry?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="formGroupFlagReason">
            <Form.Control type="text" placeholder="Enter reason" />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeFlagModal}>Close</Button>
          <Button variant="primary" type="submit" onSubmit={this.submitFlagModal}>Submit</Button>
        </Modal.Footer>
        </Form>
      </Modal>
      
    </div>
    )
  }
}

MatchCard.propTypes = {
  oneLineIntro: PropTypes.string,
  lookingFor: PropTypes.string,
  ownCard: PropTypes.boolean,
  timezone: PropTypes.string,
};

export default MatchCard;
