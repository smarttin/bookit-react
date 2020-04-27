import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Input } from "../shared/form/Input";
import { Error } from '../shared/form/Error';

const RegisterForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props
  
  return (
    <form onSubmit={handleSubmit(submitCb)}>

      <Field
        name="username"
        label="Username"
        type="text"
        className="form-control"
        component={Input}
      />

      <Field
        name="email"
        label="Email"
        type="email"
        className="form-control"
        component={Input}
      />
    
      <Field
        name="password"
        label="Password"
        type="password"
        className="form-control"
        component={Input}
      />
    
      <Field
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        className="form-control"
        component={Input}
      />
      
      <button className="btn btn-success btn-form" type="submit" disabled={!valid || pristine || submitting}>
        Register
      </button>
      <Error errors={errors}/>
    </form>
  )
}

const validate = values => {
  const errors = {}

  if (values.username && values.username.length < 4) {
    errors.username = 'Username min length is 4 characters!'
  }
  if (!values.email) {
    errors.email = 'Please enter email'
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please enter confirm password'
  }
  if (values.password !== values.confirmPassword) {
    errors.password = 'Passwords must match'
  }

  return errors
}

export default reduxForm({
  form: 'simple', // a unique identifier for this form
  validate
})(RegisterForm)