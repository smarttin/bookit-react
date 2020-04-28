import React from 'react';
import './AuthForm.scss';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../actions/authActions';

class Login extends React.Component {

  loginUser(userData) {
    this.props.dispatch(login(userData));
  }

  render() {
    const { isAuth, errors } = this.props.auth;
    const { successRegister } = this.props.location.state || false;

    if (isAuth) {
      return <Redirect to={{pathname: '/rentals'}} />
    }

    return (
      <section id="login">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5">
              <h1>Login</h1>
              {
                successRegister &&
                  <div className='alert alert-success'>
                    <p> You have been succesfuly registered, please login now. </p>
                  </div>
              }
              <LoginForm submitCb={(userData) => this.loginUser(userData)} errors={errors}/>
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">Hundreds of awesome places in reach of few clicks.</h2>
                <img src={process.env.PUBLIC_URL + '/img/login-image.jpg'} alt=""/>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Login)


