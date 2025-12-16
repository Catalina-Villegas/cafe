import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Cart from "../src/components/organisms/Cart";
import * as CartService from "../src/services/CartService";
import AuthService from "../src/services/AuthService";

describe("Cart Component", () => {
  let onRemoveSpy, onClearSpy;

  beforeEach(() => {
    onRemoveSpy = jasmine.createSpy("onRemove");
    onClearSpy = jasmine.createSpy("onClear");
  });

  afterEach(() => {
    // Restaurar spies si se mockearon
    if (CartService.generarBoleta.and) {
      CartService.generarBoleta.and.callThrough();
    }
  });

  it("Renderiza carrito vacío correctamente", () => {
    render(<Cart carrito={[]} onRemove={onRemoveSpy} onClear={onClearSpy} />);
    expect(screen.getByText("Tu carrito está vacío 🐾")).toBeTruthy();
    expect(screen.queryByText("Pagar")).toBeNull();
  });

  it("Renderiza productos y calcula total", () => {
    const carrito = [
      { nombre: "Producto 1", precio: 1000, cantidad: 2 },
      { nombre: "Producto 2", precio: 500, cantidad: 1 },
    ];
    render(<Cart carrito={carrito} onRemove={onRemoveSpy} onClear={onClearSpy} />);

    expect(screen.getByText("Producto 1 – $2.000")).toBeTruthy();
    expect(screen.getByText("Producto 2 – $500")).toBeTruthy();
    expect(screen.getByText("Total: $2.500")).toBeTruthy();
  });

  it("Llama a onRemove cuando se hace click en ❌", () => {
    const carrito = [{ nombre: "Producto 1", precio: 1000, cantidad: 1 }];
    render(<Cart carrito={carrito} onRemove={onRemoveSpy} onClear={onClearSpy} />);

    fireEvent.click(screen.getByText("❌"));
    expect(onRemoveSpy).toHaveBeenCalledWith(0);
  });

  it("Muestra alert si no hay usuario al pagar", async () => {
    spyOn(AuthService, "getCurrentUser").and.returnValue(null);
    const carrito = [{ nombre: "Producto 1", precio: 1000, cantidad: 1 }];
    spyOn(window, "alert");

    render(<Cart carrito={carrito} onRemove={onRemoveSpy} onClear={onClearSpy} />);

    await act(async () => {
      fireEvent.click(screen.getByText((content) => content.includes("Pagar")));
    });

    expect(window.alert).toHaveBeenCalledWith("Debes iniciar sesión antes de pagar 😺");
  });

});

