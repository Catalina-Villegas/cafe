import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import Header from "../src/components/organisms/Header";

describe("Header component", () => {
  let container;
  let root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    document.body.removeChild(container);
    container = null;
    root = null;
  });

  it("renderiza correctamente los enlaces del header", () => {
    act(() => {
      root.render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );
    });

    const links = container.querySelectorAll("a");
    expect(links.length).toBe(5);

    expect(links[0].textContent).toBe("Inicio");
    expect(links[0].getAttribute("href")).toBe("/");

    expect(links[1].textContent).toBe("Productos");
    expect(links[1].getAttribute("href")).toBe("/Productos");

    expect(links[2].textContent).toBe("Nosotros");
    expect(links[2].getAttribute("href")).toBe("/Nosotros");

    expect(links[3].textContent).toBe("Blogs");
    expect(links[3].getAttribute("href")).toBe("/blogs");

    expect(links[4].textContent).toBe("Contacto");
    expect(links[4].getAttribute("href")).toBe("/ContactoPublic");
  });

  it("renderiza el título correctamente", () => {
    act(() => {
      root.render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );
    });

    const h1 = container.querySelector("h1");
    expect(h1.textContent).toBe("CatCafe Michis");
  });
});
