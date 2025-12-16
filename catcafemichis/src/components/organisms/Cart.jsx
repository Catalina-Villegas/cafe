import React from "react";

import { useState } from "react";
import { generarBoleta } from "../../services/CartService";
import AuthService from "../../services/AuthService";
import "./organismos.css";

export default function Cart({ carrito, onRemove, onClear }) {
  const [loading, setLoading] = useState(false);

  const total = carrito.reduce(
    (acc, p) => acc + Number(p.precio) * (p.cantidad || 1),
    0
  );

  const handlePagar = async () => {
    const token = AuthService.getCurrentUser();
    if (!token) return alert("Debes iniciar sesión antes de pagar 😺");
    if (carrito.length === 0) return alert("Tu carrito está vacío 🐾");

    setLoading(true);

    try {
      const data = await generarBoleta(carrito);
      alert(`Boleta generada con ID ${data.id_boleta} 😺`);
      onClear();
    } catch (err) {
      console.error("Error al generar boleta:", err);
      alert(`Hubo un problema al generar tu boleta:\n${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="carrito">
      <h5>🛒 Carrito ({carrito.length})</h5>
      <ul>
        {carrito.length === 0 && <li>Tu carrito está vacío 🐾</li>}
        {carrito.map((producto, index) => (
          <li key={index}>
            <span>
              {producto.nombre}{" "}
              {producto.opcion && `(${producto.opcion})`} – $
              {(Number(producto.precio) * (producto.cantidad || 1)).toLocaleString(
                "es-CL"
              )}
            </span>
            <button onClick={() => onRemove(index)}>❌</button>
          </li>
        ))}
        {carrito.length > 0 && (
          <>
            <li style={{ fontWeight: "bold", marginTop: "10px" }}>
              Total: ${total.toLocaleString("es-CL")}
            </li>
            <li>
              <button
                style={{
                  marginTop: "10px",
                  padding: "8px 16px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={handlePagar}
                disabled={loading}
              >
                {loading ? "Procesando..." : "Pagar"}
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
