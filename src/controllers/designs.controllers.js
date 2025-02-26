import sharp from 'sharp';
import { pool } from "../db.js";

export const createDesigns = async (req, res) => {
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
        const [row] = await pool.query("INSERT INTO designs (name, price, image) VALUES (?, ?, ?)", [name, price, compressedImage]);

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
        console.error("Error al buscar designs por ID:", error);
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
        const designsId = req.params.id;
        const [existingRows] = await pool.query("SELECT * FROM designs WHERE id = ?", [designsId]);
        if (existingRows.length <= 0) {
            return res.status(404).json({
                message: "designs no encontrado"
            });
        }
        // Eliminar el designs
        await pool.query("DELETE FROM designs WHERE id = ?", [designsId]);
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
