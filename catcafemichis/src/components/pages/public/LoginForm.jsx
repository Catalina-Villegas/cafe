import React, { useState } from "react";
import "../../css/publicForms.css";
import Header from "../../organisms/Header.jsx";
import Footer from "../../organisms/Footer.jsx";
import { useNavigate } from "react-router-dom";
import UsuarioService from "../../../services/UsuarioService";

function LoginForm() {
  const [formData, setFormData] = useState({
    correo: "",
    contrasenia: ""
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await UsuarioService.login({
        correo: formData.correo,
        contrasenia: formData.contrasenia
      });
      
      console.log("Datos enviados:", formData);
      console.log("Respuesta del backend:", res.data);

      const token = res.data.token;
      // Guardar token en localStorage
      
      localStorage.setItem("token", token);

      // Decodificar token para obtener datos del usuario
      const payload = JSON.parse(atob(token.split(".")[1]));
      const rol = payload.rol;
      const nombre = payload.nombre;

      alert(`✅ ¡Bienvenido ${nombre}!`);

      // Redirigir según rol
      if (rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Error login:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("❌ Error al iniciar sesión. Intenta nuevamente.");
      }
    }
  };

  return (
    <>
      <Header />

      <main className="public-form-page">
        <div className="public-form">
          <h2>Iniciar sesión</h2>
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit}>
            <label>Correo electrónico</label>
            <input
              type="email"
              name="correo"
              placeholder="ejemplo@correo.com"
              value={formData.correo}
              onChange={handleChange}
              required
            />

            <label>Contraseña</label>
            <input
              type="password"
              name="contrasenia"
              placeholder="Ingresa tu contraseña"
              value={formData.contrasenia}
              onChange={handleChange}
              required
            />

            <button type="submit">Iniciar sesión</button>
          </form>

          <p className="form-textoextra">
            ¿No tienes cuenta?{" "}
            <a href="/registro" className="link-registro">
              Regístrate aquí
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default LoginForm;


