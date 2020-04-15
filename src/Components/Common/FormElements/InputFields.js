import React from "react";

export const TextInputField = ({ label, type, name, placeholder, value, onChange, error }) => {
    return (
        <div className="form-group">
            {label && <label className="label">{label}</label>}
            <input type={type} className={`input ${error ? "error" : ""}`} name={name} placeholder={placeholder} value={value} onChange={onChange} />
            {error && <div className="error-text">{error}</div>}
        </div>
    );
};

export const SelectInputField = ({ label, options, name, placeholder, value, onChange, error }) => {
    return (
        <div className="form-group">
            {label && <label className="label">{label}</label>}
            <select className={`select ${error ? "error" : ""}`} name={name} placeholder={placeholder} value={value} onChange={onChange} >
                {options.map(opt => <option key={opt.type} value={opt.type}>{opt.string}</option>)}
            </select>
            {error && <div className="error-text">{error}</div>}
        </div>
  );
};
