import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUsers } from "../../../context/UsersContext";
import "../../css/index.css";

function EditarUsuario() {
  const { usuarios, actualizarUsuario, eliminarUsuario } = useUsers();

  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [form, setForm] = useState({
    run: "",
    nombre: "",
    apellidos: "",
    correo: "",
    contrasenia: "",
    direccion: "",
    tipoUsuario: "cliente",
  });

  // Cargar usuario en el formulario
  const handleEditar = (u) => {
    setUsuarioEditando(u.correo);
    setForm({ ...u });
  };

  //Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Guardar cambios del usuario editado
  const handleSubmit = (e) => {
    e.preventDefault();
    actualizarUsuario(usuarioEditando, form);
    alert("✅ Usuario actualizado correctamente.");
    setUsuarioEditando(null);
    setForm({
      run: "",
      nombre: "",
      apellidos: "",
      correo: "",
      contrasenia: "",
      direccion: "",
      tipoUsuario: "cliente",
    });
  };

  // Eliminar un usuario
  const handleEliminar = (correo) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este usuario?");
    if (!confirmar) return;
    eliminarUsuario(correo);
    alert("🗑️ Usuario eliminado correctamente.");
    if (usuarioEditando === correo) {
      setUsuarioEditando(null);
      setForm({
        run: "",
        nombre: "",
        apellidos: "",
        correo: "",
        contrasenia: "",
        direccion: "",
        tipoUsuario: "cliente",
      });
    }
  };

  return (
    <div className="admin-usuarios">
      <div className="admin-layout">
        {/*Sidebar */}
        <aside className="sidebar">
          <h2>Panel Usuarios</h2>
          <ul>
            <li><Link to="/admin/UsuariosPanel">Mostrar Usuarios</Link></li>
            <li><Link to="/admin/CrearUsuario">Nuevo Usuario</Link></li>
            <li><Link to="/admin/EditarUsuario" className="active">Editar Usuarios</Link></li>
          </ul>

          {/*Volver */}
          <div className="sidebar-footer">
            <Link to="/admin" className="btn-volver-panel">
              ⬅️ Volver al Panel Admin
            </Link>
          </div>
        </aside>

        {/*Contenido Principal*/}
        <main className="admin-content usuarios-content">
          <section className="usuarios-header">
            <h1>Editar Usuarios</h1>
            <p>Selecciona un usuario de la lista para editar o eliminar sus datos.</p>
          </section>

          {/* Tabla usuarios */}
          <section className="usuarios-tabla-contenedor">
            <table className="usuarios-tabla">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Correo</th>
                  <th>Tipo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", color: "#593122" }}>
                      No hay usuarios disponibles.
                    </td>
                  </tr>
                ) : (
                  usuarios.map((u, i) => (
                    <tr key={i}>
                      <td>{u.nombre}</td>
                      <td>{u.apellidos}</td>
                      <td>{u.correo}</td>
                      <td>{u.tipoUsuario || "cliente"}</td>
                      <td>
                        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                          <button
                            className="enviar-btn-usu"
                            onClick={() => handleEditar(u)}
                          >
                            Editar
                          </button>
                          <button
                            className="enviar-btn-usu eliminar-btn"
                            onClick={() => handleEliminar(u.correo)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>

          {/* Editar */}
          {usuarioEditando && (
            <section className="usuarios-form-contenedor">
              <form onSubmit={handleSubmit} className="usuarios-form">
                <h2>Editar Usuario: {form.nombre || form.correo}</h2>

                <div className="form-dato">
                  <label>RUN</label>
                  <input
                    name="run"
                    value={form.run}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="form-dato">
                  <label>Nombre</label>
                  <input
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="form-dato">
                  <label>Apellidos</label>
                  <input
                    name="apellidos"
                    value={form.apellidos}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="form-dato">
                  <label>Correo</label>
                  <input
                    type="email"
                    name="correo"
                    value={form.correo}
                    onChange={handleChange}
                    className="form-control"
                    disabled
                  />
                </div>

                <div className="form-dato">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    name="contrasenia"
                    value={form.contrasenia || ""}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="form-dato">
                  <label>Dirección</label>
                  <input
                    name="direccion"
                    value={form.direccion}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="form-dato">
                  <label>Tipo Usuario</label>
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

                <button type="submit" className="btn enviar-btn-admin">
                  Guardar Cambios
                </button>
              </form>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default EditarUsuario;
