import { Router } from "express";
import { getamigurumis, createamigurumis, updateamigurumis, deleteamigurumis, getamigurumisById } from "../controllers/amigurumis.controllers.js";
const router = Router()

router.get("/amigurumis", getamigurumis)

router.get("/amigurumis/:id", getamigurumisById)


router.post("/amigurumis", createamigurumis)

router.put("/amigurumis/:id", updateamigurumis)

router.delete("/amigurumis/:id", deleteamigurumis)


export default router;