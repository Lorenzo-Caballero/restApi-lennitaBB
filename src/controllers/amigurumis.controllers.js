import sharp from 'sharp';
import { pool } from "../db.js";

export const createamigurumis = async (req, res) => {
    try {
        const { name, price } = req.body;
        let { image } = req.body;

        if (!name || !price || !image) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios!"
            });
        }

        // Reducir el tamaño de la imagen
        const compressedImage = await compressImage(image);
        
        // Guardar la imagen comprimida en la base de datos
        const [row] = await pool.query("INSERT INTO amigurumis (name, price, image) VALUES (?, ?, ?)", [name, price, compressedImage]);

        res.json({
            id: row.insertId,
            name,
            image: compressedImage,
            price
        });
    } catch (error) {
        console.log("Error al crear el diseño:", error);
        res.status(500).json({
            message: "Error interno del servidor al crear el diseño",
            error: error.message
        });
    }
};

// Función para comprimir la imagen utilizando sharp
const compressImage = async (image) => {
    try {
        // Procesar la imagen con sharp y reducir la calidad
        const compressedImageBuffer = await sharp(Buffer.from(image, 'base64'))
            .jpeg({ quality: 70 }) // Reducir la calidad al 70%
            .toBuffer();

        // Convertir la imagen comprimida a una cadena base64
        const compressedImage = compressedImageBuffer.toString('base64');

        return compressedImage;
    } catch (error) {
        throw new Error("Error al comprimir la imagen");
    }
};

export const getamigurumis = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM amigurumis");

        res.json(rows);
    } catch (error) {
        console.error("Error al obtener amigurumiss:", error);
        res.status(500).json({
            message: "Error interno del servidor al obtener amigurumiss"
        });
    }
};


export const getamigurumisById = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM amigurumis WHERE id = ?", [req.params.id]);

        if (rows.length <= 0) {
            return res.status(404).json({
                message: "amigurumis no encontrado"
            });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error("Error al buscar desings por ID:", error);
        res.status(500).json({
            message: "Error interno del servidor al buscar amigurumis por ID"
        });
    }
};

export const updateamigurumis = async (req, res) => {
    try {
        const { id, name, price } = req.body;

        // Verificar si el amigurumis existe antes de actualizar
        const [existingRows] = await pool.query("SELECT * FROM amigurumis WHERE id = ?", [id]);
        if (existingRows.length <= 0) {
            return res.status(404).json({
                message: "amigurumis no encontrado"
            });
        }
        // Actualizar el amigurumis
        await pool.query("UPDATE amigurumis SET name=?, price=?=? WHERE id=?",
            [name, price, id]);

        res.json({
            message: "amigurumis actualizado correctamente"
        });
    } catch (error) {
        console.error("Error al actualizar amigurumis:", error);
        res.status(500).json({
            message: "Error interno del servidor al actualizar amigurumis"
        });
    }
};

export const deleteamigurumis = async (req, res) => {
    try {
        const amigurumisId = req.params.id;
        const [existingRows] = await pool.query("SELECT * FROM amigurumis WHERE id = ?", [amigurumisId]);
        if (existingRows.length <= 0) {
            return res.status(404).json({
                message: "amigurumis no encontrado"
            });
        }
        // Eliminar el amigurumis
        await pool.query("DELETE FROM amigurumis WHERE id = ?", [amigurumisId]);
        res.json({
            message: "amigurumis eliminado correctamente"
        });
    } catch (error) {
        console.error("Error al eliminar amigurumis:", error);
        res.status(500).json({
            message: "Error interno del servidor al eliminar amigurumis"
        });
    }
};
