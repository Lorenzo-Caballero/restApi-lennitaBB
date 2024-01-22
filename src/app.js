import express from "express";
import usersRoutes from "./routes/users.routes.js"
import indexRoutes from "./routes/index.routes.js"
import cors from "cors"
const app = express();

app.use((req,res,next)=>{
    res.append("Access-Control-Allow-Origin",["*"]);
    res.append("Access-Control-Allow-Origin","GET,PUT,POST,DELETE");
    res.append("Access-Control-Allow-Origin","Content-Type");
    next()
});

app.use(express.json())

app.use(indexRoutes)
app.use("/api",usersRoutes)


app.use((req,res,next)=>{
    res.status(404).json({
        message:" faunotattoo: endpoint no encontrado:( Revisa la URL"
    })
})

export default app;