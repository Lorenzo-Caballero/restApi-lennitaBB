import express from "express";
import usersRoutes from "./routes/users.routes.js"
import designsRoutes from "./routes/designs.routes.js"
import indexRoutes from "./routes/index.routes.js"
import cors from "cors"
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.use(express.json())

app.use(indexRoutes)
app.use("/api",usersRoutes)
app.use("/api",designsRoutes)

app.use((req,res,next)=>{
    res.status(404).json({
        message:" faunotattoo: endpoint no encontrado:( Revisa la URL"
    })
})

export default app;