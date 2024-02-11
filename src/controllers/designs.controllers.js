import { pool } from "../db.js"

export const createDesigns = async (req, res) => {
    try {
        const { name, price, image } = req.body;
        if (!name || !price || !image) {
            return res.status(400).json({
                massage: "Todos los campos son obligatorios!"
            });
        }
        const [row] = await pool.query("INSERT INTO designs (name , price,image) VALUES (?, ?, ?)",
            [name, price, image]);
        res.json({
            id: row.insertId,
            name,
            image,
            price
        });
    } catch (error) {
        console.log("che salio re mal la creacion del diseño", error);
        res.status(500).json({
            massage: "Error interno del servidor al crear el diseño",
            error: error.massage
        });
    }

};

export const getDesigns = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM designs");

        res.json(rows);
    } catch (error) {
        console.error("Error al obtener designss:", error);
        res.status(500).json({
            message: "Error interno del servidor al obtener designss"
        });
    }
};


export const getDesignsById = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM designs WHERE id = ?", [req.params.id]);

        if (rows.length <= 0) {
            return res.status(404).json({
                message: "designs no encontrado"
            });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error("Error al buscar desings por ID:", error);
        res.status(500).json({
            message: "Error interno del servidor al buscar designs por ID"
        });
    }
};

export const updateDesigns = async (req, res) => {
    try {
        const { id, name, price } = req.body;

        // Verificar si el designs existe antes de actualizar
        const [existingRows] = await pool.query("SELECT * FROM designs WHERE id = ?", [id]);
        if (existingRows.length <= 0) {
            return res.status(404).json({
                message: "designs no encontrado"
            });
        }
        // Actualizar el designs
        await pool.query("UPDATE designs SET name=?, price=?=? WHERE id=?",
            [name, price, id]);

        res.json({
            message: "designs actualizado correctamente"
        });
    } catch (error) {
        console.error("Error al actualizar designs:", error);
        res.status(500).json({
            message: "Error interno del servidor al actualizar designs"
        });
    }
};

export const deleteDesigns = async (req, res) => {
    try {
        const DesignsId = req.params.id;
        const [existingRows] = await pool.query("SELECT * FROM designs WHERE id = ?", [DesignsId]);
        if (existingRows.length <= 0) {
            return res.status(404).json({
                message: "designs no encontrado"
            });
        }
        // Eliminar el designs
        await pool.query("DELETE FROM designs WHERE id = ?", [DesignsId]);
        res.json({
            message: "designs eliminado correctamente"
        });
    } catch (error) {
        console.error("Error al eliminar designs:", error);
        res.status(500).json({
            message: "Error interno del servidor al eliminar designs"
        });
    }
};
