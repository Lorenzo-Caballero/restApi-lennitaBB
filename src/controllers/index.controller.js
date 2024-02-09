import { pool } from "../db.js";
import {config} from "dotenv"

config()

import { pool } from "../db.js";


export const ping = async (req, res) => {
  try {
    const client = await pool.connect();
    const rows = await client.query('SELECT key FROM api');
    res.json(rows);
    client.release();
    return res.json(rows);
  } catch (error) {
    console.error('Error al obtener la clave de la tabla "api":', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
