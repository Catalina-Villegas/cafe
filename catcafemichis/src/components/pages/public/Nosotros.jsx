import { Link } from "react-router-dom";
import Header from "../../organisms/Header";
import Footer from "../../organisms/Footer";
import "../../css/index.css";

const Nosotros = () => {
  return (
    <div>
      <Header />

      <section className="nosotros-logoNombre">
        <div className="nosotros-logoNombre-contenido">
          <img src="img/logoTienda.jpg" alt="logoTienda" />
          <h1>CatCafe Michis</h1>
        </div>
      </section>

      <div className="nosotros-contenido">
        <h2>Sobre Nosotros</h2>
      </div>

      <section className="nosotros">
        <div className="nosotros-texto">
          <p>
            Bienvenidos a Michis, un lugar donde la pasión por los gatos se
            fusiona con el placer de un buen café. Más que un simple café, somos
            un verdadero santuario diseñado para el bienestar de nuestros
            adorables residentes felinos y el deleite de todos los amantes de
            los gatos.
          </p>
          <p>
            Cada michi que ves correteando, jugando o durmiendo plácidamente en
            nuestro espacio es un residente temporal que ha encontrado en
            nosotros un hogar seguro, estimulante y lleno de amor. Trabajamos en
            estrecha colaboración con refugios y organizaciones de rescate
            locales para asegurar que cada gatito que llega a Michis esté sano,
            socializado y listo para encontrar su familia definitiva. Nuestro
            compromiso es promover la adopción responsable.
          </p>
          <p>
            Nos enorgullece ser un espacio inclusivo y amigable, un verdadero
            oasis en la ciudad donde el tiempo parece detenerse. Aquí, todos son
            bienvenidos: desde niños que aprenden el respeto y el cariño por los
            animales, hasta adultos que buscan un respiro del ajetreo diario y
            una conexión genuina.
          </p>
          <p>
            En Michis, creemos en el poder de la conexión. Cada visita, cada
            café que disfrutas y cada interacción con nuestros gatos contribuye
            directamente al bienestar y futuro de estos maravillosos seres,
            apoyando su cuidado, alimentación y la búsqueda de su hogar para
            siempre.
          </p>
        </div>
      </section>

      <div className="nosotros-contenido">
        <h2>
          La Historia de "Michis": Donde un Ronroneo Encendió una Idea
        </h2>
      </div>

      <section className="nosotros">
        <div className="nosotros-texto">
          <p>
            Cada rincón de Michis resuena con una historia, pero el verdadero
            comienzo de este santuario para gatos y café se gestó en un
            apartamento pequeño, lleno de libros y el suave calor de un hogar
            compartido. Su fundadora, Ana, una amante del café y defensora de
            los animales desde la infancia, vivía una vida ajetreada como
            diseñadora gráfica en la ciudad. Sin embargo, su más grande alegría
            era la compañía de Luna, una gata atigrada que había rescatado de
            las calles años atrás.
          </p>
          <p>
            Luna era más que una mascota; era el alma tranquila que la esperaba
            cada noche. Fue una mañana tranquila, con una taza de café humeante
            en la mano y Luna acurrucada en su regazo, que a Ana le asaltó la
            idea. Observó cómo el simple acto de disfrutar de su café se
            magnificaba con la presencia reconfortante de su gata. “¿Por qué no
            podría todo el mundo experimentar esta magia?”, se preguntó.
          </p>
          <p>
            Pero Ana sabía que no todos los “michis” tenían una Luna. Demasiados
            gatos esperaban un hogar en refugios sobrecargados, anhelando una
            caricia, un lugar seguro para dormir. Fue entonces cuando su visión
            comenzó a tomar forma: crear un espacio donde la calidez de un café
            se uniera con la noble misión de la adopción responsable. Un lugar
            donde los gatos pudieran ser ellos mismos, sociabilizar con humanos
            y, finalmente, encontrar a sus familias.
          </p>
          <p>
            El nombre “Michis” surgió de forma natural, un diminutivo cariñoso
            que engloba la esencia de esos pequeños felinos que se ganan el
            corazón.
          </p>
          <p>
            La búsqueda del lugar perfecto no fue fácil. Ana quería un espacio
            que fuera ante todo un paraíso felino y, al mismo tiempo, un
            ambiente acogedor para los humanos. Cada detalle fue pensado para el
            bienestar y la seguridad tanto de los gatos como de los visitantes.
          </p>
          <p>
            Desde el primer día, Ana estableció alianzas con refugios y
            protectoras locales. Quería que Michis fuera un puente, un
            escaparate para gatos que necesitaban un hogar y un punto de
            encuentro para personas que deseaban ofrecerlo.
          </p>
          <p>
            Finalmente, un día de primavera, las puertas de Michis se abrieron.
            El aire se llenó del aroma a café, el sonido de suaves ronroneos y
            la energía alegre de gatos explorando su nuevo santuario. No era
            solo un café; era el sueño de Ana hecho realidad.
          </p>
          <p>
            Hoy, Michis sigue siendo ese refugio inclusivo, ese espacio amigable
            donde cada visita no solo deleita el alma, sino que también te
            convierte en parte de una misión más grande: dar a cada michi la
            oportunidad de un hogar para siempre.
          </p>
        </div>
      </section>

      <section className="nosotros-logoNombre">
        <div className="nosotros-logoNombre-contenido">
          <img src="img/fundadora.jpg" alt="Ana y" />
          <p>Ana y Luna</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Nosotros;
