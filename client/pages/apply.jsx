import React from 'react';
import { categories } from '/lib/data/categories';
import { timezones } from '/lib/data/timezones';
import { Alert, Card, Button, Form } from 'react-bootstrap';
import { EMAIL_REGEX } from '/lib/constants/regex';
import { Meteor } from 'meteor/meteor';
import { PropTypes } from 'prop-types';

class Apply extends React.Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getForm1 = this.getForm1.bind(this);
    this.getForm2 = this.getForm2.bind(this);
    this.getForm3 = this.getForm3.bind(this);
    this.updateFormData = this.updateFormData.bind(this);
    this._formData = {};
    this.state = {
      processStep: 1,
      formValidated: false,
      error: null,
      processing: false,
    };
  }

  goBack(e) {
    this.updateFormData(e.currentTarget.form);
    this.setState(state => ({ processStep: state.processStep - 1, formValidated: false }));
  }

  getForm1() {
    const { formValidated } = this.state;
    const { lookingFor } = this._formData || {};
    return (
      <Form noValidate validated={formValidated} onSubmit={this.handleSubmit}>
        <Card>
          <Card.Body>
            <Form.Label as="legend">I am looking for:</Form.Label>
            {categories.map((category, i) => (
              <Form.Check
                required
                defaultChecked={this._formData.category === category.id}
                key={i}
                name="category"
                type="radio"
                id={category.id}
                value={category.id}
                label={
                  <div>
                    {category.label_text}
                    <small className="text-muted">{' ' + category.muted_text}</small>
                  </div>
                }
              />
            ))}
            <hr />
            <Form.Group controlId="lookingFor">
              <Form.Label>Please provide more detail about what you're looking for:</Form.Label>
              <Form.Control as="textarea" rows="4" required defaultValue={lookingFor} />
              <Form.Text className="text-muted">
                e.g. I am working on ______ and struggling with ______. Looking for someone who can ______.
              </Form.Text>
            </Form.Group>
          </Card.Body>
        </Card>
        <br />
        <Button className="float-right" variant="outline-primary" type="submit">
          Next
        </Button>
      </Form>
    );
  }

  getForm2() {
    const { formValidated } = this.state;
    const { name, oneLineIntro, skillHelpOther, skillImproveSelf } = this._formData || {};

    return (
      <Form noValidate validated={formValidated} onSubmit={this.handleSubmit}>
        <Card>
          <Card.Body>
            <Form.Group controlId="name">
              <Form.Label>Hello, my name is:</Form.Label>
              <Form.Control
                type="text"
                required
                defaultValue={name}
                pattern="[A-Za-z][\w\- ]{1,49}"
                data-error="Please enter"
              />
              <Form.Control.Feedback type="invalid">
                Your name needs to be between 2 and 50 characters long and begin with a letter. Underscores and hyphens
                are the only special characters allowed.
              </Form.Control.Feedback>
              <Form.Text className="text-muted">Your name will be anonymous except to your match</Form.Text>
            </Form.Group>

            <Form.Group controlId="oneLineIntro">
              <Form.Label>One-line intro of yourself:</Form.Label>
              <Form.Control type="text" required defaultValue={oneLineIntro} pattern="[\w\-,!?\x27\x22\s\.]{8,140}" />
              <Form.Control.Feedback type="invalid">
                Please share an intro between 8 and 140 characters long. Avoid non-standard special characters.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="skillHelpOther">
              <Form.Label>What skill(s) can you help others with?</Form.Label>
              <Form.Control type="text" required defaultValue={skillHelpOther} pattern="[\w\-,!?\x27\x22\s\.]{1,140}" />
              <Form.Text className="text-muted">
                Coding skills are nice, but this doesn't have to be technical!
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="skillImproveSelf">
              <Form.Label>What skill(s) are you trying to improve?</Form.Label>
              <Form.Control
                type="text"
                required
                defaultValue={skillImproveSelf}
                pattern="[\w\-,!?\x27\x22\s\.]{1,140}"
              />
              <Form.Text className="text-muted">e.g C, javascript, python, web dev, git, interviewing, etc.</Form.Text>
            </Form.Group>
          </Card.Body>
        </Card>
        <br />
        <Button onClick={this.goBack} variant="outline-primary">
          Back
        </Button>
        <Button className="float-right" variant="outline-primary" type="submit">
          Next
        </Button>
      </Form>
    );
  }

  getForm3() {
    const { email, timezone } = this._formData || {};
    const { formValidated, processing } = this.state;
    return (
      <Form noValidate validated={formValidated} onSubmit={this.handleSubmit}>
        <Card>
          <Card.Body>
            <Form.Group controlId="email">
              <Form.Label>
                Email <small className="text-muted">(We will not share your email address with others. )</small>
              </Form.Label>
              <Form.Control type="text" pattern={EMAIL_REGEX} required defaultValue={email} />
              <Form.Control.Feedback type="invalid">Please share a valid email.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="timezone">
              <Form.Label>Time Zone</Form.Label>
              <Form.Control as="select" required defaultValue={timezone}>
                {timezones.map((tz, i) => (
                  <option key={i} data-id={tz.id} data-daylight={tz.daylight_saving} value={tz.id}>
                    {tz.label_text}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Card.Body>
        </Card>
        <br />
        <Button onClick={this.goBack} variant="outline-primary">
          Back
        </Button>
        <Button className="float-right" variant="outline-primary" type="submit" disabled={processing}>
          {processing ? 'Processing' : 'Submit'}
        </Button>
      </Form>
    );
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    this.updateFormData(form);
    event.preventDefault();
    event.stopPropagation();

    //Form is invalid
    if (form.checkValidity() === false) {
      return this.setState({ formValidated: true });
    }

    // Final step to submit the form
    if (this.state.processStep === 3) {
      // TODO submit the form to backend
      const data = this._formData;
      this.setState({ processing: true });
      Meteor.call('users.enroll', data, (error, result) => {
        if (error) {
          this.setState({ error: error.reason });
          this.setState({ processing: false });
        }
        if (result) {
          this.setState({ processing: false });
          this.props.history.push('/woohoo');
        }
      });
    } else {
      // Move to next form
      this.setState(state => ({ formValidated: false, processStep: state.processStep + 1 }));
    }
  }

  updateFormData(form) {
    const {
      name,
      oneLineIntro,
      lookingFor,
      skillHelpOther,
      skillImproveSelf,
      email,
      timezone,
      category,
    } = form.elements;
    if (name && name.value) this._formData.name = name.value;
    if (oneLineIntro && oneLineIntro.value) this._formData.oneLineIntro = oneLineIntro.value;
    if (lookingFor && lookingFor.value) this._formData.lookingFor = lookingFor.value;
    if (skillHelpOther && skillHelpOther.value) this._formData.skillHelpOther = skillHelpOther.value;
    if (skillImproveSelf && skillImproveSelf.value) this._formData.skillImproveSelf = skillImproveSelf.value;
    if (email && email.value) this._formData.email = email.value;
    if (timezone && timezone.value) this._formData.timezone = timezone.value;
    if (category && category.value) this._formData.category = category.value;
  }
  render() {
    const { processStep, error } = this.state;
    return (
      <div className="m-auto w-100 pt-5 pl-2 pr-2" style={{ maxWidth: '768px' }}>
        {error ? <Alert variant="danger">{error}</Alert> : null}
        {processStep === 1 ? this.getForm1() : null}
        {processStep === 2 ? this.getForm2() : null}
        {processStep === 3 ? this.getForm3() : null}
      </div>
    );
  }
}

Apply.propTypes = {
  // We can check optional and required types here
  history: PropTypes.object,
};

export default Apply;
