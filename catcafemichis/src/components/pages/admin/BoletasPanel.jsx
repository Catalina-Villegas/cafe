import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/index.css";
import "../../css/forms.css";
import BoletaService from "../../../services/BoletaService"; // Usamos el servicio corregido

function BoletasPanel() {
  const [boletas, setBoletas] = useState([]);
  const [boletaSeleccionada, setBoletaSeleccionada] = useState(null);

  // Listar boletas
  const listarBoletas = () => {
    BoletaService.getAllBoletas()
      .then((res) => setBoletas(res.data))
      .catch((err) => console.error("Error al cargar boletas:", err));
  };

  useEffect(() => {
    listarBoletas();
  }, []);

  // Ver detalle boleta
  const verDetalle = (id) => {
    BoletaService.getDetalleBoleta(id)
      .then((res) => setBoletaSeleccionada(res.data))
      .catch((err) => console.error("Error al cargar detalle:", err));
  };

  // Eliminar boleta
  const eliminarBoleta = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta boleta?")) return;

    BoletaService.deleteBoleta(id)
      .then(() => {
        alert("🗑️ Boleta eliminada correctamente");
        setBoletaSeleccionada(null);
        listarBoletas();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="admin-usuarios">
      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>Panel Boletas</h2>
          <ul>
            <li>
              <Link to="/admin/BoletasPanel" className="active">
                Gestionar Boletas
              </Link>
            </li>
          </ul>
          <div className="sidebar-footer">
            <Link to="/admin" className="btn-volver-panel">
              ⬅️ Volver al Panel Admin
            </Link>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="admin-content usuarios-content">
          <section className="usuarios-header">
            <h1>Boletas Registradas</h1>
          </section>

          {/* Tabla boletas */}
          <section className="usuarios-tabla-contenedor">
            <table className="usuarios-tabla">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {boletas.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      No hay boletas registradas.
                    </td>
                  </tr>
                ) : (
                  boletas.map((b) => (
                    <tr key={b.id}>
                      <td>{b.id}</td>
                      <td>{b.cliente}</td>
                      <td>{new Date(b.fecha).toLocaleString("es-CL")}</td>
                      <td>${Number(b.total).toLocaleString("es-CL")}</td>
                      <td style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                        <button
                          className="enviar-btn-usu"
                          onClick={() => verDetalle(b.id)}
                        >
                          Ver Detalle
                        </button>
                        <button
                          className="enviar-btn-usu eliminar-btn"
                          onClick={() => eliminarBoleta(b.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>

          {/* Detalle boleta */}
          {boletaSeleccionada && (
            <section className="usuarios-form-contenedor">
              <h2>Detalle Boleta #{boletaSeleccionada.boleta.id}</h2>
              <p>
                <strong>Total:</strong>{" "}
                ${Number(boletaSeleccionada.boleta.total).toLocaleString("es-CL")}
              </p>

              <table className="usuarios-tabla">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {boletaSeleccionada.productos.map((p, i) => (
                    <tr key={i}>
                      <td>{p.nombre}</td>
                      <td>{p.cantidad}</td>
                      <td>${Number(p.precio_unitario).toLocaleString("es-CL")}</td>
                      <td>
                        ${(p.cantidad * p.precio_unitario).toLocaleString("es-CL")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default BoletasPanel;
