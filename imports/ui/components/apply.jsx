import React from 'react';
import { categories } from '/lib/data/categories';
import { timezones } from '/lib/data/timezones';
import { Card, Button, Form } from 'react-bootstrap';

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
    };
  }

  goBack(e) {
    this.updateFormData(e.currentTarget.form);
    this.setState(state => ({ processStep: state.processStep - 1, formValidated: false }));
  }

  getForm1() {
    const { formValidated } = this.state;

    return (
      <Form noValidate validated={formValidated} onSubmit={this.handleSubmit}>
        <Card>
          <Card.Body>
            <Form.Label as="legend">I am looking for:</Form.Label>
            {categories.map((category, i) => (
              <Form.Check
                required
                defaultChecked={this._formData.category === category.value}
                key={i}
                name="category"
                type="radio"
                id={category.id}
                value={category.value}
                label={
                  <div>
                    {category.label_text}
                    <small className="text-muted">{' ' + category.muted_text}</small>
                  </div>
                }
              />
            ))}
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
    const { name, oneLineIntro, lookingFor } = this._formData || {};

    return (
      <Form noValidate validated={formValidated} onSubmit={this.handleSubmit}>
        <Card>
          <Card.Body>
            <Form.Group controlId="name">
              <Form.Label>Hello, my name is:</Form.Label>
              <Form.Control type="text" required defaultValue={name} pattern="[A-Za-z ]{5,50}" />
              <Form.Text className="text-muted">Your name will be anonymous except to your match</Form.Text>
            </Form.Group>

            <Form.Group controlId="oneLineIntro">
              <Form.Label>One-line intro of yourself:</Form.Label>
              <Form.Control type="text" required defaultValue={oneLineIntro} pattern="[A-Za-z ]{8,140}" />
            </Form.Group>

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
    const { formValidated } = this.state;
    return (
      <Form noValidate validated={formValidated} onSubmit={this.handleSubmit}>
        <Card>
          <Card.Body>
            <Form.Group controlId="email">
              <Form.Label>
                Email <small className="text-muted">(We will not share your email address with others. )</small>
              </Form.Label>
              <Form.Control
                type="text"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                required
                defaultValue={email}
              />
            </Form.Group>

            <Form.Group controlId="timezone">
              <Form.Label>Time Zone</Form.Label>
              <Form.Control as="select" required defaultValue={timezone}>
                {timezones.map((tz, i) => (
                  <option key={i} data-id={tz.id} data-daylight={tz.daylight_saving} value={tz.value}>
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
        <Button className="float-right" variant="outline-primary" type="submit">
          Next
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
      console.log('Data to submit', data);
    } else {
      // Move to next form
      this.setState(state => ({ formValidated: false, processStep: state.processStep + 1 }));
    }
  }

  updateFormData(form) {
    const { name, oneLineIntro, lookingFor, email, timezone, category } = form.elements;
    if (name && name.value) this._formData.name = name.value;
    if (oneLineIntro && oneLineIntro.value) this._formData.oneLineIntro = oneLineIntro.value;
    if (lookingFor && lookingFor.value) this._formData.lookingFor = lookingFor.value;
    if (email && email.value) this._formData.email = email.value;
    if (timezone && timezone.value) this._formData.timezone = timezone.value;
    if (category && category.value) this._formData.category = category.value;
  }
  render() {
    const { processStep } = this.state;

    return (
      <div className='m-auto w-100 pt-5 pl-2 pr-2' style={{maxWidth: '768px'}}>
        {processStep === 1 ? this.getForm1() : null}
        {processStep === 2 ? this.getForm2() : null}
        {processStep === 3 ? this.getForm3() : null}
      </div>
    );
  }
}

export default Apply;
