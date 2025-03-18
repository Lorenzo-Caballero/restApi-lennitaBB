import multer from "multer";
import sharp from "sharp";
import { pool } from "../db.js";

// Configurar multer para almacenar la imagen en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware para manejar la subida de imágenes
export const uploadMiddleware = upload.single("image");

export const createDesigns = async (req, res) => {
    try {
        const { name, price } = req.body;
        const file = req.file;

        if (!name || !price || !file) {
            return res.status(400).json({ message: "Todos los campos son obligatorios!" });
        }

        // Comprimir la imagen con sharp
        const compressedImageBuffer = await sharp(file.buffer)
            .jpeg({ quality: 70 })
            .toBuffer();

        // Convertir la imagen comprimida a Base64
        const compressedImageBase64 = compressedImageBuffer.toString("base64");

        // Crear el objeto JSON para almacenar la imagen
        const imageObject = {
            fileName: file.originalname,
            contentType: file.mimetype,
            size: file.size,
            data: compressedImageBase64, // Almacenar la imagen como base64 dentro del objeto
        };

        // Guardar en la base de datos (asegurate de que el campo 'image' sea de tipo JSON)
        const [row] = await pool.query(
            "INSERT INTO designs (name, price, image) VALUES (?, ?, ?)",
            [name, price, JSON.stringify(imageObject)] // Convertir el objeto JSON a cadena antes de guardarlo
        );

        res.json({
            id: row.insertId,
            name,
            price,
            image: imageObject, // Puedes devolver el objeto completo para facilitar la manipulación en el frontend
        });
    } catch (error) {
        console.error("Error al crear el diseño:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
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

        // Convertir los datos de la imagen desde JSON a un objeto para facilitar la manipulación
        const designs = rows.map((row) => {
            if (row.image) {
                row.image = JSON.parse(row.image); // Convertir la cadena JSON de nuevo a un objeto
            }
            return row;
        });

        res.json(designs);
    } catch (error) {
        console.error("Error al obtener designs:", error);
        res.status(500).json({
            message: "Error interno del servidor al obtener designs"
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

        const design = rows[0];
        if (design.image) {
            design.image = JSON.parse(design.image); // Convertir la cadena JSON de nuevo a un objeto
        }

        res.json(design);
    } catch (error) {
        console.error("Error al buscar designs por ID:", error);
        res.status(500).json({
            message: "Error interno del servidor al buscar designs por ID"
        });
    }
};

export const updateDesigns = async (req, res) => {
    try {
        const { id, name, price, image } = req.body;

        // Verificar si el design existe antes de actualizar
        const [existingRows] = await pool.query("SELECT * FROM designs WHERE id = ?", [id]);
        if (existingRows.length <= 0) {
            return res.status(404).json({
                message: "designs no encontrado"
            });
        }

        // Convertir la imagen recibida a JSON (si está presente)
        let updatedImage = image;
        if (updatedImage && typeof updatedImage === "string") {
            updatedImage = JSON.parse(updatedImage); // Si es cadena JSON, convertirlo a objeto
        }

        // Actualizar el diseño
        await pool.query("UPDATE designs SET name=?, price=?, image=? WHERE id=?",
            [name, price, updatedImage ? JSON.stringify(updatedImage) : null, id]);

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
        // Eliminar el diseño
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
