import { pool } from "../db.js";
import {config} from "dotenv"

config()

import { pool } from "../db.js";


export const ping = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT key FROM api');
    const apiKey = result.rows[0].KEY_AI;
    client.release();
    return res.json(apiKey);
  } catch (error) {
    console.error('Error al obtener la clave de la tabla "api":', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
