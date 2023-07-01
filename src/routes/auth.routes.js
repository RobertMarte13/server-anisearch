import { Router } from "express";
import pool from "../db.js";

const router = Router();

// register
router.post("/api/register", async (req, res) => {
  // Recuperando los datos que pasa el client
  const { username, password, auth_id } = req.body;

  // Recuperando solo los username de la base de datos para compara y que no exista ya un nombre igual al que se intenta registrar.
  const data = await pool.query("SELECT username FROM auth");
  const users = data[0];
  // Comparando con un find que no alla un username igual en la base de datos
  const validationUserName = users.find((user) => user.username === username);

  // Validacion que lo que hace es verificar que todo vaya bien y si todo va bien crea el registro del usuario nuevo
  if (!!!validationUserName) {
    const [rows] = await pool.query(
      "INSERT INTO auth(username, password, auth_id) VALUES (?, ?, ?)",
      [username, password, auth_id]
    );
    res.status(201).json({
      message: "success!!!",
    });
  } else {
    res.status(404).json({ message: "Your username is already taken!!" });
  }
});

// Login
router.get("/api/login", async (req, res) => {
  // Recuperando la data que el usuario me esta pasando para registrarse.
  const { username, password } = req.body;

  // Seleccionando los datos de la base de datos para compara y que exista ya un nombre igual al del login.
  const auth = await pool.query("SELECT id, username, password FROM auth");
  const users = auth[0];
  // validando los datos y comparando tanto el username como el password para saber si ese usuario existe o no.
  const validationName = users.find((user) => user.username === username);
  const validationPassword = users.find((user) => user.password === password);

  // Validacion que se encarga de mandar una id al client y su nombre de usuario si pasa el filtro del if, sino mandara un message que diga que el usuario o la contraceña esta mal.
  if (validationName && validationPassword) {
    res.json({
      pin: validationName.id,
      isValidation: true,
      user: validationName.username,
    });
  } else {
    res.status(404).json({ message: "The username or password is incorrect" });
  }
});

export default router;
