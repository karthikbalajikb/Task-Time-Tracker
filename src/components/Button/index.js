import React from "react";

const Button = ({ variant, label, disabled, onClick, className }) => (
  <button
    disabled={disabled}
    className={`rounded-lg px-4 bg-gray-800 focus:outline-none relative text-white ${className}`}
    onClick={disabled ? () => null : onClick}
  >
    {label}
  </button>
);

export default Button;
