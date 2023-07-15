import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authindex from "./routes/auth.routes.js"
import usersindex from "./routes/users.routes.js"
import searchusersindex from "./routes/searchUser.routes.js"
import creatercardsindex from "./routes/createcards.routes.js"
import commentindex from "./routes/comments.routes.js"
import subcommentindex from "./routes/sub_comment.routes.js"
import commentsLikes from "./routes/comments_likes.routes.js"
import followers from "./routes/follow.routes.js"

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
app.use(searchusersindex)
app.use(creatercardsindex)
app.use(commentindex)
app.use(subcommentindex)
app.use(commentsLikes)
app.use(followers)

app.listen(PORT)
console.log(`Server listening on port ${PORT}`)