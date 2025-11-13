import process from "node:process";

process.loadEnvFile?.();
// Puerto donde se va a levantar el servidor
export const PORT = process.env.PORT ?? "3000";
// URI de conexión a MongoDB
export const MONGODB_URI = process.env.MONGODB_URI ?? "";

if (!MONGODB_URI){
    console.error("❌ MONGODB_URI no está definida en el archivo .env");
    process.exit(1);
}

