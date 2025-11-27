const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

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
  } catch (err) {
    console.error("Error DB:", err);
  }
};
iniciarDB();

// RUTAS
app.get('/productos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener productos" });
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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
