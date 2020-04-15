import React from "react";

export const TextInputField = ({ label, type, name, placeholder, value, onChange, error }) => {
  return (
    <div className="form-group">
      {label && <label className="label">{label}</label>}
      <input type={type} className={`input ${error? "error": ""}`} name={name} placeholder={placeholder} value={value} onChange={onChange} />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};
