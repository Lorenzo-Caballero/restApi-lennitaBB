import { Router } from "express";
import { getDesigns,uploadMiddleware, createDesigns, updateDesigns, deleteDesigns, getDesignsById } from "../controllers/designs.controllers.js";
const router = Router()

app.post("/api/designs", uploadMiddleware, createDesigns);

router.get("/designs", getDesigns)

router.get("/designs/:id", getDesignsById)


router.post("/designs", createDesigns)

router.put("/designs/:id", updateDesigns)

router.delete("/designs/:id", deleteDesigns)


export default router;