import React from "react";
import { Link } from "react-router-dom";
import "../../css/index.css";

function AdminPanel() {
  return (
    <div className="admin-panel">
      <div className="panel-header">
        <h1>Bienvenido al Panel de Administración</h1>
        <p>Selecciona una opción para comenzar.</p>
      </div>

      <div className="panel-options">
        <Link to="/admin/ProductosPanel" className="panel-card">
          Productos
        </Link>
        <Link to="/admin/UsuariosPanel" className="panel-card">
          Usuarios
        </Link>
        <Link to="/admin/Contacto" className="panel-card">
          Contacto
        </Link>
      </div>
    </div>
  );
}

export default AdminPanel;
