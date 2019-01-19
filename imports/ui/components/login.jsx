import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {

    return (
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <br/>
            <br/>
            <h2 className="text-center">Login</h2>
            <br/>
            <br/>
            <form className="form-signin" novalidate>
              <div className="form-group">
                <label className="sr-only">Email address</label>
                <input type="text" className="form-control" id="selector" placeholder="Email address" autofocus autocomplete="email" />
                <div className="invalid-feedback">
                  <span id="selectorerror"></span>
                </div>
              </div>

              <div className="form-group log-status">
                <label className="sr-only">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" autocomplete="current-password" />
                <div className="invalid-feedback">
                  <span id="pwderror"></span>
                </div>
              </div>

                <button id="submit" className="btn btn-primary btn-block">Login</button>
            </form>

          </div>
        </div>
    );
  }
}

export default Login;
