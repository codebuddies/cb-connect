import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';

const Woohoo = () => {
  return (
    <Container>
      <Row>
        <Col className="h-100" style={{ marginTop: 40 }}>
          <hgroup className="mx-auto p-4 text-center">
            <Image src="/img/woohoo.png" alt="woohoo" />
            <h3>Thank you for participating!</h3>
            <h4>Please check you email for application confirmation.</h4>
            <p>
              Got any questions - reach out to{' '}
              <a href="mailto:codebuddiesdotorg@gmail.com?Subject=CB%20Connect%20Question">
                codebuddiesdotorg@gmail.com
              </a>
            </p>

            <Link to="/">Go Back To Home</Link>
          </hgroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Woohoo;
