import React, { Component } from 'react';
import './_preview_email.scss';

class PreviewEmail extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container" id="preview_email">
        <div className="row">Preview Email</div>
      </div>
    );
  }
}

export default PreviewEmail;
