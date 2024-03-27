import express from "express";
import usersRoutes from "../routes/users.routes.js";
import designsRoutes from "../routes/designs.routes.js";
import indexRoutes from "../routes/index.routes.js";
import cors from "cors";
import serverless from "serverless-http";
import bodyParser from 'body-parser';

const app = express();

// Middleware para habilitar CORS permitiendo solicitudes desde "cualquier origen
app.use(cors());

app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use("/.netlify/functions/app", indexRoutes);
app.use("/.netlify/functions/app", usersRoutes);
app.use("/.netlify/functions/app", designsRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: "faunotattoo: endpoint no encontrado:( Revisa la URL"
    });
});
export const handler = serverless(app);

