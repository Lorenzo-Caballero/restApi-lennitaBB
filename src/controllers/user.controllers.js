import { pool } from "../db.js"

export const createUser = async (req, res) => {
    try {
        const { name, email, coins } = req.body;
        // Verificar si todos los campos necesarios están 
        if (!name || !email) {
            return res.status(400).json({
                message: "Todos los campos (name, email) son obligatorios"
            });
        }
        const [row] = await pool.query("INSERT INTO clientes(name, email, coins) VALUES(?, ?, ?)",
            [name, email, coins]);
        res.json({
            id: row.insertId,
            name,
            email,
            coins
        });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({
            message: "Error interno del servidor al crear usuario"
        });
    }
};

export const getUser = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM clientes");

        res.json(rows);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({
            message: "Error interno del servidor al obtener usuarios"
        });
    }
};


export const getUserById = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM clientes WHERE id = ?", [req.params.id]);

        if (rows.length <= 0) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error("Error al buscar usuario por ID:", error);
        res.status(500).json({
            message: "Error interno del servidor al buscar usuario por ID"
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id, name, email, coins } = req.body;

        // Verificar si el usuario existe antes de actualizar
        const [existingRows] = await pool.query("SELECT * FROM clientes WHERE id = ?", [id]);
        if (existingRows.length <= 0) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }
        // Actualizar el usuario
        await pool.query("UPDATE clientes SET name=?, email=?, coins=? WHERE id=?",
            [name, email, coins, id]);

        res.json({
            message: "Usuario actualizado correctamente"
        });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({
            message: "Error interno del servidor al actualizar usuario"
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        // Verifica si el usuario existe antes de eliminar
        const [existingRows] = await pool.query("SELECT * FROM users WHERE id = ?", [userId]);
        if (existingRows.length <= 0) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }
        // Eliminar el usuario
        await pool.query("DELETE FROM clientes WHERE id = ?", [userId]);
        res.json({
            message: "Usuario eliminado correctamente"
        });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({
            message: "Error interno del servidor al eliminar usuario"
        });
    }
};
