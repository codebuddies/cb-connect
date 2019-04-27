import React from 'react';
import { Container } from 'react-bootstrap';
import Column from './column';
import '/imports/ui/styles/_board.scss';
import { categories } from '/lib/data/categories.js';
import { PropTypes } from 'prop-types';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.getColumns = this.getColumns.bind(this);
  }

  getColumns() {
    const { entries = [] } = this.props;
    const columns = categories.map((category, i) => {
      const heading = 'Looking for ' + category.label_text;
      const filteredEntries = entries.filter(entry => entry.category.id === category.id);
      return <Column key={i} heading={heading} entries={filteredEntries} />;
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
};

export default Board;
