import React, { act } from "react";
import ReactDOM from "react-dom/client";
import ProductoList from "../src/components/organisms/ProductList";
import ProductoService from "../src/services/ProductoService";

describe("ProductoList Component", () => {
  let container;
  let root;

  const mockProductos = [
    { id: 1, nombre: "Producto Test 1", precio: 1000, imagen: "img1.jpg" },
    { id: 2, nombre: "Producto Test 2", precio: 2000, imagen: "img2.jpg" },
  ];

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = ReactDOM.createRoot(container);

    spyOn(ProductoService, "getAllProductos").and.returnValue(
      Promise.resolve({ data: mockProductos })
    );
  });

  afterEach(() => {
    root.unmount();
    document.body.removeChild(container);
  });


  it("renderiza productos correctamente", async () => {
    await act(async () => {
      root.render(<ProductoList onAdd={() => {}} />);
    });

    const items = container.querySelectorAll(".item");
    expect(items.length).toBe(2);
    expect(container.textContent).toContain("Producto Test 1");
  });

  it("llama onAdd al hacer click", async () => {
    const onAddSpy = jasmine.createSpy("onAdd");

    await act(async () => {
      root.render(<ProductoList onAdd={onAddSpy} />);
    });

    const btn = container.querySelector(".btn-add");
    expect(btn).not.toBeNull();
    btn.click();

    expect(onAddSpy).toHaveBeenCalledWith(mockProductos[0]);
  });

  it("muestra error si falla la API", async () => {
    // 👇 sobrescribimos el spy SOLO en este test
    ProductoService.getAllProductos.and.returnValue(
      Promise.reject(new Error("Error API"))
    );

    await act(async () => {
      root.render(<ProductoList onAdd={() => {}} />);
    });

    expect(container.textContent).toContain(
      "No se pudieron cargar los productos"
    );
  });
});
