import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ style, title, bg, onclick }) => {
  const navigate = useNavigate();
  return (
    <button className={bg ? bg : style} onClick={() => navigate(onclick)}>
      {title}
    </button>
  );
};

export default Button;
