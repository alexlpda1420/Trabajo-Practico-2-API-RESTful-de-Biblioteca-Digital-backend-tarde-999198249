// src/index.ts
import express, { Application, Request, Response } from "express";
import { connectDB } from "./config/db";
import { PORT } from "./config/env";
import bookRoutes from "./routes/bookRoutes";

// Creamos la aplicación de Express
const app: Application = express();

// Middleware para poder leer JSON en el body de las requests
app.use(express.json());

// Ruta simple para verificar que la API responde
app.get("/", (_req: Request, res: Response) => {
  res.send("API Biblioteca Digital funcionando ✅");
});

// Montamos las rutas de libros bajo el prefijo /api
app.use("/api", bookRoutes);

// Función que inicia la app: conecta a la BD y levanta el servidor
const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  });
};

// Ejecutamos el arranque y manejamos errores
startServer().catch((error) => {
  console.error("Error al iniciar la aplicación:", error);
});
