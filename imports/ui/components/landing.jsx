import React from 'react';
import { Link } from 'react-router-dom';
class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="container h-100" style={{marginTop:140}}>
        <div className="row">
          <hgroup className="mx-auto p-4 text-center">
            <h2>Connect with someone in the community who can help</h2>

            <Link to="/apply">
              <button className="btn btn-primary mt-1" role="button">
                Apply
              </button>
            </Link>
          </hgroup>
        </div>
      </section>
    );
  }
}

export default Landing;
