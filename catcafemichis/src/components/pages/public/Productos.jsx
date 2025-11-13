import React, { useEffect, useState } from "react";
import ProductosTemplate from "../../template/ProductosTemplate.jsx";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    // Intentar cargar productos desde localStorage
    const productosLS = JSON.parse(localStorage.getItem("productos"));

    if (productosLS && productosLS.length > 0) {
      setProductos(productosLS);
    } else {
      // Si no hay en LS (por ejemplo, primera carga), traer desde JSON
      fetch("/productos.json")
        .then((res) => res.json())
        .then((data) => {
          setProductos(data);
          // Guardar también en localStorage para siguientes veces
          localStorage.setItem("productos", JSON.stringify(data));
        })
        .catch((err) => console.error("Error al cargar productos:", err));
    }

    // Cargar el carrito si existe
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  const agregarProducto = (producto) => {
    const nuevoCarrito = [...carrito, producto];
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const eliminarProducto = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
  };

  return (
    <ProductosTemplate
      productos={productos}
      carrito={carrito}
      onAdd={agregarProducto}
      onRemove={eliminarProducto}
      onClear={vaciarCarrito}
    />
  );
}
