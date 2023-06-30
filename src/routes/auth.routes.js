import { Router } from "express";
import pool from "../db.js";

const router = Router();

// register 
router.post("/register", async (req, res) => {
    // Recuperando los datos que pasa el client
    const {username, password} = req.body;

    // Recuperando solo los username de la base de datos para compara y que no exista ya un nombre igual al que se intenta registrar.
    const data = await pool.query("SELECT username FROM auth");
    const users = data[0]
    // Comparando con un find que no alla un username igual en la base de datos
    const validationUserName = users.find(user => user.username === username)

    // Validacion que lo que hace es verificar que todo vaya bien y si todo va bien crea el registro del usuario nuevo
    if(!!!validationUserName) {
        const [rows] = await pool.query("INSERT INTO auth(username, password) VALUES (?, ?)", [username, password]);
        res.status(201).json({
            message: "success!!!"
        })
    } else {
        res.status(404).json({message: 'Your username is already taken!!'})
    }
})

// Login 


export default router;
