import dotenv from "dotenv";
dotenv.config();
import pg, { Pool as PoolType } from "pg";
const {Pool} = pg;

let connection: PoolType;

try{
    connection = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        }
    });
} catch (err) {
    console.log("Erro ao conectar no banco de dados: ", err);
    
}

export {
    connection
}