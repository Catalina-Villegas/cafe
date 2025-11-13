
import { Link } from "react-router-dom";
import "./organismos.css";

const Header = () => {
  return (
    <header className="header">
      <h1 className="nombre">CatCafe Michis</h1>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/Productos">Productos</Link>
          </li>
          <li>
            <Link to="/Nosotros">Nosotros</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/ContactoPublic">Contacto</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;