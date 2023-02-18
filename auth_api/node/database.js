import mysql from 'mysql2';
import * as dotenv from 'dotenv';

dotenv.config();

//DB connection fron env variables
const pool = mysql.createPool({
    host: process.env.DB_ENDPOINT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

//Get and export values from DB
export async function getQuery(username){
    const [results] = await pool.query(`
    SELECT *
    FROM ${process.env.DB_TABLE}
    WHERE username = ?
    `, [username])
    return results
};