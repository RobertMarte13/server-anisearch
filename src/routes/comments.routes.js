import { Router } from "express";
import pool from "../db.js";

const router = Router();

// Crear comentarios
router.post("/api/comment", async (req, res) => {
  const { comment, likes, comment_id, commentIdSubComment, delete_id } =
    req.body;

  const fechaCreacion = new Date().toLocaleString();

  try {
    // Este codigo lo que hace es insertar datos en la base de datos y crear un comentario nueva.

    await pool.query(
      "INSERT INTO comments(comment, likes, comment_id, commentIdSubComment, fechaCreacion, delete_id) VALUES (?, ?, ?, ?, ?, ?)",
      [
        comment,
        likes,
        comment_id,
        commentIdSubComment,
        fechaCreacion,
        delete_id,
      ]
    );

    res.status(201);
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal con tu consulta!",
      error: error,
    });
  }
});

// Obtener todos los comentarios
router.get("/api/comment", async (req, res) => {
  try {
    // Este codigo lo que hace es seleccionar todas los comentarios y mostrarlos.
    const [rows] = await pool.query(
      "SELECT comments_id, username, img, user_id, comment, commentIdSubComment, delete_id, created_at FROM users INNER JOIN comments ON user_id = comment_id"
    );

    const data = rows;
    const comment = [];

    // Este for sirve para organizar los comments de mas reciente a mas viejos
    for (let i = data.length; i > 0; i--) {
      comment.push(data[i - 1]);
    }

    console.log(comment)

    const [rows_2] = await pool.query(
      "SELECT user_id, username, img, comments, sub_comment_id, auth_comment_id, commentIdSubComment2, sub_delete_id, created_at FROM users INNER JOIN subcomts ON user_id = auth_comment_id"
    );

    const data_2 = rows_2;
    const comment_2 = [];

    // Este for sirve para organizar los comments de mas reciente a mas viejos
    for (let i = data_2.length; i > 0; i--) {
      comment_2.push(data_2[i - 1]);
    }

    console.log(comment_2);

    // Este muestra los datos en formato json.
    res.json({
      data: [
        {
          comment: comment,
          subcomment: comment_2,
        },
      ],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal con tu consulta!",
      error: error,
    });
  }
});

// Eliminar comentarios
router.delete("/api/comment/:delete_id", async (req, res) => {
  try {
    // Este codigo lo que hace es eliminar comentarios por medio de la id que tiene en el servidor.
    const [rows] = await pool.query(
      "DELETE FROM comments WHERE delete_id = ?",
      [req.params.delete_id]
    );

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
router.patch("/api/comment/:delete_id", async (req, res) => {
  // Aqui obtenemos todos las variables y la mas importante para poder actualizar un dato es id.
  const { delete_id } = req.params;
  const { comment, likes } = req.body;

  try {
    // Este codigo lo que hace es actualizar un dato por medio del id con la peculiaridad de que si no se llena un campo lo que hace es dejar el valor anterio o dejarlo vacío.
    const [rows] = await pool.query(
      "UPDATE comments SET comment = IFNULL(?, comment), likes = IFNULL(?, likes) WHERE delete_id = ?",
      [comment, likes, delete_id]
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
    });
  } catch (error) {
    // Este codigo me manda un error al client si si todo a salido mal.
    return res.status(500).json({
      message: "Algo salio mal con tu consulta!",
      error: error,
    });
  }
});

export default router;
