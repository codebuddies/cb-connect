import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, Container, Button, Form, Row, Col } from 'react-bootstrap';
import { Accounts } from 'meteor/accounts-base';
import { EMAIL_REGEX } from '/lib/constants/regex';
import { AuthContext } from '../hoc/AuthProvider';
import { Redirect } from 'react-router-dom';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      processing: false,
      validated: false,
      error: null,
      success: null,
    };
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    this.setState({ validated: true });
    if (form.checkValidity() === false) return;

    const email = form.elements['email'].value;

    Accounts.forgotPassword({ email }, err => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ success: 'Check your email for instructions' });
      }
    });
  }

  render() {
    const { validated, error, success, processing } = this.state;
    const { user } = this.context;

    return user ? (
      <Redirect to="/home" />
    ) : (
      <Container fluid>
        <Row>
          <Col sm={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
            <br />
            <br />
            <h2 className="text-center">Forgot Password?</h2>
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

              <Button variant="primary" type="submit" block disabled={processing}>
                {processing ? 'Processing' : 'Submit'}
              </Button>
            </Form>
            <br />
            {error ? <Alert variant="danger">{error}</Alert> : null}
            {success ? <Alert variant="success">{success}</Alert> : null}

            <div className="text-center">
              <Link to="/login">Login</Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
ForgotPassword.contextType = AuthContext;
export default ForgotPassword;
