import {Router} from "express"
import pool from "../db.js"

const routes = Router()

// Crear likes
routes.post('/api/comments_likes', async (req, res) => {
    // Este codigo recibe el user_id o auth_id, el delete_id y el update_likes unico que servira para dar o quitar likes.
    const { user_id, delete_id, update_likes } = req.body;
    try {

        // Aqui le estamos indicando que cree en la base de datos con lo siguientes parametros un registro de los likes.
        await pool.query("INSERT INTO comments_likes(user_id, delete_id, update_likes) VALUES (?, ?, ?)", [user_id, delete_id, update_likes]);

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
        const [rows] = await pool.query("SELECT delete_id, COUNT(*) AS like_count FROM comments_likes GROUP BY delete_id");

        res.json({
            data: rows
        })
    } catch (error) {
        console.log(error)
    }
})

// Eliminar likes
routes.delete('/api/comments_likes/:update_likes', async (req, res) => {
    try {

        // Aqui usamos con una query params un id que solo tendra el usuario que iso el like para poder remover el like.
        await pool.query("DELETE FROM comments_likes WHERE update_likes = ?", [req.params.update_likes]);

        res.status(200).json({message: "Success"})
    } catch (error) {
        console.log(error)
    }
})

export default routes
