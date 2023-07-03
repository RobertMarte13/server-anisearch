import { Router } from "express";
import pool from "../db.js";

const router = Router();

// Crear comentarios
router.post("/api/comment", async (req, res) => {
  const { comment, likes, comment_id, commentIdSubComment, fechaCreacion } =
    req.body;

  try {
    // Este codigo lo que hace es insertar datos en la base de datos y crear un comentario nueva.

    await pool.query(
      "INSERT INTO comments(comment, likes, comment_id, commentIdSubComment, fechaCreacion) VALUES (?, ?, ?, ?, ?)",
      [comment, likes, comment_id, commentIdSubComment, fechaCreacion]
    );

    res.status(201)
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal con tu consulta!",
      error: error,
    });
  }
});

// Obtener todos los comenatrios
router.get("/api/comment", async (req, res) => {
  try {

    // Este codigo lo que hace es seleccionar todas los comentarios y mostrarlos.
    const [rows] = await pool.query("SELECT username, comment, auth_id, commentIdSubComment FROM auth INNER JOIN comments ON auth_id = comment_id");
    const data = rows;

    const [rows_2] = await pool.query("SELECT username, comments, sub_comment_id, auth_comment_id, commentIdSubComment2 FROM auth INNER JOIN subcomts ON auth_id = auth_comment_id")

    const data_2 = rows_2

    // Este muestra los datos en formato json.
    res.json({
      data: [
        {
          comment: data,
          subcomment: data_2
        }
      ]
    });
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal con tu consulta!",
      error: error,
    });
  }
});

// Eliminar comentarios
router.delete("/api/comment/:id", async (req, res) => {
  try {

    // Este codigo lo que hace es eliminar comentarios por medio de la id que tiene en el servidor.
    const [rows] = await pool.query("DELETE FROM comments WHERE id = ?", [
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

// Modificar comentarios
router.patch("/api/comment/:id", async (req, res) => {
  // Aqui obtenemos todos las variables y la mas importante para poder actualizar un dato es id.
  const { id } = req.params;
  const { comment, likes } =
    req.body;

  try {

    // Este codigo lo que hace es actualizar un dato por medio del id con la peculiaridad de que si no se llena un campo lo que hace es dejar el valor anterio o dejarlo vacío.
    const [rows] = await pool.query(
      "UPDATE comments SET comment = IFNULL(?, comment), likes = IFNULL(?, likes) WHERE id = ?",
      [comment, likes, id]
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