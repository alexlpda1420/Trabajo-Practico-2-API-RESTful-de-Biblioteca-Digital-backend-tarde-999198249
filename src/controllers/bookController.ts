import { Request, Response } from "express";
import mongoose from "mongoose";
import { BookModel } from "../models/BookModel";
import { successResponse, errorResponse } from "../utils/apiResponse";
import { IBook } from "../interfaces/Ibook";

// GET /Books - Listar todos los libros

export const getBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        const books = await BookModel.find(); // buscar los libros
        res.status(200).json(successResponse(books, "Listado de Libros"));
    } catch (error) {
        res.status(500).json(errorResponse("Error al consultar los libros", error));
    }
}

