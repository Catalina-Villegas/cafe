import Header from "../../organisms/Header";
import Footer from "../../organisms/Footer";
import "../../css/index.css";

const Blog1 = () => {
  return (
    <div>
      <Header />

      <section className="blog-detalle">
        <div className="blog-contenido">
          <h1>[Eventos] Encuentros del Destino: Adopciones Express</h1>
          <p>
            <strong>3 días aleatorios del mes</strong>, Michis abre sus puertas a un evento
            muy especial. En colaboración con refugios locales, organizamos jornadas de
            "Adopciones Express", donde pequeños corazones peludos aguardan la oportunidad
            de transformar una vida —la suya y la tuya, unidos por el destino.
          </p>
          <p>
            No hay prisa ni presión. Solo tú, una deliciosa taza de café, tu postre
            preferido, y la posibilidad de que un pequeño felino te elija como su humano
            favorito. Porque a veces, el mejor amigo que podrías tener está a solo un
            ronroneo de distancia, esperando escribir contigo el primer capítulo de una
            hermosa historia juntos.
          </p>
        </div>
        <div className="blog-imagen">
          <img src="img/blog1.jpg" alt="Evento Adopción" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog1;
