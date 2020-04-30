import React from "react";

export const CheckBox = ({ input, label, type, className }) => (
  <div className="form-check">
    <input {...input} type={type} className={className} />
    <label className="form-check-label" htmlFor="shared">{label}</label>
  </div>
);
