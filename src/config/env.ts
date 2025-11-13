import process from "node:process";

process.loadEnvFile?.();

export const PORT = process.env.PORT ?? "3000";
export const MONGODB_URI = process.env.MONGODB_URI ?? "";

if (!MONGODB_URI){
    console.error("❌ MONGODB_URI no está definida en el archivo .env");
    process.exit(1);
}

