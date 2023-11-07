import express from "express";
import usuariosRutas from "./routes/users.js";
import dotenv from "dotenv"
dotenv.config();

const app = express();
app.use(express.json());

// logica del negocio
app.get("/", (req, res) => {
  res.send("hola mundo");
});

app.use("/users", usuariosRutas);

// el puerto y y donde va a escuhar la app
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`servidor escuchando http://localhost:${PORT}`);
});
