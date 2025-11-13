import React, { useEffect, useState } from "react";
import Header from "../../organisms/Header";
import Footer from "../../organisms/Footer";
import "../../css/index.css";

const Home = () => {
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    // Intentar obtener productos desde localStorage
    const productosLS = JSON.parse(localStorage.getItem("productos"));

    if (productosLS && productosLS.length > 0) {
      // Tomar los primeros 4 productos como destacados
      setDestacados(productosLS.slice(0, 4));
    } else {
      // Si no hay productos en LS, cargar desde JSON y guardarlos
      fetch("/productos.json")
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("productos", JSON.stringify(data));
          setDestacados(data.slice(0, 4));
        })
        .catch((err) => console.error("Error al cargar productos:", err));
    }
  }, []);

  return (
    <div>
      <Header />

      {/* Sección de Logeo */}
      <div className="seccionLogeo">
        <a href="/login">Iniciar Sesión</a> | <a href="/registro">Registrarse</a>
      </div>

      {/* Sección Intro */}
      <section id="intro" className="contenido">
        <div className="texto">
          <h2 className="nombre">CatCafe Michis</h2>
          <p>
            En "Michis", nos gusta pasar tiempo de calidad con nuestra comunidad y
            frecuentemente organizamos talleres y eventos para promover el bienestar
            tanto de nuestros animalitos como los de nuestros preciados clientes.
          </p>
          <div className="botonContenido">
            <a href="/nosotros" className="btn-add">
              Ver Más
            </a>
          </div>
        </div>
        <div className="imagen">
          <img src="img/logoTienda.jpg" alt="Ambiente Michis" />
        </div>
      </section>

      {/* Sección de Contenidos Destacados */}
      <section className="destacados">
        <h2>Contenidos Destacados</h2>
        <div className="grid-destacados">
          {destacados.length > 0 ? (
            destacados.map((p, i) => (
              <div key={i} className="producto-card">
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  className="producto-img"
                />
                <h3>{p.nombre}</h3>
                <p className="precio">${p.precio.toLocaleString("es-CL")}</p>
                <p className="descripcion">
                  {p.descripcion.length > 60
                    ? p.descripcion.substring(0, 60) + "..."
                    : p.descripcion}
                </p>
              </div>
            ))
          ) : (
            <p>Cargando productos destacados...</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
