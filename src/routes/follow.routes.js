import { Router } from "express";
import pool from "../db.js";

const router = Router();

// Este es para crear un follower
router.post("/api/follower", async (req, res) => {
  // De aqui saco la informacion que nesecito para poder crear el follow
  const { users_id, user_id, delete_id } = req.body;

  try {
    if (users_id !== user_id) {
      // Creamos la peticion a la base de datos.
      await pool.query(
        "INSERT INTO follow(users_id, user_id, delete_id) VALUE (?, ?, ?)",
        [users_id, user_id, delete_id]
      );

      res.status(201).json({
        message: "sucess!",
      });
    } else {
      res.status(404).json({
        message: "Error al dar un follow!",
      });
    }
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

// Con este obtenemos los follow
router.get("/api/follower", async (req, res) => {
  try {
    // Este me selecciona todos los users_id que siguen a un user para despues agruparlos  contarlos todos.
    const [rows] = await pool.query(
      "SELECT users_id, COUNT(users_id) AS follow_count FROM follow GROUP BY users_id"
    );
    // Este me selecciona todo para luego poder saber cual borro y cual no.
    const [rows_2] = await pool.query("SELECT * FROM follow");

    res.json({
      data: rows,
      data_2: rows_2,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

// Con este elimino por medio de la id especial que tengo para quitar follower.
router.delete("/api/follower/:delete_id", async (req, res) => {
  try {
    // Esta peticion es para eliminar followers a personas que no quiero seguir.
    await pool.query("DELETE FROM follow WHERE delete_id = ?", [
      req.params.delete_id,
    ]);

    res.status(200).json({
      message: "sucess!",
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

export default router;
