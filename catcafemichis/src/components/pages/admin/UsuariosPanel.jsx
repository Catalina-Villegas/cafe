import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/index.css";
import "../../css/forms.css";
import UsuarioService from "../../../services/UsuarioService"; // Servicio API usuarios

function UsuariosPanel() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contrasenia: "",
    rol: "cliente",
  });
  const [error, setError] = useState(null);

  // Cargar usuarios desde API
  const listarUsuarios = () => {
    UsuarioService.getAllUsuarios()
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error("Error al cargar usuarios:", err));
  };

  useEffect(() => {
    listarUsuarios();
  }, []);

  // Manejar cambios del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Validar formulario básico
  const validarFormulario = () => {
    if (!form.nombre.trim() || !form.correo.trim() || !form.contrasenia.trim()) {
      return "Nombre, correo y contraseña son obligatorios.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.correo)) return "Correo inválido.";
    if (form.contrasenia.length < 6) return "Contraseña mínima 6 caracteres.";
    return null;
  };

  // Guardar usuario (crear o actualizar)
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validarFormulario();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (usuarioEditando) {
      UsuarioService.updateUsuario(usuarioEditando.id, form)
        .then(() => {
          alert("✅ Usuario actualizado correctamente");
          setUsuarioEditando(null);
          setForm({ nombre: "", correo: "", contrasenia: "", rol: "cliente" });
          setError(null);
          listarUsuarios();
        })
        .catch((err) => console.error(err));
    } else {
      UsuarioService.createUsuario(form)
        .then(() => {
          alert("✅ Usuario agregado correctamente");
          setForm({ nombre: "", correo: "", contrasenia: "", rol: "cliente" });
          setError(null);
          listarUsuarios();
        })
        .catch((err) => console.error(err));
    }
  };

  // Seleccionar usuario para editar
  const handleEditar = (usuario) => {
    setUsuarioEditando(usuario);
    setForm({ ...usuario, contrasenia: "" }); // No mostrar contraseña actual
  };

  // Eliminar usuario
  const handleEliminar = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
    UsuarioService.deleteUsuario(id)
      .then(() => {
        alert("🗑️ Usuario eliminado correctamente");
        if (usuarioEditando && usuarioEditando.id === id) {
          setUsuarioEditando(null);
          setForm({ nombre: "", correo: "", contrasenia: "", rol: "cliente" });
        }
        listarUsuarios();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="admin-usuarios">
      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>Panel Usuarios</h2>
          <ul>
            <li>
              <Link to="/admin/UsuariosPanel" className="active">
                Gestionar Usuarios
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
            <h1>{usuarioEditando ? "Editar Usuario" : "Agregar Nuevo Usuario"}</h1>
          </section>

          {/* Tabla usuarios */}
          <section className="usuarios-tabla-contenedor">
            {usuarios.length === 0 ? (
              <p style={{ textAlign: "center", color: "#593122" }}>No hay usuarios registrados.</p>
            ) : (
              <table className="usuarios-tabla">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((u, i) => (
                    <tr key={i}>
                      <td>{u.nombre}</td>
                      <td>{u.correo}</td>
                      <td>{u.rol || "cliente"}</td>
                      <td style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                        <button className="enviar-btn-usu" onClick={() => handleEditar(u)}>
                          Editar
                        </button>
                        <button className="enviar-btn-usu eliminar-btn" onClick={() => handleEliminar(u.id)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          {/* Formulario creación/edición */}
          <section className="usuarios-form-contenedor">
            <form onSubmit={handleSubmit} className="usuarios-form">
              {error && <p className="error-message">{error}</p>}

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
                <label>Correo *</label>
                <input
                  name="correo"
                  type="email"
                  value={form.correo}
                  onChange={handleChange}
                  required
                  className="form-control"
                  disabled={!!usuarioEditando}
                />
              </div>

              <div className="form-dato">
                <label>Contraseña *</label>
                <input
                  name="contrasenia"
                  type="password"
                  value={form.contrasenia}
                  onChange={handleChange}
                  className="form-control"
                  required={!usuarioEditando}
                  placeholder={usuarioEditando ? "Repita Contraseña para no cambiar" : ""}
                />
              </div>

              <div className="form-dato">
                <label>Rol</label>
                <select
                  name="rol"
                  value={form.rol}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="cliente">Cliente</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              <button type="submit" className="btn enviar-btn-admin">
                {usuarioEditando ? "Guardar Cambios" : "Agregar Usuario"}
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default UsuariosPanel;
