import React from "react";

const CustomInput = (props) => {
  const {
    label,
    type,
    name,
    value,
    onChange,
    onBlur,
    disabled,
    error,
    placeholder = "",
  } = props;

  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold leading-6 text-gray-900">
          {label}
        </label>
      )}
      <div className={`${label ? "mt-1.5" : "mt-0"}`}>
        <input
          type={type}
          name={name}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default CustomInput;
