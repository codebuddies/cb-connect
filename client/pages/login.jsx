import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Alert, Container, Button, Form, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { EMAIL_REGEX } from '/lib/constants/regex';
import { AuthContext } from '../hoc/AuthProvider';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      validated: false,
      error: null,
    };
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    this.setState({ validated: true });
    if (form.checkValidity() === false) return;

    const email = form.elements['email'].value;
    const password = form.elements['password'].value;

    Meteor.loginWithPassword(email, password, err => {
      if (err) {
        this.setState({ error: err.message });
      }
    });
  }

  render() {
    const { validated, error } = this.state;
    const { user } = this.context;

    return user ? (
      <Redirect to="/dashboard" />
    ) : (
      <Container fluid>
        <Row>
          <Col sm={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
            <br />
            <br />
            <h2 className="text-center">Login</h2>
            <br />
            <br />

            <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
              <Form.Group controlId="email">
                <Form.Label srOnly>Email address</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="email"
                  placeholder="Email address"
                  pattern={EMAIL_REGEX}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label srOnly>Password</Form.Label>
                <Form.Control type="password" required placeholder="Password" autoComplete="current-password" />
              </Form.Group>

              <Button variant="primary" type="submit" block>
                Login
              </Button>
            </Form>
            <br />
            {error ? <Alert variant="danger">{error}</Alert> : null}

            <div className="text-center">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
Login.contextType = AuthContext;
export default Login;
