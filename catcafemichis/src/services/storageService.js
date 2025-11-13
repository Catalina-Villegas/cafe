/*Usuarios*/
export const getUsers = () =>
  JSON.parse(localStorage.getItem("usuarios")) || [];

export const addUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("usuarios", JSON.stringify(users));
};

/*Productos*/
export const getProducts = () =>
  JSON.parse(localStorage.getItem("productos")) || [];

export const addProduct = (product) => {
  const products = getProducts();
  products.push(product);
  localStorage.setItem("productos", JSON.stringify(products));
};


/*Contacto*/
// Nueva sugerencia
export const saveSuggestion = (suggestion) => {
  const existing = JSON.parse(localStorage.getItem("suggestions") || "[]");
  existing.push(suggestion);
  localStorage.setItem("suggestions", JSON.stringify(existing));
};

// Obtener todas las sugerencias
export const getSuggestions = () => {
  return JSON.parse(localStorage.getItem("suggestions")) || [];
};

// Borrar sugerencia
export const deleteSuggestion = (id) => {
  const existing = getSuggestions();
  const filtered = existing.filter((sug) => sug.id !== id);
  localStorage.setItem("suggestions", JSON.stringify(filtered));
};