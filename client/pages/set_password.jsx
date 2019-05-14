import React, { Component } from 'react';
import { Alert, Container, Button, Form, Row, Col } from 'react-bootstrap';
import { Accounts } from 'meteor/accounts-base';
import { PropTypes } from 'prop-types';

class SetPassword extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      processing: false,
      validated: false,
      error: null,
      success: null,
      password: '',
      confirmPassword: '',
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  passwordsMatch() {
    const { password, confirmPassword } = this.state;
    return password === confirmPassword;
  }
  handleSubmit(event) {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    this.setState({ validated: true });
    if (!this.passwordsMatch()) {
      this.setState({ error: 'password does not match' });
    } else {
      this.setState({ error: null });
    }

    if (form.checkValidity() === false) {
      return;
    } else {
      const { token } = this.props.match.params;
      const { password } = this.state;

      this.setState({ processing: true });

      Accounts.resetPassword(token, password, error => {
        if (error) {
          this.setState({ error: error.reason });
          this.setState({ processing: false });
        } else {
          this.setState({ processing: false });
          this.setState({ success: 'Welcome To CB Connect !' });
          this.props.history.push('/dashboard');
        }
      });
    }
  }

  render() {
    const { validated, error, success, processing } = this.state;

    return (
      <Container fluid>
        <Row>
          <Col sm={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
            <br />
            <br />
            <h2 className="text-center">Set Password</h2>
            <br />
            <br />

            <Form noValidate validated={validated} onSubmit={this.handleSubmit} autoComplete="off">
              <Form.Group controlId="password">
                <Form.Label srOnly>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                  value={this.state.password}
                  pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{3,20}$"
                  data-error="Please enter valid password"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Your password needs to be between 4 and 20 characters long.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="repeatPassword">
                <Form.Label srOnly>Confirm password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  onChange={this.handleChange}
                  value={this.state.confirmPassword}
                  pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{3,20}$"
                  data-error="Please enter valid password"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Your password needs to be between 4 and 20 characters long.
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit" block disabled={processing}>
                {processing ? 'Processing' : 'Set Password'}
              </Button>
            </Form>
            <br />
            {error ? <Alert variant="danger">{error}</Alert> : null}
            {success ? <Alert variant="success">{success}</Alert> : null}
          </Col>
        </Row>
      </Container>
    );
  }
}

SetPassword.propTypes = {
  match: PropTypes.boolean,
  history: PropTypes.array,
};

export default SetPassword;
