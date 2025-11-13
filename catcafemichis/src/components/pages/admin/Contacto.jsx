import React, { useEffect, useState } from "react";
import { getSuggestions } from "../../../services/storageService";
import "../../css/index.css";
import { Link } from "react-router-dom";

const Contactos = () => {
  const [sugerencias, setSugerencias] = useState([]);

  useEffect(() => {
    setSugerencias(getSuggestions());
  }, []);

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>Panel de Admin</h2>
        <ul>
          <li><Link to="/admin/Contacto" className="active">Sugerencias y quejas</Link></li>
        </ul>

        <div className="sidebar-footer">
          <Link to="/admin" className="btn-volver-panel">
            Volver al Panel
          </Link>
        </div>
      </aside>

      <div className="admin-content">
        <div className="usuarios-header">
          <h1>Sugerencias Recibidas</h1>
          <p>Listado de mensajes enviados desde “Contacto”.</p>
        </div>

        <div className="usuarios-tabla-contenedor">
          {sugerencias.length === 0 ? (
            <p className="usuarios-vacio">No hay sugerencias aún.</p>
          ) : (
            <table className="usuarios-tabla tabla">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Mensaje</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {sugerencias.map((sug) => (
                  <tr key={sug.id}>
                    <td>{sug.nombre}</td>
                    <td>{sug.correo}</td>
                    <td>{sug.comentario}</td>
                    <td>{sug.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contactos;
