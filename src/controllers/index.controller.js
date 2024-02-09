import { pool } from "../db.js";
import {config} from "dotenv"
import {KEY_AI}from "../config.js"

config()
export const ping =async (req, res) => {
   const API_KEY= KEY_AI;
  return  res.json(API_KEY)
}