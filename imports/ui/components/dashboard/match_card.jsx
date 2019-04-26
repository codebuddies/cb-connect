import React, { Component } from 'react';
import { Card, Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import '/imports/ui/styles/_cards.scss';
import { PropTypes } from 'prop-types';

class MatchCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { oneLineIntro, lookingFor, ownCard, timezone } = this.props;
    return (
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
                <Dropdown.Item as="button">Report</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{timezone}</small>
        </Card.Footer>
      </Card>
    );
  }
}

MatchCard.propTypes = {
  oneLineIntro: PropTypes.string,
  lookingFor: PropTypes.string,
  ownCard: PropTypes.boolean,
  timezone: PropTypes.string,
};

export default MatchCard;
