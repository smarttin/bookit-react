import React, { Component } from 'react'

export class FileUpload extends Component {
  onChange(event) {
    const { input: {onChange}} = this.props;
    onChange('https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image.jpeg')
  }
  render() {
    const {label, meta: { touched, error }} = this.props;

    return (
      <div className='form-group'>
        <label>{label}</label>
        <div className='input-group'>
          <input type="file" accept=".jpg, .png, .jpeg" onChange={() => this.onChange()} />
        </div>
        {touched && (error && <div className="alert alert-danger">{error}</div>)}
      </div>
    )
  }
}
