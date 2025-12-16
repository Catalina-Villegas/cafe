// test/ProductoService.spec.js
import ProductoService from "../src/services/ProductoService";
import api from "../src/services/AxiosConfig";

describe("ProductoService", () => {

  beforeEach(() => {
    // Limpiar mocks antes de cada test
    jasmine.restoreAllMocks && jasmine.restoreAllMocks();
  });

  it("getAllProductos debería llamar a api.get con '/productos'", async () => {
    spyOn(api, "get").and.returnValue(Promise.resolve({ data: [{ id: 1, nombre: "Producto1" }] }));
    
    const res = await ProductoService.getAllProductos();
    expect(api.get).toHaveBeenCalledWith("/productos");
    expect(res.data).toEqual([{ id: 1, nombre: "Producto1" }]);
  });

  it("createProducto debería llamar a api.post con '/productos' y el producto", async () => {
    const nuevoProducto = { nombre: "Producto2" };
    spyOn(api, "post").and.returnValue(Promise.resolve({ data: { id: 2, nombre: "Producto2" } }));

    const res = await ProductoService.createProducto(nuevoProducto);
    expect(api.post).toHaveBeenCalledWith("/productos", nuevoProducto);
    expect(res.data).toEqual({ id: 2, nombre: "Producto2" });
  });

  it("getProductoById debería llamar a api.get con '/productos/:id'", async () => {
    spyOn(api, "get").and.returnValue(Promise.resolve({ data: { id: 1, nombre: "Producto1" } }));

    const res = await ProductoService.getProductoById(1);
    expect(api.get).toHaveBeenCalledWith("/productos/1");
    expect(res.data).toEqual({ id: 1, nombre: "Producto1" });
  });

  it("updateProducto debería llamar a api.put con '/productos/:id' y el producto", async () => {
    const actualizado = { nombre: "Producto1 Editado" };
    spyOn(api, "put").and.returnValue(Promise.resolve({ data: actualizado }));

    const res = await ProductoService.updateProducto(1, actualizado);
    expect(api.put).toHaveBeenCalledWith("/productos/1", actualizado);
    expect(res.data).toEqual(actualizado);
  });

  it("deleteProducto debería llamar a api.delete con '/productos/:id'", async () => {
    spyOn(api, "delete").and.returnValue(Promise.resolve({ data: { success: true } }));

    const res = await ProductoService.deleteProducto(1);
    expect(api.delete).toHaveBeenCalledWith("/productos/1");
    expect(res.data).toEqual({ success: true });
  });
});
