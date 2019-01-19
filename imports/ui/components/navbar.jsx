import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg container">
          <Link className="navbar-brand" to="/">
            CodeBuddies Connect
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mr-3">
                <Link className="nav-link" to="/faq">
                  FAQ
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login">
                  <div className="btn btn-primary btn-sm btn-border">Login</div>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default Navbar;
