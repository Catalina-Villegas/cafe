import React, { useEffect, useState } from "react";
import ProductoService from "../../services/ProductoService";

export default function ProductList({ onAdd }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await ProductoService.getAllProductos();
        setProductos(res.data);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("No se pudieron cargar los productos 😿");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul className="productos">
      {productos.map((p) => (
        <li className="item" key={p.id}>
          <img src={p.imagen} alt={p.nombre} />
          <h3 className="producto-title">{p.nombre}</h3>
          <p className="price">${Number(p.precio).toLocaleString("es-CL")}</p>
          <button className="btn-add" onClick={() => onAdd(p)}>
            Agregar al carrito
          </button>
        </li>
      ))}
    </ul>
  );
}
