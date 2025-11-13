import Header from "../../organisms/Header";
import Footer from "../../organisms/Footer";
import "../../css/index.css";

const Blog2 = () => {
  return (
    <div>
      <Header />

      <section className="blog-detalle">
        <div className="blog-contenido">
          <h1>[Eventos] Escuela de Travesuras Controladas</h1>
          <p>
            En Michis, sabemos que cada gatito es un pequeño genio en desarrollo.
            Por eso ofrecemos sesiones especiales de socialización y entrenamiento donde
            nuestros residentes peludos aprenden las habilidades esenciales para
            convertirse en compañeros felinos excepcionales.
          </p>
          <p>
            Cada sesión es una aventura: desde aprender a usar correctamente su arenero
            hasta dominar el arte del rascador (y no el sofá). Todo mientras nuestros
            expertos en comportamiento felino guían con paciencia y mucho amor cada pequeño
            progreso. Porque un gatito bien socializado hoy es un compañero equilibrado y
            feliz mañana.
          </p>
        </div>
        <div className="blog-imagen">
          <img src="img/blog2.jpg" alt="Evento Entreno" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog2;
