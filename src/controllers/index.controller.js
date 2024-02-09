import { pool } from "../db.js";
import {config} from "dotenv"

config()
export const ping =async (req, res) => {
  API_KEY= process.env.API-KEY-AI;
  return  res.json(API_KEY)
}