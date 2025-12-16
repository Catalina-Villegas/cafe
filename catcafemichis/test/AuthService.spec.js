// test/AuthService.spec.js
import AuthService from "../src/services/AuthService";
import axios from "axios";

describe("AuthService", () => {

  beforeEach(() => {
    // Limpiar mocks
    jasmine.restoreAllMocks && jasmine.restoreAllMocks();
    localStorage.clear();
  });

  it("login debería guardar token en localStorage si la respuesta tiene token", async () => {
    const tokenMock = "abc123";
    spyOn(axios, "post").and.returnValue(Promise.resolve({ data: { token: tokenMock } }));
    spyOn(localStorage, "setItem").and.callThrough();

    const res = await AuthService.login("user@test.com", "password123");

    expect(axios.post).toHaveBeenCalledWith(
      "http://54.160.204.65:3000/auth/login",
      { correo: "user@test.com", contrasenia: "password123" }
    );
    expect(localStorage.setItem).toHaveBeenCalledWith("token", tokenMock);
    expect(res.token).toBe(tokenMock);
  });

  it("login no debería guardar token si no viene token en la respuesta", async () => {
    spyOn(axios, "post").and.returnValue(Promise.resolve({ data: {} }));
    spyOn(localStorage, "setItem").and.callThrough();

    const res = await AuthService.login("user@test.com", "password123");

    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(res).toEqual({});
  });

  it("logout debería eliminar token de localStorage", () => {
    localStorage.setItem("token", "abc123");
    spyOn(localStorage, "removeItem").and.callThrough();

    AuthService.logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith("token");
    expect(localStorage.getItem("token")).toBeNull();
  });

  it("getCurrentUser debería devolver el token actual", () => {
    localStorage.setItem("token", "abc123");

    const token = AuthService.getCurrentUser();
    expect(token).toBe("abc123");
  });

  it("getCurrentUser debería devolver null si no hay token", () => {
    localStorage.removeItem("token");

    const token = AuthService.getCurrentUser();
    expect(token).toBeNull();
  });

});
