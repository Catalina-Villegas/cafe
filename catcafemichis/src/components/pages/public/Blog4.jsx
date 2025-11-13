import Header from "../../organisms/Header";
import Footer from "../../organisms/Footer";
import "../../css/index.css";

const Blog4 = () => {
  return (
    <div>
      <Header />

      <section className="blog-detalle">
        <div className="blog-contenido">
          <h1>Repostería y Bigotes: El Taller Más Dulce (y Peludo)</h1>
          <p>
            ¿Alguna vez has intentado decorar un cupcake mientras un gato con gorro de chef
            te observa intensamente? En Michis, eso no es una situación inusual, es nuestro
            evento estrella mensual: "Repostería y Bigotes".
          </p>
          <p>
            <strong>Cada segundo sábado del mes</strong>, nuestra cocina se abre al público
            para una experiencia culinaria única. Bajo la guía de nuestra chef pastelera
            (humana) María, y la supervisión estricta del Chef Mochi (nuestro gato blanco
            con manchas que insiste en usar su pequeño gorro de cocinero), aprendemos el
            delicioso arte de la repostería temática.
          </p>
          <p>
            <strong>El Momento Estrella:</strong> La sesión de fotos final, donde los
            participantes posan con sus creaciones mientras los michis modelan con sus
            mejores ángulos.
          </p>
          <p>
            <strong>Compromiso Especial:</strong> Por cada taller, preparamos una hornada
            extra de galletas para gatos que donamos a refugios locales. Porque en Michis,
            creemos que todos los gatitos merecen un premio delicioso.
          </p>
        </div>
        <div className="blog-imagen">
          <img src="img/blog4.jpg" alt="Evento Repostería" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog4;
