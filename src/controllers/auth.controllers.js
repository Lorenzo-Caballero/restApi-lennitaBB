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