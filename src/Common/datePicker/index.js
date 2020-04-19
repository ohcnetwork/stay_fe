import DatePicker from "react-date-picker";
import React from "react";
function DatePickerComponent({ value, onChange }) {
  return (
    <DatePicker
      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-2 px-4"
      onChange={(date) => onChange(date)}
      value={value}
    />
  );
}

export default DatePickerComponent;
