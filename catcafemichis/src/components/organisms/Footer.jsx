import "./organismos.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Sobre Nosotros</h3>
        <p>
          En "Michis", no solo somos un café, sino un santuario para los amantes
          de los gatos.
        </p>
        <a href="/nosotros">
          <strong>Más Información!</strong>
        </a>
      </div>

      <div className="footer-section">
        <h3>Contacto</h3>
        <p>
          <strong>Redes sociales:</strong> ¡Síguenos para no perderte ningún evento o promociones!
        </p>
        <p>
          <strong>Sucursales:</strong> Visítanos en nuestras sucursales de Providencia,
          Los Leones y La Cisterna.
        </p>
        <p>
          <strong>Apps:</strong> Pide tus favoritos desde tu casa con Rappi y Uber Eats.
        </p>
      </div>

      <div className="footer-section">
        <img
          src="/img/gatosFooter.jpg"
          alt="Gatitos Sentados"
          style={{ borderRadius: "10px", width: "150px", marginBottom: "10px" }}
        />
        <h3>
          <strong>¡Visítanos!</strong>
        </h3>
      </div>
    </footer>
  );
};

export default Footer;