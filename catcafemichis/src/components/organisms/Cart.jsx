
import "./organismos.css";


export default function Cart({ carrito, onRemove, onClear }) {
  const total = carrito.reduce((acc, p) => acc + Number(p.precio), 0);

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
              {Number(producto.precio).toLocaleString("es-CL")}
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
                onClick={() => {
                  alert("¡Gracias por tu compra en CatCafe Michis 😺!");
                  onClear();
                }}
              >
                Pagar
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
