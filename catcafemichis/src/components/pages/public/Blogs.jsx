import { Link } from "react-router-dom";
import Header from "../../organisms/Header";
import Footer from "../../organisms/Footer";
import "../../css/index.css";

const Blogs = () => {
  return (
    <div>
      <Header />

      <section className="blogs-listado">
        <div className="blog-card">
          <div className="blog-texto">
            <h2>[Eventos] Encuentros del Destino: Adopciones Express</h2>
            <p>
              En colaboración con refugios locales, Michis organiza jornadas de “Adopciones Express”,
              donde pequeños corazones peludos esperan encontrar su hogar para siempre.
            </p>
            <Link to="/blog1" className="btn-add">Leer más</Link>
          </div>
          <div className="blog-img">
            <img src="img/blog1.jpg" alt="Evento Adopción" />
          </div>
        </div>

        <div className="blog-card">
          <div className="blog-texto">
            <h2>[Eventos] Escuela de Travesuras Controladas</h2>
            <p>
              Nuestros expertos en comportamiento felino guían sesiones de entrenamiento
              para que cada gatito descubra su mejor versión con amor y paciencia.
            </p>
            <Link to="/blog2" className="btn-add">Leer más</Link>
          </div>
          <div className="blog-img">
            <img src="img/blog2.jpg" alt="Escuela de Travesuras" />
          </div>
        </div>

        <div className="blog-card">
          <div className="blog-texto">
            <h2>Cuentos y Ronroneos: Club de Lectura Felino</h2>
            <p>
              Un espacio mágico donde los gatos son co-anfitriones de un club de lectura
              lleno de ternura y ronroneos literarios.
            </p>
            <Link to="/blog3" className="btn-add">Leer más</Link>
          </div>
          <div className="blog-img">
            <img src="img/blog3.jpg" alt="Club de lectura felino" />
          </div>
        </div>

        <div className="blog-card">
          <div className="blog-texto">
            <h2>Repostería y Bigotes: El Taller Más Dulce (y Peludo)</h2>
            <p>
              Aprende repostería temática supervisado por el Chef Mochi,
              nuestro querido gato cocinero con gorro.
            </p>
            <Link to="/blog4" className="btn-add">Leer más</Link>
          </div>
          <div className="blog-img">
            <img src="img/blog4.jpg" alt="Taller de Repostería" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blogs;
