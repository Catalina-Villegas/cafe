import Header from "../organisms/Header.jsx";
import Footer from "../organisms/Footer.jsx";
import Carrito from "../organisms/Cart.jsx";
import ProductList from "../organisms/ProductList.jsx";

import "../css/index.css";

export default function ProductosTemplate({ productos, carrito, onAdd, onRemove, onClear }) {
  return (
    <>
      <Header />
      <Carrito carrito={carrito} onRemove={onRemove} onClear={onClear} />
      <section className="productos-section">
        <div className="productos-section-title">
          <h2>PRODUCTOS</h2>
        </div>
        <ProductList productos={productos} onAdd={onAdd} />
      </section>
      <Footer />
    </>
  );
}
