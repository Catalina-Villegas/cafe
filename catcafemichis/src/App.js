// src/App.js
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import "./App.css";
import "./components/css/index.css";

import Home from './components/pages/public/Home';
import LoginForm from './components/pages/public/LoginForm';
import RegistrationForm from './components/pages/public/RegistrationForm';
import Nosotros from './components/pages/public/Nosotros';
import ContactoPublic from './components/pages/public/ContactoPublic';
import Productos from './components/pages/public/Productos'

import Blogs from './components/pages/public/Blogs';
import Blog1 from './components/pages/public/Blog1';
import Blog2 from './components/pages/public/Blog2';
import Blog3 from './components/pages/public/Blog3';
import Blog4 from './components/pages/public/Blog4';

import AdminPanel from './components/pages/admin/AdminPanel';
import ProductosPanel from'./components/pages/admin/ProductosPanel';
import UsuariosPanel from'./components/pages/admin/UsuariosPanel';
import CrearProducto from './components/pages/admin/CrearProducto';
import CrearUsuario from'./components/pages/admin/CrearUsuario';
import EditarProducto from'./components/pages/admin/EditarProducto';
import EditarUsuario from'./components/pages/admin/EditarUsuario';
import Contacto from './components/pages/admin/Contacto';


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registro" element={<RegistrationForm />} />
        <Route path='/Nosotros' element={<Nosotros />} />
        <Route path='/ContactoPublic' element={<ContactoPublic />} />
        <Route path= '/Productos' element={<Productos/>}/>

        <Route path="/Blogs" element={<Blogs />} />
        <Route path="/Blog1" element={<Blog1 />} />
        <Route path="/Blog2" element={<Blog2 />} />
        <Route path="/Blog3" element={<Blog3 />} />
        <Route path="/Blog4" element={<Blog4 />} />


        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/ProductosPanel" element={<ProductosPanel />} />
        <Route path="/admin/EditarProducto" element={<EditarProducto />} />
        <Route path="/admin/CrearProducto" element={<CrearProducto />} />
        <Route path="/admin/UsuariosPanel" element={<UsuariosPanel />} />
        <Route path="/admin/CrearUsuario" element={<CrearUsuario />} />
        <Route path="/admin/EditarUsuario" element={<EditarUsuario />} />
        <Route path='/admin/Contacto' element={<Contacto />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
