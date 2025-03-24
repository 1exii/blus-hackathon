import React from "react";
import "./Button.css";
const Button = ({ styles, link, text = "Get Started", handleOnClick }) => (
  <a
    href={link}
    onClick={handleOnClick}
    className={`button py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
  >
    {text}
  </a>
);

export default Button;
