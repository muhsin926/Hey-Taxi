import React from "react";

const Button = ({ stlye, title, handleClick }) => {
  return <button className={stlye} onClick={handleClick}>{title}</button>;
};

export default Button;
