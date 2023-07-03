import { Router } from "express";
import pool from "../db.js";

const router = Router();

// Crear respuestas a comentarios
router.post("/api/subcomment", async (req, res) => {
  const { comments, likes, sub_comment_id, auth_comment_id, commentIdSubComment2, fechaCreacion } =
    req.body;

  try {
    // Este codigo lo que hace es insertar datos en la base de datos y crear un subcomentario nueva.
    await pool.query(
      "INSERT INTO subcomts(comments, likes, sub_comment_id, auth_comment_id, commentIdSubComment2, fechaCreacion) VALUES (?, ?, ?, ?, ?, ?)",
      [comments, likes, sub_comment_id, auth_comment_id, commentIdSubComment2, fechaCreacion]
    );

    res.status(201)
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal con tu consulta!",
      error: error,
    });
  }
});

// Obtener respuestas a comentarios
router.get("/api/subcomment", async (req, res) => {
  try {

    // Este codigo obtiene el nombre del usuario, el subcomentario y el id del usuario quien lo creo.
    const [rows] = await pool.query("SELECT username, comments, auth_id FROM auth INNER JOIN subcomts ON auth_id = auth_comment_id")

    const data = rows

    res.json({
      data: data
    });
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal con tu consulta!",
      error: error,
    });
  }
});

// Eliminar sub comentario
router.delete("/api/subcomment/:id", async (req, res) => {
  try {

    // Este codigo lo que hace es eliminar subcomentarios por medio de sub_comment_id que tiene en el servidor.
    const [rows] = await pool.query("DELETE FROM subcomts WHERE sub_comment_id = ?", [
      req.params.id,
    ]);

    // Si ninguna fila a sido affectada lo que hara es mandar un error al cliente disiendo que esa carta no a sido encontrada.
    if (rows.affectedRows <= 0) {
      res.status(404).json({
        message: "No se encontró el comentario!",
      });
    }

    // Este se muestra cuando se crea con exito un comentario.
    res.status(204).json({
      message: "Informacion borrada con exito!",
    });
  } catch (error) {
    // Este codigo me manda un error al client si si todo a salido mal.
    return res.status(500).json({
      message: "Algo salio mal con tu consulta!",
      error: error,
    });
  }
});

// Modificar sub comentario
router.patch("/api/subcomment/:id", async (req, res) => {
  // Aqui obtenemos todos las variables y la mas importante para poder actualizar un dato es id.
  const { id } = req.params;
  const { comments, likes, sub_comment_id, auth_comment_id } =
    req.body;

  try {

    // Este codigo lo que hace es actualizar un dato por medio del id con la peculiaridad de que si no se llena un campo lo que hace es dejar el valor anterio o dejarlo vacío.
    const [rows] = await pool.query(
      "UPDATE subcomts SET comments = IFNULL(?, comments), likes = IFNULL(?, likes), sub_comment_id = IFNULL(?, sub_comment_id),  auth_comment_id = IFNULL(?, auth_comment_id) WHERE id = ?",
      [comments, likes, sub_comment_id, auth_comment_id, id]
    );

    // Si ninguna fila a sido affectada lo que hara es mandar un error al cliente disiendo que esa carta no a sido encontrada.
    if (rows.affectedRows === 0) {
      res.status(404).json({
        message: "No se encontró el comentario",
      });
    }

    // Este se muestra cuando se actualiza con exito una carta.
    res.status(200).json({
      message: "Informacion actualizada con exito!",
    })
  } catch (error) {
    // Este codigo me manda un error al client si si todo a salido mal.
    return res.status(500).json({
      message: "Algo salio mal con tu consulta!",
      error: error,
    });
  }
});



export default router;