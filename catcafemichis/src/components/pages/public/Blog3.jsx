import Header from "../../organisms/Header";
import Footer from "../../organisms/Footer";
import "../../css/index.css";

const Blog3 = () => {
  return (
    <div>
      <Header />

      <section className="blog-detalle">
        <div className="blog-contenido">
          <h1>Cuentos y Ronroneos: Club de Lectura Felino</h1>
          <p>
            Bienvenido a "Cuentos y Ronroneos", el club de lectura más especial de la
            ciudad, donde los gatos son co-anfitriones y cada página viene acompañada de
            suaves ronroneos de fondo.
          </p>
          <p>
            <strong>Todos los jueves de 5:00 a 7:00 PM</strong>, nuestro espacio se
            transforma en un santuario literario. Las estanterías rebosan de libros sobre
            gatos, desde los clásicos de T.S. Eliot hasta las aventuras contemporáneas de
            "Dewey" y "Bob, el gato callejero". Pero aquí puedes leer lo que tu corazón
            desee: novelas, poesía, manga... los michis no juzgan tus gustos literarios
            (aunque Kafka, nuestro gato negro, parece tener preferencia por los thrillers).
          </p>
          <p>
            <strong>Los sábados por la mañana</strong>, algo mágico sucede. Niños de 6 a 12
            años vienen a leer en voz alta a nuestros gatitos más jóvenes. Es terapéutico
            para ambos: los niños practican su lectura sin presión mientras los gatitos se
            socializan con voces suaves y cariñosas. Ver a un pequeño leyendo "El Gato con
            Botas" mientras un gatito real dormita en su regazo es una imagen que derrite
            corazones.
          </p>
        </div>
        <div className="blog-imagen">
          <img src="img/blog3.jpg" alt="Evento Literatura" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog3;
