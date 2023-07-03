import { Router } from "express";
import pool from "../db.js";

const router = Router();

router.post("/api/users", async (req, res) => {
  const { username, img, bio, fechaNacimiento, user_id } = req.body;

  await pool.query(
    "INSERT INTO users(username, img, bio, fechaNacimiento, user_id) VALUES (?, ?, ?, ?, ?)",
    [username, img, bio, fechaNacimiento, user_id]
  );
});

router.get("/api/users/:userId", async (req, res) => {
  const { userId } = req.params;

  console.log(userId)

  try {
    const [rows] = await pool.query("SELECT * FROM users");

    const validationUser = rows.find((control) => control.user_id === userId);

    if(validationUser) {
      res.json({
        user: validationUser.username,
        img: validationUser.img,
        bio: validationUser.bio,
        fechaNacimiento: validationUser.fechaNacimiento,
        user_id: validationUser.user_id,
      });
    } else {
      res.json({
        message: "Error al tratar de recuperar la informacion del usuario"
      });
    }

  } catch (error) {
    res.json({
      message: "Error al tratar de recuperar la informacion del usuario",
    });
  }
});

export default router;
