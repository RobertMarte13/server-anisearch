import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authindex from "./routes/auth.routes.js"


const app = express();

// Configurando __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

// Routes
app.use(authindex)

app.listen(3000)
console.log('Server listening on port 3000')