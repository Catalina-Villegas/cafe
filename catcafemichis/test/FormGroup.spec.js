import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FormGroup from "../src/components/molecules/FormGroup";

describe('FormGroup', () => {
  let mockOnChange;

  beforeEach(() => {
    // Creamos un mock para la función onChange
    mockOnChange = jasmine.createSpy('onChange');
  });

  it('debe renderizar el label correctamente', () => {
    const { getByText } = render(
      <FormGroup
        label="Nombre"
        name="nombre"
        value=""
        onChange={mockOnChange}
        placeholder="Ingresa tu nombre"
      />
    );

    const labelElement = getByText("Nombre");
    expect(labelElement).toBeDefined(); // Aseguramos que el label está en el DOM
    expect(labelElement.tagName).toBe('LABEL');
  });

  it('debe renderizar un Input por defecto', () => {
    const { getByPlaceholderText } = render(
      <FormGroup
        label="Correo"
        name="correo"
        value=""
        onChange={mockOnChange}
        placeholder="ejemplo@correo.com"
      />
    );

    const inputElement = getByPlaceholderText("ejemplo@correo.com");
    expect(inputElement).toBeDefined(); // Verificamos que el input esté en el DOM
    expect(inputElement.tagName).toBe('INPUT'); // Verificamos que sea un input

    // Simulamos un cambio de valor
    fireEvent.change(inputElement, { target: { value: "test@mail.com" } });
    expect(mockOnChange).toHaveBeenCalledTimes(1); // Aseguramos que onChange fue llamado
  });

  it('debe renderizar un Select cuando el tipo es "select"', () => {
    const options = [
      { value: "", label: "Selecciona" },
      { value: "opcion1", label: "Opción 1" }
    ];

    const { getByRole } = render(
      <FormGroup
        label="Categoría"
        type="select"
        name="categoria"
        value=""
        onChange={mockOnChange}
        options={options}
        placeholder="Selecciona"
      />
    );

    const selectElement = getByRole('combobox');
    expect(selectElement).toBeDefined(); // Verificamos que el select esté en el DOM
    expect(selectElement.tagName).toBe('SELECT'); // Aseguramos que sea un select

    // Simulamos un cambio de valor
    fireEvent.change(selectElement, { target: { value: "opcion1" } });
    expect(mockOnChange).toHaveBeenCalledTimes(1); // Verificamos que se haya llamado onChange
  });
});
