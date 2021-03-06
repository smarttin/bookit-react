import React from 'react'

export const Error = ({errors}) => {  
  return (
    errors && errors.length > 0 && (
      <div className="alert alert-danger bwm-res-errors">
        {errors.map((error, index) => <p key={index}>{error.detail}</p>)}
      </div>
    )
  )
}


