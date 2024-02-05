import { Router } from "express";
import { getUser,loginUser, createUser, updateUser, deleteUser, getUserById } from "../controllers/user.controllers.js";
const router = Router()

router.get("/clientes", getUser)

router.get("/clientes/:id", getUserById)

router.post("/clientes/login", loginUser)

router.post("/clientes", createUser)

router.put("/clientes/:id", updateUser)

router.delete("/clientes/:id", deleteUser)


export default router;