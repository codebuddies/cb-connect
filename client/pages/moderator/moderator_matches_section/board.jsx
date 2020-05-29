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
      subscription: {
        users: Meteor.subscribe('allUsers'),
      },
    };
  }

  getColumns() {
    const { entries = [], users = [] } = this.props;
    const columns = categories.map((category, i) => {
      const heading = 'Looking for ' + category.label_text;
      const filteredEntries = entries.filter(entry => entry.category.id === category.id);
      return <Column key={i} heading={heading} entries={filteredEntries} users={users} />;
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
