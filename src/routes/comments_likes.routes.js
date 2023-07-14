import {Router} from "express"
import pool from "../db.js"

const routes = Router()

// Crear likes
routes.post('/api/comments_likes', async (req, res) => {
    // Este codigo recibe el user_id o auth_id, el delete_id y el update_likes unico que servira para dar o quitar likes.
    const { users_id, comments_id, id_delete } = req.body;
    try {

        // Aqui le estamos indicando que cree en la base de datos con lo siguientes parametros un registro de los likes.
        await pool.query("INSERT INTO comment_likes(users_id, comments_id, id_delete) VALUES (?, ?, ?)", [users_id, comments_id, id_delete]);

        // Message que aparece como protocolo de que si se iso el like
        res.status(201).json({message: "success"})
    } catch (error) {
        console.log(error)
    }
})

// Mostrar likes
routes.get('/api/comments_likes', async (req, res) => {
    try {

        // Esta peticion a la base de datos es para que muestre los likes que se an dado y que tambien mande los id de los likes para comparar y buscar a que comentario pertenece.
        const [rows] = await pool.query("SELECT comments_id, COUNT(comments_id) AS like_count FROM comment_likes GROUP BY comments_id");

        const [rows_2] = await pool.query("SELECT * FROM comment_likes")

        res.json({
            data: rows,
            delete_data: rows_2
        })
    } catch (error) {
        res.json({
            message: error
        })
    }
})

// Eliminar likes
routes.delete('/api/comments_likes/:users_id', async (req, res) => {
    try {

        // Aqui usamos con una query params un id que solo tendra el usuario que iso el like para poder remover el like.
        await pool.query("DELETE FROM comment_likes WHERE users_id = ?", [req.params.users_id]);

        res.status(200).json({message: "Success"})
    } catch (error) {
        console.log(error)
    }
})

export default routes
