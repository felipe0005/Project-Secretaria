import express from "express";
import routes from "./routers/profesores.route.js";
import { conn } from "./conn.js";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(routes);
app.use(cors());

app.get("/api/usuarios", (req, res) => {
  const sql = "SELECT * FROM profesores";
  conn.query(sql, (err, result) => {
    if (err) {
      console.error("Error en la consulta:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    res.json(result); 
  });
});

app.listen(PORT, () => {
  console.log(`Port listenin in http://localhost:${PORT}`);
});
