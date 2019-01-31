import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Collapse, Container, Row, Col } from 'react-bootstrap';
import Column from './column'
import '../styles/_board.scss';

class Board extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
        cards: [
            {
                'intro': 'Hobbiest PHP Developer, self taught',
                'timezone': 'PST',
                'description': 'I am hoping to make a new framework for gaming communities to use. I may even launch a more modern service to those who are not savvy with technology. I am looking for a possible partner or 2 people to help. Be helpful to throw ideas around and help with coding, not to mention staying motivated',
                'category': 'category_1',
                'name': 'ronald',
                'active': true
            },
            {
                'intro': 'one-line intro',
                'timezone': 'EST',
                'description': 'description',
                'category': 'category_2',
                'name': 'harry',
                'active': false
            }
        ]
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    this.setState({ });
  }

  render() {
    
    return (
      <Container id="board">
          <Column heading="Looking for a Coding/Accountability Partner" cards={} />
          <Column heading="Looking for Feedback/Career Advice" />
          <Column heading="Looking for a Mentor" />
          <Column heading="Would Like to Mentor or Teach" />
          <Column heading="Looking for an Open Source Project to Contribute To" />
          <Column heading="Looking for Potential Contributor(s) to my OSS project" />
          <Column heading="Other" />
      </Container>
    );
  }
}

export default Board;
