// test/CartService.spec.js
import { generarBoleta } from "../src/services/CartService";
import api from "../src/services/AxiosConfig";


describe("CartService - generarBoleta", () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada test
    jasmine.restoreAllMocks && jasmine.restoreAllMocks();
  });

  it("debería lanzar error si el carrito está vacío", async () => {
    await expectAsync(generarBoleta([])).toBeRejectedWithError("El carrito está vacío");
    await expectAsync(generarBoleta(null)).toBeRejectedWithError("El carrito está vacío");
  });

  it("debería generar la boleta correctamente", async () => {
    const carrito = [
      { id: 1, cantidad: 2 },
      { id: 2, cantidad: 1 },
    ];

    // Mock de api.get
    spyOn(api, "get").and.callFake((url) => {
      if (url === "/productos/1") return Promise.resolve({ data: { precio: "100" } });
      if (url === "/productos/2") return Promise.resolve({ data: { precio: "50" } });
    });

    // Mock de api.post
    spyOn(api, "post").and.callFake((url, body) => {
      expect(url).toBe("/boletas"); // asegurar que se llama al endpoint correcto
      expect(body).toEqual({
        productos: [
          { id_producto: 1, cantidad: 2, precio_unitario: 100 },
          { id_producto: 2, cantidad: 1, precio_unitario: 50 },
        ],
      });
      return Promise.resolve({ data: { id_boleta: 123, total: 250 } });
    });

    const res = await generarBoleta(carrito);
    expect(res).toEqual({ id_boleta: 123, total: 250 });
  });

  it("debería usar cantidad 1 por defecto si no se especifica", async () => {
    const carrito = [{ id: 3 }];

    spyOn(api, "get").and.returnValue(Promise.resolve({ data: { precio: "75" } }));
    spyOn(api, "post").and.callFake((url, body) => {
      expect(body.productos[0].cantidad).toBe(1);
      return Promise.resolve({ data: { id_boleta: 456, total: 75 } });
    });

    const res = await generarBoleta(carrito);
    expect(res).toEqual({ id_boleta: 456, total: 75 });
  });
});
