import React, { useState } from "react";
import Header from "../../organisms/Header";
import Footer from "../../organisms/Footer";
import "../../css/index.css";
import { saveSuggestion } from "../../../services/storageService";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    comentario: "",
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaSugerencia = {
      id: Date.now(),
      ...formData,
      fecha: new Date().toLocaleString(),
    };

    saveSuggestion(nuevaSugerencia);
    setEnviado(true);
    setFormData({ nombre: "", correo: "", comentario: "" });
  };

  return (
    <div>
      <Header />

      <section className="section-contacto">
        {!enviado ? (
          <form className="form-contacto" onSubmit={handleSubmit}>
            <h1>¡CONTÁCTANOS!</h1>
            <p>Tus opiniones nos importan para que mejoremos cada día.</p>
            <ul>
              <li>
                <label>Nombre / Usuario:</label>
                <input
                  className="input-texto"
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </li>
              <li>
                <label>Correo Electrónico:</label>
                <input
                  className="input-texto"
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                />
              </li>
              <li>
                <label>Comentario / Sugerencias / Reclamos:</label>
                <textarea
                  className="input-comentario"
                  name="comentario"
                  value={formData.comentario}
                  onChange={handleChange}
                  required
                />
              </li>
            </ul>
            <button className="enviar-btn" type="submit">
              Enviar
            </button>
          </form>
        ) : (
          <div style={{ textAlign: "center" }}>
            <h2>¡Gracias por tu sugerencia!</h2>
            <p>Tu mensaje ha sido enviado exitosamente 🐾</p>
            <button className="enviar-btn" onClick={() => setEnviado(false)}>
              Enviar otra
            </button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Contacto;
