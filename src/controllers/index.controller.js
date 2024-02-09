import { pool } from "../db.js";
import {config} from "dotenv"

config()
export const ping =async (req, res) => {
  API_KEY=shared.API_KEY;
  return  res.json(API_KEY)
}