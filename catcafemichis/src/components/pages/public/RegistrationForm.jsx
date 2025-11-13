import React, { useState } from "react";
import "../../css/publicForms.css";
import Header from "../../organisms/Header.jsx";
import Footer from "../../organisms/Footer.jsx";
import { useUsers } from "../../../context/UsersContext";

function RegistrationForm() {
  const { registrar } = useUsers();
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    contrasenia: "",
    confirmarContrasenia: "",
    telefono: "",
    fechaNacimiento: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.contrasenia !== formData.confirmarContrasenia) {
      alert("❌ Las contraseñas no coinciden.");
      return;
    }

    registrar({
      nombre: formData.nombre,
      apellidos: formData.apellidos,
      correo: formData.correo,
      contrasenia: formData.contrasenia,
      telefono: formData.telefono,
      fechaNacimiento: formData.fechaNacimiento,
      tipoUsuario: "cliente"
    });

    alert("✅ Registro exitoso.");
    setFormData({
      nombre: "",
      apellidos: "",
      correo: "",
      contrasenia: "",
      confirmarContrasenia: "",
      telefono: "",
      fechaNacimiento: ""
    });
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
              placeholder="Ingresa tu nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />

            <label>Apellidos *</label>
            <input
              type="text"
              name="apellidos"
              placeholder="Ingresa tus apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              required
            />

            <label>Correo electrónico *</label>
            <input
              type="email"
              name="correo"
              placeholder="ejemplo@correo.com"
              value={formData.correo}
              onChange={handleChange}
              required
            />

            <label>Contraseña *</label>
            <input
              type="password"
              name="contrasenia"
              placeholder="Mínimo 6 caracteres"
              value={formData.contrasenia}
              onChange={handleChange}
              required
            />

            <label>Confirmar contraseña *</label>
            <input
              type="password"
              name="confirmarContrasenia"
              placeholder="Repite la contraseña"
              value={formData.confirmarContrasenia}
              onChange={handleChange}
              required
            />

            <label>Teléfono</label>
            <input
              type="tel"
              name="telefono"
              placeholder="+56 9..."
              value={formData.telefono}
              onChange={handleChange}
            />

            <label>Fecha de nacimiento *</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
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
