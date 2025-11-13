import React from "react";
import "../css/index.css";

function Button({ text, type = "button", onClick }) {
  return (
    <button type={type} onClick={onClick} className="enviar-btn">
      {text}
    </button>
  );
}

export default Button;
