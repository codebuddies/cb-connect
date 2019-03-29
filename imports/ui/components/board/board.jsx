import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Collapse, Container, Row, Col } from 'react-bootstrap';
import Column from './column';
import '/imports/ui/styles/_board.scss';
import { categories } from '/lib/data/categories.js';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.getColumns = this.getColumns.bind(this);
  }

  getColumns() {
    const { entries = [] } = this.props;
    console.log(this.props.entries)
    const columns = categories.map((category, i) => {
      const heading = 'Looking for ' + category.label_text;
      const filteredEntries = entries.filter(entry => entry.category.id === category.id);
      return <Column key={i} heading={heading} entries={filteredEntries} />;
    });
    return [columns];
  }

  render() {
    const { loading } = this.props;
    // TODO - if loading is true show some nice loading animation!
    return <Container id="board">{this.getColumns()}</Container>;
  }
}

export default Board;
