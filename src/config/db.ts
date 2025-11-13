import mongoose  from "mongoose";
import { MONGODB_URI } from "./env";

// Función que se encarga de conectar a la base de datos
export const connectDB = async(): Promise<void> => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("✅ Conectado a MongoDB")
        
    } catch (error) {
        console.error("❌ Error al conectar a MongoDB:", error);
        process.exit(1);
    }
}