import React, { Component } from 'react';
import BoardContainer from '/client/containers/boardcontainer.jsx';
import PreviewEmail from './preview.jsx';

class Moderator extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <BoardContainer />
          <PreviewEmail />
        </div>
      </div>
    );
  }
}

export default Moderator;
