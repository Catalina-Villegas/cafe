
export default function ProductList({ productos, onAdd }) {
  return (
    <ul className="productos">
      {productos.map((p) => (
        <li className="item" key={p.id}>
          <img src={p.imagen} alt={p.nombre} />
          <h3 className="producto-title">{p.nombre}</h3>
          <p className="price">${p.precio.toLocaleString("es-CL")}</p>
          <button className="btn-add" onClick={() => onAdd(p)}>
            Agregar al carrito
          </button>
        </li>
      ))}
    </ul>
  );
}


