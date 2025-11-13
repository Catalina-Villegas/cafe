import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ButtonAdd from "../src/components/atoms/ButtonAdd";

describe("ButtonAdd component", () => {
  it("muestra el texto correcto en el botón", () => {
    const { container } = render(<ButtonAdd nombre="Gato" precio={1000} onAdd={() => {}} />);
    const button = container.querySelector("button");
    expect(button.textContent).toBe("Agregar al carrito");
  });

  it("llama a onAdd con nombre y precio al hacer click", () => {
    const onAddMock = jasmine.createSpy("onAdd");
    const { container } = render(<ButtonAdd nombre="Gato" precio={1000} onAdd={onAddMock} />);
    const button = container.querySelector("button");

    fireEvent.click(button);

    expect(onAddMock).toHaveBeenCalled();
    expect(onAddMock).toHaveBeenCalledWith("Gato", 1000);
  });
});
