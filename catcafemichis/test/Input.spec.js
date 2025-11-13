import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Input from "../src/components/atoms/Input";

describe("Input component", () => {
  it("se renderiza con los props correctos", () => {
    const { container } = render(
      <Input
        type="text"
        name="nombre"
        value="Gato"
        placeholder="Escribe algo..."
        onChange={() => {}}
      />
    );

    const input = container.querySelector("input");
    expect(input).not.toBeNull();
    expect(input.type).toBe("text");
    expect(input.name).toBe("nombre");
    expect(input.value).toBe("Gato");
    expect(input.placeholder).toBe("Escribe algo...");
  });

  it("llama a onChange cuando cambia el valor", () => {
    const onChangeMock = jasmine.createSpy("onChange");
    const { container } = render(
      <Input
        name="nombre"
        value=""
        onChange={onChangeMock}
      />
    );

    const input = container.querySelector("input");
    fireEvent.change(input, { target: { value: "Nuevo valor" } });

    expect(onChangeMock).toHaveBeenCalled();
  });
});
