import { pool } from "../db.js";
import {config} from "dotenv"

config()


export const ping =async (req, res) => {
  const KEY_AI = process.env.API_KEY_AI;
  return  res.json(KEY_AI)
}