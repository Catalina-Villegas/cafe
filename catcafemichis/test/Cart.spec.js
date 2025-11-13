import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "../src/components/organisms/Cart";

describe("Cart component", () => {

  it("muestra mensaje cuando el carrito está vacío", () => {
    render(<Cart carrito={[]} onRemove={() => {}} onClear={() => {}} />);
    
    expect(screen.getByText("🛒 Carrito (0)")).toBeTruthy();
    expect(screen.getByText("Tu carrito está vacío 🐾")).toBeTruthy();
  });

  it("muestra productos en el carrito con su total", () => {
    const carrito = [
      { nombre: "Gato de peluche", precio: 12000 },
      { nombre: "Rascador", precio: 45000, opcion: "Mediano" },
    ];

    render(<Cart carrito={carrito} onRemove={() => {}} onClear={() => {}} />);

    expect(screen.getByText("🛒 Carrito (2)")).toBeTruthy();
    expect(screen.getByText("Gato de peluche – $12.000")).toBeTruthy();
    expect(screen.getByText("Rascador (Mediano) – $45.000")).toBeTruthy();
    expect(screen.getByText("Total: $57.000")).toBeTruthy();
  });

  it("llama onRemove cuando se hace click en ❌ de un producto", () => {
    const carrito = [{ nombre: "Gato de peluche", precio: 12000 }];
    const onRemoveSpy = jasmine.createSpy("onRemove");

    render(<Cart carrito={carrito} onRemove={onRemoveSpy} onClear={() => {}} />);
    
    const removeButton = screen.getByText("❌");
    fireEvent.click(removeButton);

    expect(onRemoveSpy).toHaveBeenCalledWith(0);
  });

  it("llama onClear y muestra alerta al pagar", () => {
    const carrito = [{ nombre: "Rascador", precio: 45000 }];
    const onClearSpy = jasmine.createSpy("onClear");

    // Mock alert de navegador
    spyOn(window, "alert");

    render(<Cart carrito={carrito} onRemove={() => {}} onClear={onClearSpy} />);

    const pagarButton = screen.getByText("Pagar");
    fireEvent.click(pagarButton);

    expect(window.alert).toHaveBeenCalledWith("¡Gracias por tu compra en CatCafe Michis 😺!");
    expect(onClearSpy).toHaveBeenCalled();
  });

});
