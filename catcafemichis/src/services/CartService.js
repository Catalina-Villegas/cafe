import api from "./AxiosConfig";

/**
 * Genera una boleta usando el token del usuario logueado.
 * @param {Array} carrito - Lista de productos del carrito { id, cantidad }
 * @returns {Promise<Object>} - Datos de la boleta generada
 */
export async function generarBoleta(carrito) {
  if (!carrito || carrito.length === 0) {
    throw new Error("El carrito está vacío");
  }

  // Obtener los precios reales de cada producto
  const productosConPrecio = await Promise.all(
    carrito.map(async (p) => {
      const res = await api.get(`/productos/${p.id}`);
      return {
        id_producto: p.id,
        cantidad: p.cantidad || 1,
        precio_unitario: Number(res.data.precio),
      };
    })
  );

  // Crear la boleta en el backend
  const res = await api.post("/boletas", { productos: productosConPrecio });

  return res.data;
}
