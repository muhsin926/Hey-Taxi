import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ style, title, bg, click }) => {
  const navigate = useNavigate();
  return (
    <button className={bg ? bg : style} onClick={() => navigate(click)}>
      {title}
    </button>
  );
};

export default Button;
