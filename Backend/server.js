import express from "express";
import { conn } from "./conn.js"; // conexión con mysql2/promise
import cors from "cors";

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Obtener todos los usuarios
app.get("/api/usuarios", async (req, res) => {
  try {
    const [rows] = await conn.query("SELECT * FROM profesores");
    res.json(rows);
  } catch (err) {
    console.error("Error en SELECT:", err);
    res.status(500).json({ error: "Error en la base de datos" });
  }
});

// Crear usuario
app.post("/api/usuarios", async (req, res) => {
  try {
    const { nombre, materia, estado, horario } = req.body;

    const [result] = await conn.query(
      `INSERT INTO profesores (nombre, materia, estado, horario)
       VALUES (?, ?, ?, ?)`,
      [nombre, materia, estado, horario]
    );

    const [newUser] = await conn.query(
      "SELECT * FROM profesores WHERE id = ?",
      [result.insertId]
    );

    res.json(newUser[0]);
  } catch (err) {
    console.error("Error en INSERT:", err);
    res.status(500).json({ error: err.message });
  }
});

// Actualizar usuario
app.put("/api/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, materia, estado, horario } = req.body;

    await conn.query(
      `UPDATE profesores 
       SET nombre=?, materia=?, estado=?, horario=? 
       WHERE id=?`,
      [nombre, materia, estado, horario, id]
    );

    const [updatedUser] = await conn.query(
      "SELECT * FROM profesores WHERE id = ?",
      [id]
    );

    res.json(updatedUser[0]);
  } catch (err) {
    console.error("Error en UPDATE:", err);
    res.status(500).json({ error: err.message });
  }
});

// Eliminar usuario
app.delete("/api/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await conn.query("DELETE FROM profesores WHERE id = ?", [id]);
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (err) {
    console.error("Error en DELETE:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
