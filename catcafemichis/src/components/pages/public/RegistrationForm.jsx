import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/publicForms.css";
import Header from "../../organisms/Header.jsx";
import Footer from "../../organisms/Footer.jsx";
import UsuarioService from "../../../services/UsuarioService";

function RegistrationForm() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    contrasenia: "",
    confirmarContrasenia: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.contrasenia !== formData.confirmarContrasenia) {
      alert("❌ Las contraseñas no coinciden.");
      return;
    }

    try {
      const usuario = {
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        correo: formData.correo,
        contrasenia: formData.contrasenia,
        tipoUsuario: "cliente"
      };

      const response = await UsuarioService.registrar(usuario);
      console.log("Usuario creado:", response.data);

      alert("✅ Registro exitoso");
      navigate("/login");

      setFormData({
        nombre: "",
        apellidos: "",
        correo: "",
        contrasenia: "",
        confirmarContrasenia: ""
      });

    } catch (error) {
      console.error("Error al registrar:", error);

      if (error.response?.data?.message) {
        alert("❌ " + error.response.data.message);
      } else {
        alert("❌ Error al registrar usuario.");
      }
    }
  };

  return (
    <>
      <Header />

      <main className="public-form-page">
        <div className="public-form">
          <h2>Registro</h2>

          <form onSubmit={handleSubmit}>

            <label>Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />

            <label>Apellidos *</label>
            <input
              type="text"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              required
            />

            <label>Correo electrónico *</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />

            <label>Contraseña *</label>
            <input
              type="password"
              name="contrasenia"
              value={formData.contrasenia}
              onChange={handleChange}
              required
            />

            <label>Confirmar contraseña *</label>
            <input
              type="password"
              name="confirmarContrasenia"
              value={formData.confirmarContrasenia}
              onChange={handleChange}
              required
            />

            <button type="submit">Registrarse</button>
          </form>

          <p className="form-textoextra">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="link-registro">
              Inicia sesión aquí
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default RegistrationForm;


