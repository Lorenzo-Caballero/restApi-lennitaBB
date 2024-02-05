import express from "express";
import usersRoutes from "./routes/users.routes.js";
import designsRoutes from "./routes/designs.routes.js";
import indexRoutes from "./routes/index.routes.js";
import cors from "cors";

const app = express();

// Middleware para habilitar CORS permitiendo solicitudes desde cualquier origen
app.use(cors());

app.use(express.json());

app.use(indexRoutes);
app.use("/api", usersRoutes);
app.use("/api", designsRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: "faunotattoo: endpoint no encontrado:( Revisa la URL"
    });
});

export default app;
