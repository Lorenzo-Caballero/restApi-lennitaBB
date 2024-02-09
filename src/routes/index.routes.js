import { Router } from "express";
import {ping} from "../controllers/index.controller.js"
const router = Router()


router.get("/ai", ping)


export default router