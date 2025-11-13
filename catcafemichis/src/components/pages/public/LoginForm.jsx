import React, { useState } from "react";
import "../../css/publicForms.css";
import Header from "../../organisms/Header.jsx";
import Footer from "../../organisms/Footer.jsx";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [formData, setFormData] = useState({
    correo: "",
    contrasenia: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = usuarios.find(
      (u) =>
        u.correo === formData.correo && u.contrasenia === formData.contrasenia
    );

    if (usuarioEncontrado) {
      alert(`✅ ¡Bienvenido ${usuarioEncontrado.nombre}!`);
      if (usuarioEncontrado.tipoUsuario === "administrador") {
      navigate("/admin");
      } else {
      navigate("/");
      }
    } else {
      alert("❌ Correo o contraseña incorrectos.");
    }
  };

  return (
    <>
      <Header />

      <main className="public-form-page">
        <div className="public-form">
          <h2>Iniciar sesión</h2>
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
