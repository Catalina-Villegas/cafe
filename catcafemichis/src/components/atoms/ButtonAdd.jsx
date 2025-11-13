import React from "react";
import "../css/index.css";


//Boton para agregar al carrito, desde la tarjeta de producto
export default function ButtonAdd({ nombre, precio, onAdd }) {
  return (
    <button
      className="btn-add"
      onClick={() => onAdd(nombre, precio)}
    >
      Agregar al carrito
    </button>
  );
}