import React from "react";
import { Link } from "react-router-dom";
import "../../css/index.css";

function AdminPanel() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  
  return (
    <div className="admin-panel">

      <div className="panel-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>Bienvenido al Panel de Administración</h1>
          <p>Selecciona una opción para comenzar.</p>
        </div>

        {/* Botón de cerrar sesión */}
        <button 
          onClick={handleLogout}
          className="logout-button"
          style={{
            padding: "10px 18px",
            background: "#c62828",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Cerrar sesión
        </button>
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

