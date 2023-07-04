import { Router } from "express";
import pool from "../db.js";

const router = Router();

// Para obtener usuarios por medio de un id.
router.get("/api/search_userid/:user_id", async (req, res) => {

  // Id al darte click al nombre del usuario.
  const { user_id } = req.params;

  try {

    // Buscamos en la base de datos el usuario con el id que necesitamos.
    const [rows] = await pool.query("SELECT * FROM users WHERE user_id = ?", [
      user_id,
    ]);

    const data = rows[0]

    // Aqui verificamos que si exista ese usuario.
    if(data !== undefined) {
      res.json([data]);
    } else {
      res.json({
        message: "Error! No user found!"
      });
    }
    
    
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Para obtener usuario por medio de su username
router.get("/api/search_username/:username", async (req, res) => {

  // Nombre del usuario que queremos ver
  const { username } = req.params;

  try {

    // Buscamos en la base de datos el usuario con el username que necesitamos.
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    const data = rows[0]

    // Aqui verificamos que si exista ese usuario.
    if(data !== undefined) {
      res.json([data]);
    } else {
      res.json({
        message: "Error! No user found!"
      });
    }
    
    
  } catch (error) {
    res.json({ message: error.message });
  }
});

export default router;