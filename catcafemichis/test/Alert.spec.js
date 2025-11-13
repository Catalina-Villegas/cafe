import React from "react";
import { render } from "@testing-library/react";
import Alert from "../src/components/atoms/Alert";

describe("Alert component", () => {
  it("muestra el mensaje correctamente", () => {
    const { container } = render(<Alert message="Mensaje de prueba" />);
    const strong = container.querySelector("strong");
    expect(strong.textContent).toBe("Mensaje de prueba");
  });

  it("usa el color de fondo correcto según el tipo", () => {
    const { container } = render(<Alert type="success" message="Éxito" />);
    expect(container.firstChild.style.backgroundColor).toBe("rgb(232, 245, 233)"); // #e8f5e9 en RGB
  });

  it("usa el borde correcto según el tipo", () => {
    const { container } = render(<Alert type="error" message="Error" />);
    expect(container.firstChild.style.border).toBe("1px solid rgb(229, 115, 115)"); // #e57373
  });

  it("muestra texto en color correcto", () => {
    const { container } = render(<Alert type="error" message="Error" />);
    const strong = container.querySelector("strong");
    expect(strong.style.color).toBe("rgb(229, 115, 115)"); // #e57373
  });
});

