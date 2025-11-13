// src/context/UsersContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getUsers, addUser } from "../services/storageService";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);

  // 🧠 Cargar usuarios desde el almacenamiento local (una sola vez)
  useEffect(() => {
    const storedUsers = getUsers();
    setUsuarios(storedUsers);
  }, []);

  // ➕ Registrar nuevo usuario
  const registrar = (nuevoUsuario) => {
    addUser(nuevoUsuario);
    setUsuarios((prev) => [...prev, nuevoUsuario]);
  };

  // 🔑 Login simple
  const login = (correo, contrasenia) => {
    const user = usuarios.find(
      (u) => u.correo === correo && u.contrasenia === contrasenia
    );
    return user || null;
  };

  // ✏️ Editar usuario existente
  const actualizarUsuario = (correo, datosActualizados) => {
    const actualizados = usuarios.map((u) =>
      u.correo === correo ? { ...u, ...datosActualizados } : u
    );
    setUsuarios(actualizados);
    localStorage.setItem("usuarios", JSON.stringify(actualizados));
  };

  // ❌ Eliminar usuario
  const eliminarUsuario = (correo) => {
    const filtrados = usuarios.filter((u) => u.correo !== correo);
    setUsuarios(filtrados);
    localStorage.setItem("usuarios", JSON.stringify(filtrados));
  };

  // ✅ Exportamos todo lo necesario
  return (
    <UsersContext.Provider
      value={{
        usuarios,
        registrar,
        login,
        setUsuarios,         // <-- acceso directo si lo necesitas
        actualizarUsuario,   // <-- para edición
        eliminarUsuario,     // <-- para borrado futuro
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);