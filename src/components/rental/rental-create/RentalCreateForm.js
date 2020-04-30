import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../../shared/form/Input';
import { TextArea } from '../../shared/form/TextArea';
import { CheckBox } from '../../shared/form/CheckBox';
import { Select } from '../../shared/form/Select';
import { FileUpload } from '../../shared/form/FileUpload';
import { Error } from '../../shared/form/Error';

const RentalCreateForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props
  const options = ['apartment', 'house', 'condo']
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="title"
        type="text"
        label='Title'
        className='form-control'
        component={Input}
      />
       <Field
        name="description"
        type="text"
        label='Description'
        rows='6'
        className='form-control'
        component={TextArea}
      />
      <Field
        name="city"
        type="text"
        label='City'
        className='form-control'
        component={Input}
      />
      <Field
        name="street"
        type="text"
        label='Street'
        className='form-control'
        component={Input}
      />
      <Field
        name="category"
        label='Category'
        className='form-control'
        options={options}
        component={Select}
      />
      <Field
        name="image"
        label='Image'
        component={FileUpload}
      />
      <Field
        name="bedrooms"
        type="number"
        label='Bedrooms'
        className='form-control'
        component={Input}
      />
      <Field
        name="dailyRate"
        type="text"
        label='Daily Rate'
        className='form-control'
        symbol='$'
        component={Input}
      />
      <Field
        name="shared"
        type="checkbox"
        label='Shared'
        className='form-check-input'
        component={CheckBox}
      />
      <button className='btn-bwm btn-form btn' type="submit" disabled={!valid || pristine || submitting}>
        Create Rental
      </button>
      <Error errors={errors} />
    </form>
  )
}

export default reduxForm({
  form: 'rentalCreateForm',
  initialValues: { shared: false, category: 'apartment'}
})(RentalCreateForm)
