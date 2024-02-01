// Importa los paquetes necesarios
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Controlador para el inicio de sesión
export const login = async (req, res) => {
    const { email, password } = req.body;

    // Busca el usuario en la base de datos por su correo electrónico
    const [rows] = await pool.query('SELECT * FROM clientes WHERE email = ?', [email]);
    const user = rows[0];

    // Verifica si el usuario existe y si la contraseña coincide
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Genera un token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, 'secret_key', { expiresIn: '1h' });

    // Envía el token JWT al cliente como respuesta
    res.json({ token });
};

// Modifica el controlador createUser para hashear la contraseña antes de almacenarla en la base de datos
export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10); // Hashea la contraseña

        // Inserta el usuario en la base de datos con la contraseña hasheada
        const [row] = await pool.query("INSERT INTO clientes(name, email, password) VALUES(?, ?, ?)",
            [name, email, hashedPassword]);
        
        // Envía la respuesta al cliente
        res.json({
            id: row.insertId,
            name,
            email
        });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({
            message: "Error interno del servidor al crear usuario",
            error: error.message
        });
    }
};
