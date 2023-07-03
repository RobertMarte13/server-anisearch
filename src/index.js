import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authindex from "./routes/auth.routes.js"
import usersindex from "./routes/users.routes.js"
import creatercardsindex from "./routes/createcards.routes.js"
import commentindex from "./routes/comments.routes.js"
import subcommentindex from "./routes/sub_comment.routes.js"

import { PORT } from "./config.js"

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
app.use(usersindex)
app.use(creatercardsindex)
app.use(commentindex)
app.use(subcommentindex)

app.listen(PORT)
console.log(`Server listening on port ${PORT}`)