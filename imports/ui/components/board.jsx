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
                'intro': 'SDET/QA constantly looking to improve.',
                'timezone': 'EST',
                'description': 'Goal: Produce functional software and improve developer skills through practice.',
                'category': 'category_1',
                'name': 'harry',
                'active': false
            },
            {
              'intro': 'I am Developer from Cote D\'Ivoire. I work mainly with NodeJS, PHP but I know some Python and Java.',
              'timezone': 'EST',
              'description': 'Async programming in Javascript',
              'category': 'category_4',
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
          <Column heading="Looking for a Coding/Accountability Partner" cards={this.state.cards.filter((card) => card['category'] == 'category_1')} />
          <Column heading="Would Like to Mentor or Teach" cards={this.state.cards.filter((card) => card['category'] == 'category_4')}/>
          <Column heading="Looking for a Mentor" cards={this.state.cards.filter((card) => card['category'] == 'category_3')}/>
          <Column heading="Looking for Feedback/Career Advice" cards={this.state.cards.filter((card) => card['category'] == 'category_2')} />
          <Column heading="Looking for an Open Source Project to Contribute To" cards={this.state.cards.filter((card) => card['category'] == 'category_5')} />
          <Column heading="Looking for Potential Contributor(s) to my OSS project" cards={this.state.cards.filter((card) => card['category'] == 'category_6')}/>
          <Column heading="Other" cards={this.state.cards.filter((card) => card['category'] == 'category_7')} />
      </Container>
    );
  }
}

export default Board;
