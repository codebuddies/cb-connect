import React, { Component } from 'react';
import BoardContainer from '/client/containers/boardcontainer.jsx';

class Moderator extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <BoardContainer />
        </div>
      </div>
    );
  }
}

export default Moderator;
