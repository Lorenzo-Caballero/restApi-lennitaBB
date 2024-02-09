import { pool } from "../db.js";
import { config } from "dotenv";
config()
export const ping =async (req, res) => {
  return  res.json(process.env.KEY_AI)
}