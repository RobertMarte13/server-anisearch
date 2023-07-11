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
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username)) {
    true;
  } else {
    return res.json({
      message: "El correo electronico no es valido!",
    });
  }
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

// Recover Password
router.patch("/api/recover_password", async (req, res) => {
  const { username, password } = req.body;

  // Recuperando todos los nombres de los usuarios para saber si el usuario que quiere cambiar su contraseña es real o no.
  const data = await pool.query("SELECT username FROM auth");
  const users = data[0];

  // Aqui guardamos el resultado del usuario encontrado en la base de datos.
  const validationUserName = users.find((user) => user.username === username);

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username)) {
    true;
  } else {
    return res.status(404).json({
      message: "El correo electronico no es valido!",
    });
  }

  // Esta primera validacion es para saber si el usuario existe.
  if (validationUserName) {
    // Esta validacion es para saber si han introducido una contracena que no este vacia
    if (password !== null) {
      // Esta condicion es para saber si la contraseña es igual o mayor a 5 caracteres
      if (`${password}`.length >= 5) {
        // Esta condicion es para saber si la contraceña es menor o igual a 24 caracteres.
        if (`${password}`.length <= 24) {
          // Esta peticion es para actualizar el password en la base de datos.
          await pool.query(
            "UPDATE auth SET password = IFNULL(?, password) WHERE username = ?",
            [password, username]
          );

          res.status(201).json({
            message: "success",
          });
        } else {
          res.status(201).json({
            message: "The password we recommend is 24 characters or less",
          });
        }
      } else {
        res.status(201).json({
          message: "The password we recommend that it have 5 characters",
        });
      }
    } else {
      res.status(200).json({
        message: "You forgot to put the password",
      });
    }
  } else {
    res.status(404).json({
      message: "User Not Found",
    });
  }
});

// Login
router.get("/api/login/:username/:password", async (req, res) => {
  // Recuperando la data que el usuario me esta pasando para registrarse.
  const { username, password } = req.params;

  // Seleccionando los datos de la base de datos para compara y que exista ya un nombre igual al del login.
  const auth = await pool.query(
    "SELECT id, username, password, auth_id FROM auth"
  );
  const users = auth[0];
  // validando los datos y comparando tanto el username como el password para saber si ese usuario existe o no.
  const validationName = users.find((user) => user.username === username);
  const validationPassword = users.find((user) => user.password === password);

  // Validacion que se encarga de mandar una id al client y su nombre de usuario si pasa el filtro del if, sino mandara un message que diga que el usuario o la contraceña esta mal.
  console.log(validationName);

  if (validationName && validationPassword) {
    res.json({
      pin: validationName.auth_id,
      isValidation: true,
      user: validationName.username,
    });
  } else if (validationName || validationPassword) {
    res.status(404).json({ message: "The username or password is incorrect" });
  } else {
    res.status(404).json({
      message: "The user does not exist, register first!",
    });
  }
});

export default router;
