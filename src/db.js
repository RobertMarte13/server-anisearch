import { createPool } from "mysql2/promise";

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "RobertMarte123@",
    database: "anisearch",
    port: 3306
})

export default pool;