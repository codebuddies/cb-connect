import React, { Component } from 'react'
import { Card, CardDeck, Dropdown, ButtonGroup, Button, Modal, Form } from 'react-bootstrap'
import '/imports/ui/styles/_cards.scss';
import { PropTypes } from 'prop-types';

class MatchCard extends Component {
  constructor (props) {
    super(props)
    this.showFlagModal = this.showFlagModal.bind(this);
    this.closeFlagModal = this.closeFlagModal.bind(this);
    this.handleFlagReasonChange = this.handleFlagReasonChange.bind(this);
    this.submitFlagModal = this.submitFlagModal.bind(this);
    this.state = {
      showFlagModal: false,
      flagReason: ''
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
  handleFlagReasonChange(event) {
    alert('changed')
    this.setState({flagReason: event.target.value})
  }
  submitFlagModal(event) {
    event.preventDefault();

    const data = {
      "userId": "Am...sZ",
      "reason": this.state.flagReason
    }
    this.setState({ showFlagModal: false });
    Meteor.call("entry.flag", data, (error, result) => {
      if (error) {
        this.setState({ 'error' : error.reason });
        this.setState({ 'processing' : false });
      }
      if (result) {
        this.setState({ 'processing' : false });
        this.props.history.push('/woohoo')
      }
    });
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
            <Form.Control type="text" value={this.state.flagReason} onChange={this.handleflagReasonChange} placeholder="Enter reason" />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeFlagModal}>Close</Button>
          <Button variant="primary" onClick={this.submitFlagModal}>Submit</Button>
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
