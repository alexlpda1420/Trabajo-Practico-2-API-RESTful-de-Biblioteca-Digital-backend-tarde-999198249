import {Schema, model, Document} from "mongoose";
import { IBook } from "../interfaces/Ibook";

// Extendemos Document para que Mongoose sepa que esto es un documento de Mongo
export interface BookDocument extends IBook, Document {}


// Esquema de Mongoose para la coleccion books

const BookSchema = new Schema<BookDocument>(
    {
        title: {
            type: String,
            required: true, // Campo obligatorio
            unique: true, // No puede haber dos libros con el mismo titulo
            trim: true // Elimina espacios al inicio y al final
        },
        author: {
            type: String,
            required: true,
            trim: true
        },
        publishedYear:{
            type: Number
        },
        genre: {
            type: String,
            trim: true
        },
        available:{
            type: Boolean,
            default: true // Por defecto el libro esta Disponible
        }
    },
    {
        timestamps: true // Agrega createdAt y updateAt automaticamente
    }

)

export const Book = model<BookDocument>("Book", BookSchema);
