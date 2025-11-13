import React from "react";
import "../css/index.css";

//Boton para remover del carrito
export default function RemoveButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ marginLeft: "10px", cursor: "pointer" }}
    >
      ❌
    </button>
  );
}
