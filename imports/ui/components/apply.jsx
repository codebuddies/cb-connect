import React from 'react';
import { categories } from '/lib/data/categories';
import { timezones } from '/lib/data/timezones';

class Apply extends React.Component {
  constructor(props) {
    super(props);
    this.getNavButtons = this.getNavButtons.bind(this);
    this.goNext = this.goNext.bind(this);
    this.goBack = this.goBack.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      processStep: 1,
    };
  }

  getNavButtons() {
    const { processStep } = this.state;
    const classNames = 'btn btn-default mt-2';

    return (
      <React.Fragment>
        {processStep !== 1 ? (
          <div className={classNames} onClick={this.goBack}>
            Back
          </div>
        ) : null}
        {processStep !== 3 ? (
          <div className={classNames + ' float-right'} onClick={this.goNext}>
            Next
          </div>
        ) : null}
        {processStep === 3 ? (
          <div className={classNames + ' float-right'} onClick={this.handleSubmit}>
            Submit
          </div>
        ) : null}
      </React.Fragment>
    );
  }

  goNext() {
    this.setState(state => ({ processStep: state.processStep + 1 }));
  }

  goBack() {
    this.setState(state => ({ processStep: state.processStep - 1 }));
  }

  handleSubmit() {}

  render() {
    const { processStep } = this.state;
    return (
      <div className="container  mt-4">
        <div className="card">
          <div className="card-body">
            {processStep === 1 ? (
              <form id="entry-process1" className="mt-2" noValidate>
                <div className="form-group">
                  <label className="form-control-label" htmlFor="category">
                    I am looking for:
                  </label>

                  {categories.map((category, i) => (
                    <div key={i} className="custom-control custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input"
                        name="category"
                        id={category.id}
                        value={category.id}
                      />
                      <label className="custom-control-label" htmlFor={category.id}>
                        {category.label_text}
                        <small className="text-muted">{category.muted_text}</small>
                      </label>
                    </div>
                  ))}
                </div>
              </form>
            ) : null}

            {processStep === 2 ? (
              <form id="entry-process2" className="mt-2" noValidate>
                <div className="form-group">
                  <div className="form-group">
                    <label htmlFor="entry-name">Hello, my name is:</label>
                    <input type="text" className="form-control" id="entry-name" pattern="[A-Za-z]{5,50}" required />
                    <small id="passwordHelpBlock" className="form-text text-muted">
                      Your name will be anonymous except to your match
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="entry-intro">One-line intro of yourself:</label>
                    <input type="text" className="form-control" id="entry-intro" pattern="[A-Za-z]{8,140}" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="entry-request">Please provide more detail about what you're looking for:</label>
                    <textarea
                      name="entry_request"
                      className="form-control"
                      id="entry-request"
                      rows="4"
                      cols="40"
                      required
                    />
                    <small id="passwordHelpBlock" className="form-text text-muted">
                      e.g. I am working on ______ and struggling with ______. Looking for someone who can ______.
                    </small>
                  </div>
                </div>
              </form>
            ) : null}

            {processStep === 3 ? (
              <form id="entry-process3" className="mt-2" noValidate>
                <div className="form-group">
                  <label htmlFor="entry-email">
                    Email <small className="text-muted">(We will not share your email address with others. )</small>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="entry-email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  />
                  <div className="invalid-feedback feedback-pos"> Please input valid email ID </div>
                </div>
                <div className="form-group">
                  <label htmlFor="entry-timezone">Time Zone</label>
                  <select className="custom-select" id="entry-timezone">
                    {timezones.map((timezone, i) => (
                      <option
                        key={i}
                        data-id={timezone.id}
                        data-daylight={timezone.daylight_saving}
                        value={timezone.value}
                      >
                        {timezone.label_text}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            ) : null}
          </div>
        </div>

        {this.getNavButtons()}
      </div>
    );
  }
}

export default Apply;
