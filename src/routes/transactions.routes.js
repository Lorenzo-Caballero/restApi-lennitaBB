// transactions.routes.js
import { Router } from "express";
import { createTransaction, getTransactions, getTransactionsByUser } from "../controllers/transactions.controller.js";
const router = Router();

router.post("/transactions", createTransaction);
router.get("/transactions", getTransactions);
router.get("/transactions/:userId", getTransactionsByUser);

export default router;
