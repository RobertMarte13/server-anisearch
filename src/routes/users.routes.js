import { Router } from "express";
import pool from "../db.js";

const router = Router();

// Este sirve para crear informacion de los usuarios para su perfil si son nuevos.
router.post("/api/users", async (req, res) => {
  const { username, img, bio, fechaNacimiento, user_id } = req.body;

  // Este codigo crea los primeros registros de informacion para cada perfil de cada usuario.
  await pool.query(
    "INSERT INTO users(username, img, bio, fechaNacimiento, user_id) VALUES (?, ?, ?, ?, ?)",
    [username, img, bio, fechaNacimiento, user_id]
  );
});

// Este es el codigo que deja ver a cada usuario su informacion de perfil o personal.
router.get("/api/users/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM users");

    // Validando que exista ese usuario y solo le devolvemos la informacion de perfil al usuario que le pertenece.
    const validationUser = rows.find((control) => control.user_id === userId);

    // Esta condicion es para mandarle al usuario la informacion que al final vera cuando entre a su perfil.
    if (validationUser) {
      res.json({
        user: validationUser.username,
        img: validationUser.img,
        bio: validationUser.bio,
        fechaNacimiento: validationUser.fechaNacimiento,
        user_id: validationUser.user_id,
        users_id: validationUser.users_id
      });
    } 
  } catch (error) {
    res.json({
      message: "Error al tratar de recuperar la informacion del usuario.",
    });
  }
});

router.patch("/api/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const { username, img, bio, fechaNacimiento } = req.body;

  try {
    // Este codigo lo que hace es actualizar o modificar las diferentes informaciones del perfil del usuario.
    const [rows] = await pool.query(
      "UPDATE users SET username = IFNULL(?, username), img = IFNULL(?, img), bio = IFNULL(?, bio), fechaNacimiento = IFNULL(?, fechaNacimiento) WHERE user_id = ?",
      [username, img, bio, fechaNacimiento, userId]
    );

    // Esta informacion sirve para cuando hay un error todo va bien mostrarlo al usuario.
    if (rows.affectedRows === 0) {
      res.status(404).json({
        message: "No se encontró ningun usuario",
      });
    } else {
      res.status(201).json({
        message:
          "Se a creado correctamente la informacion de perfil del usuario!",
      });
    }
  } catch (error) {
    res.json({
      message: "Error al tratar de actualizar el perfil del usuario.",
      error: error.message,
    });
  }
});

export default router;
