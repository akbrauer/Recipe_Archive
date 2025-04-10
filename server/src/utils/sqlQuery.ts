// Node File System
import fs from "node:fs";
import dotenv from "dotenv";
import { Client, Pool } from "pg";
import { initTestDB, deleteTestDB, deleteRecipeDB, test, initTables, firstRecipe, firstIngredients } from "./queries";
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
dotenv.config();
const pgConfig = {
    user: PGUSER,
    password: PGPASSWORD,
    host: PGHOST,
    database: PGDATABASE,
    port: 5432,
    ssl: true,
}

const pool = new Pool(pgConfig);

async function sqlQuery() {
    //pool.query runs a single query on the database and has no need to check out or release a client. Use this exclusively unless you explicitly need a transaction.
    const query = firstIngredients;
    const sql = query.replace('    ', '');
    try {
        const result = await pool.query(sql);
        console.log(result.rows);
    } catch(error){
        console.log(error);
    };
};

sqlQuery();

// const client = new Client(pgConfig);

// const connectdb = async (client: Client) => {
//     await client.connect();
//     const res = await client.query(`SELECT * FROM playing_with_neon`);
//     console.log(res);
//     await client.end();
// }

// connectdb(client);

// async function getPgVersion() {
//     //connect/release only used when multiple clients are needed
//     const client = await pool.connect();
//     try {
//         const result = await client.query('SELECT version()');
//         console.log(result.rows[0]);
//     } finally {
//         client.release();
//     };
// };
// getPgVersion();