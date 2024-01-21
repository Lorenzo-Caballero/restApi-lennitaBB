import express from "express";
import usersRoutes from "./routes/users.routes.js"
import indexRoutes from "./routes/index.routes.js"

const app = express();

app.use(express.json())

app.use(indexRoutes)
app.use("/api",usersRoutes)
import cors from "cors"

app.use(cors({
    origin: 'http://localhost:3000', // Permite solicitudes desde este dominio
    methods: 'POST', // Permite solicitudes POST
    allowedHeaders: 'Content-Type', // Permite el encabezado Content-Type
  }));
app.use((req,res,next)=>{
    res.status(404).json({
        message:" faunotattoo: endpoint no encontrado:( Revisa la URL"
    })
})

export default app;