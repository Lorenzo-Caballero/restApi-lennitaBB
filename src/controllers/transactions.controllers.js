// transactions.controller.js
import { pool } from "../db.js";

export const createTransaction = async (req, res) => {
    try {
        const { userId, amount, type, description } = req.body;
        if (!userId || !amount || !type) {
            return res.status(400).json({
                message: "Todos los campos (userId, amount, type) son obligatorios"
            });
        }
        
        const [row] = await pool.query(
            "INSERT INTO transactions (userId, amount, type, description) VALUES (?, ?, ?, ?)",
            [userId, amount, type, description]
        );
        res.json({
            transactionId: row.insertId,
            userId,
            amount,
            type,
            description
        });
    } catch (error) {
        console.error("Error al crear transacción:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getTransactions = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM transactions");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener transacciones:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getTransactionsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const [rows] = await pool.query("SELECT * FROM transactions WHERE userId = ?", [userId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "No hay transacciones para este usuario" });
        }
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener transacciones por usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

