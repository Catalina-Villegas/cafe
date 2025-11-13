import React from "react";
import { Link } from "react-router-dom";
import { useUsers } from "../../../context/UsersContext";
import "../../css/index.css";

function UsuariosPanel() {
  const { usuarios } = useUsers();

  return (
    <div className="admin-usuarios">
      <div className="admin-layout">
        {/*Sidebar */}
        <aside className="sidebar">
          <h2>Panel Usuarios</h2>
          <ul>
            <li><Link to="/admin/UsuariosPanel"className="active">Mostrar Usuarios</Link></li>
            <li><Link to="/admin/CrearUsuario" >Nuevo Usuario</Link></li>
            <li><Link to="/admin/EditarUsuario">Editar Usuarios</Link></li>
          </ul>

          {/*Botón de regreso */}
          <div className="sidebar-footer">
            <Link to="/admin" className="btn-volver-panel">
              ⬅️ Volver al Panel Admin
            </Link>
          </div>
        </aside>

        {/*CONTENIDO PRINCIPAL */}
        <main className="admin-content usuarios-content">
          <section className="usuarios-header">
            <h1>Gestión de Usuarios</h1>
            <p>Consulta los usuarios registrados en el sistema.</p>
          </section>

          {/*TABLA DE USUARIOS */}
          <section className="usuarios-tabla-contenedor">
            {usuarios.length === 0 ? (
              <p className="usuarios-vacio">
                No hay usuarios registrados todavía. 😿
              </p>
            ) : (
              <table className="usuarios-tabla">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Correo</th>
                    <th>Tipo</th>
                    <th>Fecha Nac.</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((u, index) => (
                    <tr key={index}>
                      <td>{u.nombre}</td>
                      <td>{u.apellidos}</td>
                      <td>{u.correo}</td>
                      <td>{u.tipoUsuario || "Cliente"}</td>
                      <td>{u.fechaNacimiento || "—"}</td>
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

export default UsuariosPanel;
