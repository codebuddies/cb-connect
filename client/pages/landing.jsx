import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../hoc/AuthProvider';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.context;

    return user ? (
      <Redirect to="/dashboard" />
    ) : (
      <Container>
        <Row>
          <Col className="h-100" style={{ marginTop: 140 }}>
            <hgroup className="mx-auto p-4 text-center">
              <h2>Connect with someone in the community who can help</h2>
              <Link to="/apply">
                <button className="btn btn-primary mt-1" role="button">
                  Apply
                </button>
              </Link>
            </hgroup>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <blockquote>
              "I will say emphatically, your idea was a success!{' '}
              <a href="https://github.com/gauravchl" alt="Gaurav Chikhale Github">
                Gaurav
              </a>{' '}
              was excellent. The lost concepts I had were clarified. I will spend the day practicing what he has taught
              me and move forward. I look forward to reciprocating one day."
            </blockquote>
            <p className="text-right">
              -{' '}
              <a href="https://github.com/albertfougy" alt="Albert Fougy Github">
                Albert Fougy
              </a>
              , Developer from the U.S.
            </p>
          </Col>
          <Col sm={4}>
            <blockquote>
              "I have chosen to be a part of CodeBuddies Connect because I believe everyone needs to share their
              knowledge with other people. In the wonderful CodeBuddies community, there are many students who want to
              acquire new CS skills. Thanks to the Connect program, we have a chance to help them while learning along
              the way. Also, we are doing the most important thing: 'Free education'"
            </blockquote>
            <p className="text-right">
              -{' '}
              <a href="https://github.com/ZoranPandovski" alt="Zoran Pandovski Github">
                Zoran Pandovski
              </a>
              , Full-Stack Developer from Macedonia
            </p>
          </Col>
          <Col sm={8} />
        </Row>
      </Container>
    );
  }
}
Landing.contextType = AuthContext;
export default Landing;
