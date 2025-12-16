// test/AxiosConfig.spec.js
import api from "../src/services/AxiosConfig";

describe("AxiosConfig", () => {

  beforeEach(() => {
    localStorage.clear();
    jasmine.restoreAllMocks && jasmine.restoreAllMocks();
  });

  it("debería agregar Authorization header si hay token en localStorage", async () => {
    localStorage.setItem("token", "abc123");

    // Mock de la función de request (sin hacer HTTP real)
    const requestConfig = { headers: {} };
    const result = await api.interceptors.request.handlers[0].fulfilled(requestConfig);

    expect(result.headers.Authorization).toBe("Bearer abc123");
  });

  it("no debería agregar Authorization si no hay token", async () => {
    const requestConfig = { headers: {} };
    const result = await api.interceptors.request.handlers[0].fulfilled(requestConfig);

    expect(result.headers.Authorization).toBeUndefined();
  });

  it("debería rechazar el interceptor en caso de error", async () => {
    const error = new Error("Request error");
    try {
      await api.interceptors.request.handlers[0].rejected(error);
      fail("Debió lanzar error");
    } catch (e) {
      expect(e).toBe(error);
    }
  });

});
