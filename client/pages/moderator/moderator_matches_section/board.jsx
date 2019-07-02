import React from 'react';
import { Container } from 'react-bootstrap';
import Column from './column';
import './_board.scss';
import { categories } from '/lib/data/categories.js';
import { PropTypes } from 'prop-types';
import { Meteor } from 'meteor/meteor';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.getColumns = this.getColumns.bind(this);
    this.state = {
      cardsSelected: [],
      allowSelection: true,
    };
  }
  cardsSelected = newCard => {
    let cardExists = false;
    for (let i = 0; i < this.state.cardsSelected.length; i++) {
      if (newCard['_id'] === this.state.cardsSelected[i]['_id']) {
        cardExists = true;
      }
    }
    if (cardExists) {
      const foundCards = this.state.cardsSelected.filter(card => {
        return card['_id'] !== newCard['_id'];
      });
      this.setState({ cardsSelected: foundCards });
      this.setState({ allowSelection: true });
    } else if (this.state.cardsSelected.length > 1) {
      alert('You cannot select more than two entries.');
      this.setState({ allowSelection: false });
    } else {
      this.setState({ cardsSelected: [...this.state.cardsSelected, newCard] });
      this.setState({ allowSelection: true });
    }
  };

  getColumns() {
    const { entries = [], users = [] } = this.props;
    const columns = categories.map((category, i) => {
      const heading = 'Looking for ' + category.label_text;
      const filteredEntries = entries.filter(entry => entry.category.id === category.id);
      return (
        <Column
          key={i}
          cardsSelected={newCard => this.cardsSelected(newCard)}
          heading={heading}
          entries={filteredEntries}
          allowSelection={this.state.allowSelection}
        />
      );
    });
    return [columns];
  }

  render() {
    // TODO - if loading is true show some nice loading animation!
    return <Container id="board">{this.getColumns()}</Container>;
  }
}

Board.propTypes = {
  // We can check optional and required types here
  entries: PropTypes.array,
  users: PropTypes.array,
};

export default Board;
