import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/index.css";

function ProductosPanel() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
  // 1️⃣ Revisar si hay productos en localStorage
  const productosLS = JSON.parse(localStorage.getItem("productos"));
  if (productosLS && productosLS.length > 0) {
    setProductos(productosLS);
  } else {
    // 2️⃣ Si no hay, cargar desde JSON
    fetch("/productos.json")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        localStorage.setItem("productos", JSON.stringify(data)); // Guardar en LS
      })
      .catch((err) => console.error("Error al cargar productos:", err));
  }
}, []);

  return (
    <div className="admin-usuarios">
      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>Panel Productos</h2>
          <ul>
            <li>
              <Link to="/admin/ProductosPanel" className="active">
                Mostrar Productos
              </Link>
            </li>
            <li>
              <Link to="/admin/CrearProducto">Nuevo Producto</Link>
            </li>
            <li>
              <Link to="/admin/EditarProducto">Editar Productos</Link>
            </li>
          </ul>

          {/* Botón de regreso */}
          <div className="sidebar-footer">
            <Link to="/admin" className="btn-volver-panel">
              ⬅️ Volver al Panel Admin
            </Link>
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="admin-content usuarios-content">
          <section className="usuarios-header">
            <h1>Gestión de Productos</h1>
            <p>Consulta los productos registrados en el sistema.</p>
          </section>

          {/* TABLA DE PRODUCTOS */}
          <section className="usuarios-tabla-contenedor">
            {productos.length === 0 ? (
              <p className="usuarios-vacio">
                No hay productos registrados todavía. 😿
              </p>
            ) : (
              <table className="usuarios-tabla">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Descripción</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((p, index) => (
                    <tr key={index}>
                      <td>{p.id}</td>
                      <td>
                        <img
                          src={p.imagen}
                          alt={p.nombre}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "5px",
                          }}
                        />
                      </td>
                      <td>{p.nombre}</td>
                      <td>${p.precio.toLocaleString("es-CL")}</td>
                      <td className="descripcion-corta">
                        {p.descripcion.length > 60
                          ? `${p.descripcion.substring(0, 60)}...`
                          : p.descripcion}
                      </td>
                      <td>
                        {p.opciones && p.opciones.length > 0
                          ? p.opciones.join(", ")
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default ProductosPanel;
