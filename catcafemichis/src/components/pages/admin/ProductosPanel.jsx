import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/index.css";
import "../../css/forms.css";
import ProductoService from "../../../services/ProductoService"; // Servicio API

function ProductosPanel() {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: "",
  });

  // Cargar productos desde API
  const listarProductos = () => {
    ProductoService.getAllProductos()
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error al cargar productos:", err));
  };

  useEffect(() => {
    listarProductos();
  }, []);

  // Manejar cambios del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Guardar producto (crear o actualizar)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (productoEditando) {
      // Editar producto
      ProductoService.updateProducto(productoEditando.id, form)
        .then(() => {
          alert("✅ Producto actualizado correctamente");
          setProductoEditando(null);
          setForm({ nombre: "", precio: "", descripcion: "", imagen: "" });
          listarProductos();
        })
        .catch((err) => console.error(err));
    } else {
      // Crear producto
      ProductoService.createProducto(form)
        .then(() => {
          alert("✅ Producto agregado correctamente");
          setForm({ nombre: "", precio: "", descripcion: "", imagen: "" });
          listarProductos();
        })
        .catch((err) => console.error(err));
    }
  };

  //  Seleccionar producto para editar
  const handleEditar = (producto) => {
    setProductoEditando(producto);
    setForm({ ...producto });
  };

  // Eliminar producto
  const handleEliminar = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    ProductoService.deleteProducto(id)
      .then(() => {
        alert("🗑️ Producto eliminado correctamente");
        if (productoEditando && productoEditando.id === id) {
          setProductoEditando(null);
          setForm({ nombre: "", precio: "", descripcion: "", imagen: "" });
        }
        listarProductos();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="admin-usuarios">
      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>Panel Productos</h2>
          <ul>
            <li>
              <Link to="/admin/ProductosPanel" className="active">
                Gestionar Productos
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
            <h1>{productoEditando ? "Editar Producto" : "Agregar Nuevo Producto"}</h1>
          </section>

          {/* Tabla productos */}
          <section className="usuarios-tabla-contenedor">
            <table className="usuarios-tabla">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Descripción</th>
                  <th>Imagen</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", color: "#593122" }}>
                      No hay productos disponibles.
                    </td>
                  </tr>
                ) : (
                  productos.map((p, i) => (
                    <tr key={i}>
                      <td>{p.nombre}</td>
                      <td>${p.precio.toLocaleString("es-CL")}</td>
                      <td>
                        {p.descripcion.length > 60
                          ? `${p.descripcion.substring(0, 60)}...`
                          : p.descripcion}
                      </td>
                      <td>
                        {p.imagen && (
                          <img
                            src={p.imagen}
                            alt={p.nombre}
                            style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "5px" }}
                          />
                        )}
                      </td>
                      <td style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                        <button className="enviar-btn-usu" onClick={() => handleEditar(p)}>
                          Editar
                        </button>
                        <button className="enviar-btn-usu eliminar-btn" onClick={() => handleEliminar(p.id)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>

          {/* Formulario de creación/edición */}
          <section className="usuarios-form-contenedor">
            <form onSubmit={handleSubmit} className="usuarios-form">
              <div className="form-dato">
                <label>Nombre *</label>
                <input
                  name="nombre"
                  type="text"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-dato">
                <label>Precio *</label>
                <input
                  name="precio"
                  type="number"
                  value={form.precio}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-dato">
                <label>Descripción</label>
                <textarea
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-dato">
                <label>Imagen (URL)</label>
                <input
                  name="imagen"
                  type="text"
                  value={form.imagen}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn enviar-btn-admin">
                {productoEditando ? "Guardar Cambios" : "Agregar Producto"}
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default ProductosPanel;
