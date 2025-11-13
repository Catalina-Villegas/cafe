import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/forms.css";
import "../../css/index.css";

function CrearProducto() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const nuevoProducto = {
      id: Date.now(),
      ...form,
      precio: Number(form.precio),
    };
    productos.push(nuevoProducto);
    localStorage.setItem("productos", JSON.stringify(productos));
    alert("✅ Producto agregado correctamente!");
    navigate("/admin/ProductosPanel");
  };

  return (
    <div className="admin-usuarios">
      <div className="admin-layout">
        <aside className="sidebar">
          <h2>Panel Productos</h2>
          <ul>
            <li><Link to="/admin/ProductosPanel">Mostrar Productos</Link></li>
            <li><Link to="/admin/CrearProducto" className="active">Nuevo Producto</Link></li>
            <li><Link to="/admin/EditarProducto">Editar Productos</Link></li>
          </ul>

          <div className="sidebar-footer">
            <Link to="/admin" className="btn-volver-panel">⬅️ Volver al Panel Admin</Link>
          </div>
        </aside>

        <main className="admin-content usuarios-content">
          <section className="usuarios-header">
            <h1>Agregar Nuevo Producto</h1>
          </section>

          <section className="usuarios-form-contenedor">
            <form onSubmit={handleSubmit} className="usuarios-form">
              <div className="form-dato">
                <label>Nombre *</label>
                <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
              </div>

              <div className="form-dato">
                <label>Precio *</label>
                <input type="number" name="precio" value={form.precio} onChange={handleChange} required />
              </div>

              <div className="form-dato">
                <label>Descripción</label>
                <textarea name="descripcion" value={form.descripcion} onChange={handleChange} />
              </div>

              <div className="form-dato">
                <label>Imagen URL</label>
                <input type="text" name="imagen" value={form.imagen} onChange={handleChange} />
              </div>

              <button type="submit" className="btn enviar-btn-admin">Agregar Producto</button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default CrearProducto;
