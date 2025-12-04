const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const bcrypt = require('bcrypt'); // npm install bcrypt
const jwt = require('jsonwebtoken'); // npm install jsonwebtoken

// 3. Middlewares
app.use(express.json());
app.use(cors());

// Crear tabla automáticamente con todos los campos
const iniciarDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        precio DECIMAL(10, 2) NOT NULL,
        descripcion TEXT,
        opciones TEXT[],
        imagen TEXT
      );
    `);
    console.log("Tabla 'productos' verificada y actualizada.");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        correo VARCHAR(100) UNIQUE NOT NULL,
        contrasenia TEXT NOT NULL,
        rol VARCHAR(50) DEFAULT 'cliente'
      );
    `);
    console.log("Tabla 'usuarios' verificada y actualizada.");
  } catch (err) {
    console.error("Error DB:", err);
  }
};
iniciarDB();

// RUTAS PRODUCTOS
app.get('/productos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

app.get('/productos/:id', async (req, res) => {
  // Obtenemos el ID de los parámetros de la URL (req.params)
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query('SELECT * FROM productos WHERE id=$1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});


app.post('/productos', async (req, res) => {
  try {
    const { nombre, precio, descripcion, opciones, imagen } = req.body;

    const result = await pool.query(
      'INSERT INTO productos (nombre, precio, descripcion, opciones, imagen) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, precio, descripcion, opciones, imagen]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear producto" });
  }
});

app.put('/productos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, precio, descripcion, opciones, imagen } = req.body;

  try {
    const result = await pool.query(
      `UPDATE productos 
       SET nombre=$1, precio=$2, descripcion=$3, opciones=$4, imagen=$5 
       WHERE id=$6 
       RETURNING *`,
      [nombre, precio, descripcion, opciones, imagen, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json(result.rows[0]); // Devolvemos el producto actualizado
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});


app.delete('/productos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query(
      'DELETE FROM productos WHERE id=$1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }


    res.status(204).send(); // Eliminado correctamente, sin contenido
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});


// RUTAS USUARIOS
app.get('/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

app.get('/usuarios/:id', async (req, res) => {
  // Obtenemos el ID de los parámetros de la URL (req.params)
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE id=$1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});


app.post('/usuarios', async (req, res) => {
  try {
    const { nombre, correo, contrasenia, rol } = req.body;

    const result = await pool.query(
      'INSERT INTO usuarios (nombre, correo, contrasenia, rol) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, correo, contrasenia, rol]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

app.put('/usuarios/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, correo,contrasenia, rol } = req.body;

  try {
    const result = await pool.query(
      `UPDATE usuarios 
       SET nombre=$1, correo=$2, contrasenia=$3, rol=$4
       WHERE id=$5 
       RETURNING *`,
      [nombre, correo, contrasenia, rol, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(result.rows[0]); // Devolvemos el usuario actualizado
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});


app.delete('/usuarios/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query(
      'DELETE FROM usuarios WHERE id=$1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'usuario no encontrado' });
    }

    res.status(204).send(); // Eliminado correctamente, sin contenido
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

// Endpoint /auth/login
app.post('/auth/login', async (req, res) => {
  const { correo, contrasenia } = req.body;

  try {
    // Buscar usuario por correo
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE correo=$1',
      [correo]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos miau' });
    }

    const user = result.rows[0];

    // Comparar contraseña (texto plano o bcrypt)
    const match = contrasenia === user.contrasenia;

    if (!match) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: user.id, nombre: user.nombre, rol: user.rol },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error("Error real en /auth/login:", err);
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
