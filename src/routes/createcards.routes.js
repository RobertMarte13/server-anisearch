import { Router } from "express";
import pool from "../db.js";

const router = Router();

// Crear cartas de personajes
router.post("/api/create_cards", async (req, res) => {
  const { firstname, lastname, age, high, animename, estudio, creador, img } =
    req.body;

  try {
    // Este codigo lo que hace es insertar datos en la base de datos y crear una carta nueva donde estara la información de los personajes.
    await pool.query(
      "INSERT INTO createcards(firstname, lastname, age, high, animename, estudio, creador, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [firstname, lastname, age, high, animename, estudio, creador, img]
    );

    // Este mensaje aparecera cuando se cree con exito una carta.
    res.status(201).json({
      message: "cards create succes!!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal con tu consulta!",
      error: error,
    });
  }
});

// Obtener todas las cartas
router.get("/api/create_cards", async (req, res) => {
  try {
    // Este codigo lo que hace es seleccionar todas las carta y mostrarlas.
    const [rows] = await pool.query("SELECT * FROM createcards");
    const data = rows;

    // Este muestra los datos en formato json.
    res.json({
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal con tu consulta!",
      error: error,
    });
  }
});

// Eliminar cartas
router.delete("/api/create_cards/:id", async (req, res) => {
  try {
    // Este codigo lo que hace es eliminar cartas por medio de la id que tiene en el servidor.
    const [rows] = await pool.query("DELETE FROM createcards WHERE id = ?", [
      req.params.id,
    ]);

    // Si ninguna fila a sido affectada lo que hara es mandar un error al cliente disiendo que esa carta no a sido encontrada.
    if (rows.affectedRows <= 0) {
      res.status(404).json({
        message: "No se encontró la carta!",
      });
    }

    // Este se muestra cuando se crea con exito una carta.
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

// Modificar cartas
router.patch("/api/create_cards/:id", async (req, res) => {
  // Aqui obtenemos todos las variables y la mas importante para poder actualizar un dato es id.
  const { id } = req.params;
  const { firstname, lastname, age, high, animename, estudio, creador, img } =
    req.body;

  try {

    // Este codigo lo que hace es actualizar un dato por medio del id con la peculiaridad de que si no se llena un campo lo que hace es dejar el valor anterio o dejarlo vacío.
    const [rows] = await pool.query(
      "UPDATE createcards SET firstname = IFNULL(?, firstname), lastname = IFNULL(?, lastname), age = IFNULL(?, age), high = IFNULL(?, high), animename = IFNULL(?, animename), estudio = IFNULL(?, estudio), creador = IFNULL(?, creador), img = IFNULL(?, img) WHERE id = ?",
      [firstname, lastname, age, high, animename, estudio, creador, img, id]
    );

    // Si ninguna fila a sido affectada lo que hara es mandar un error al cliente disiendo que esa carta no a sido encontrada.
    if (rows.affectedRows === 0) {
      res.status(404).json({
        message: "No se encontró el empleado",
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
