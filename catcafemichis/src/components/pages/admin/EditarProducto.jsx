import React, { useState } from "react";
import { useUsers } from "../../../context/UsersContext";
import { Link, useNavigate } from "react-router-dom";
import "../../css/forms.css";
import "../../css/index.css";

function CrearUsuario() {
  const { registrar } = useUsers();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    run: "",
    nombre: "",
    apellidos: "",
    correo: "",
    contrasenia: "",
    fechaNacimiento: "",
    tipoUsuario: "cliente",
    region: "",
    comuna: "",
    direccion: ""
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validarFormulario = () => {
    const obligatorios = ["nombre", "apellidos", "correo", "direccion", "contrasenia"];
    for (let campo of obligatorios) {
      if (!form[campo]?.trim()) {
        return `El campo ${campo} es obligatorio.`;
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.correo)) {
      return "El correo electrónico no es válido.";
    }
    if (form.run && !/^[0-9]+-[0-9kK]{1}$/.test(form.run)) {
      return "El RUN no tiene un formato válido. Ej: 12345678-K";
    }
    if (form.contrasenia.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres.";
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validarFormulario();
    if (validationError) {
      setError(validationError);
      return;
    }

    registrar(form);
    alert("✅ Usuario agregado correctamente!");
    setForm({
      run: "",
      nombre: "",
      apellidos: "",
      correo: "",
      contrasenia: "",
      fechaNacimiento: "",
      tipoUsuario: "cliente",
      region: "",
      comuna: "",
      direccion: ""
    });
    navigate("/admin/UsuariosPanel");
  };

  return (
    <div className="admin-usuarios">
      <div className="admin-layout">
        {/* 🟧 Sidebar */}
        <aside className="sidebar">
          <h2>Panel Usuarios</h2>
          <ul>
            <li><Link to="/admin/UsuariosPanel">Mostrar Usuarios</Link></li>
            <li><Link to="/admin/CrearUsuario" className="active">Nuevo Usuario</Link></li>
            <li><Link to="/admin/EditarUsuario">Editar Usuarios</Link></li>
          </ul>

          <div className="sidebar-footer">
            <Link to="/admin" className="btn-volver-panel">
              ⬅️ Volver al Panel Admin
            </Link>
          </div>
        </aside>

        {/* 🧩 Contenido Principal */}
        <main className="admin-content usuarios-content">
          <section className="usuarios-header">
            <h1>Agregar Nuevo Usuario</h1>
          </section>

          <section className="usuarios-form-contenedor">
            <form onSubmit={handleSubmit} className="usuarios-form">
              {error && <p className="error-message">{error}</p>}

              <div className="form-dato">
                <label>RUN</label>
                <input
                  type="text"
                  name="run"
                  value={form.run}
                  onChange={handleChange}
                  placeholder="Ej: 19011022-K"
                  className="form-control"
                />
              </div>

              <div className="form-dato">
                <label>Nombre *</label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-dato">
                <label>Apellidos *</label>
                <input
                  type="text"
                  name="apellidos"
                  value={form.apellidos}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-dato">
                <label>Correo *</label>
                <input
                  type="email"
                  name="correo"
                  value={form.correo}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="ejemplo@correo.com"
                  required
                />
              </div>

              {/* ✅ Contraseña */}
              <div className="form-dato">
                <label>Contraseña *</label>
                <input
                  type="password"
                  name="contrasenia"
                  value={form.contrasenia}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </div>

              <div className="form-dato">
                <label>Fecha de Nacimiento</label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={form.fechaNacimiento}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-dato">
                <label>Tipo de Usuario</label>
                <select
                  name="tipoUsuario"
                  value={form.tipoUsuario}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="cliente">Cliente</option>
                  <option value="administrador">Administrador</option>
                </select>
              </div>

              <div className="form-dato">
                <label>Región</label>
                <input
                  type="text"
                  name="region"
                  value={form.region}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Ej: Metropolitana"
                />
              </div>

              <div className="form-dato">
                <label>Comuna</label>
                <input
                  type="text"
                  name="comuna"
                  value={form.comuna}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Ej: Santiago Centro"
                />
              </div>

              <div className="form-dato">
                <label>Dirección *</label>
                <input
                  type="text"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Calle y número"
                  required
                />
              </div>

              <button type="submit" className="btn enviar-btn-admin">
                Agregar Usuario
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default CrearUsuario;
