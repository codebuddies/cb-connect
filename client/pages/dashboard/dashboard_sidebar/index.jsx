import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

class DashboardSidebar extends Component {
  constructor(props) {
    super(props);
  }

  getItemKey = event => {
    // Get `ListGroup.Item` key and hoist it back up to Dashboard state
    const sectionKey = event.target.dataset.rbEventKey;
    this.props.onVisibilityChange(sectionKey);
  };

  render() {
    const { sections, currentUserName } = this.props;

    // Add `All` as a menu item at beginning of all options
    const items = ['All'].concat(sections);

    const menuItems = items.map(item => {
      const key = item
        .toLowerCase()
        .split(' ')
        .join('-');
      return (
        <ListGroup.Item action key={key} eventKey={key} onClick={this.getItemKey}>
          {item}
        </ListGroup.Item>
      );
    });

    return (
      <>
        <p className="font-weight-normal">Welcome, {currentUserName}! What are you looking for?</p>
        <ListGroup as="ul" defaultActiveKey="all">
          {menuItems}
        </ListGroup>
      </>
    );
  }
}

DashboardSidebar.propTypes = {
  onVisibilityChange: PropTypes.func,
  sections: PropTypes.array,
  currentUserName: PropTypes.string,
};

export default DashboardSidebar;
