import { pool } from "../db.js";

export const ping = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM api');
    res.json(rows[0].KEY_AI);
  } catch (error) {
    console.error('Error al obtener la clave de la tabla "api":', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
