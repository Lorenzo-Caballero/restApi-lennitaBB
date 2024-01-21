import app from "./app.js"
import {PORT} from "./config.js"
const cors = require('cors');

// Configurar CORS
app.use(cors({
    origin: 'http://localhost:3000', // Permite solicitudes desde este dominio
    methods: 'POST', // Permite solicitudes POST
    allowedHeaders: 'Content-Type', // Permite el encabezado Content-Type
  }));
app.listen( PORT);
console.log("server esta corriendo en puerto ",PORT)