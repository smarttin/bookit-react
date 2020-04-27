import React, { Component } from "react";
import './AuthForm.scss'
import RegisterForm from './RegisterForm';
import * as actions from '../../actions';
import { Redirect } from "react-router-dom";

class Register extends Component {
  state = {
    errors: [],
    redirect: false
  };
  // useCallback
  registerUser(userData) {
    actions.register(userData)
      .then(() => this.setState({ redirect: true }))
      .catch((errors) => this.setState({ errors }));
  }

  render() {
    const { errors, redirect } = this.state;

    if (redirect) {
      return <Redirect to={{pathname: "/login", state: { successRegister: true }}}/>
    }

    return (
      <section id="register">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5">
              <h1>Register</h1>
              <RegisterForm
                submitCb={(userData) => this.registerUser(userData)}
                errors={errors}
              />
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">
                  As our member you have access to most awesome places in the
                  world.
                </h2>
                <img src={process.env.PUBLIC_URL + '/img/register-image.jpg'} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Register;
