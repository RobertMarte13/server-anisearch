import { Router } from "express";
import pool from "../db.js";

const router = Router();

router.post("/api/users", async (req, res) => {
  const { username, img, bio, fechaNacimiento, user_id } = req.body;

  const [rows] = await pool.query("SELECT username From users");
  const user = rows[0];

  const validationUserName = user.find((user) => user.username === username);

  if (!!!validationUserName) {
    await pool.query(
      "INSERT INTO users (username, img, bio, fechaNacimiento, user_id) VALUES (?, ?, ?, ?, ?)",
      [username, img, bio, fechaNacimiento, user_id]
    );
  } else {
    res.status(404).json({ message: "Your username is already taken!!" });
  }
});

router.get("/api/users/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * From users");
    const user = rows[0];

    const validationUser = user.find((user) => user.user_id === user_id);

    if(!!!validationUser) {
      res.json({
        user: validationUser.username,
        img: validationUser.img,
        bio: validationUser.bio,
        fechaNacimiento: validationUser.fechaNacimiento,
        user_id: validationUser.user_id,
      });
    } else {
      res.json({
        message: "Error al tratar de recuperar la informacion del usuario",
      });
    }

  } catch (error) {
    res.json({
      message: "Error al tratar de recuperar la informacion del usuario",
    });
  }
});

export default router;
