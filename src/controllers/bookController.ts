// src/controllers/bookController.ts
import { Request, Response } from "express";
import mongoose from "mongoose";
import { Book } from "../models/BookModel";
import { successResponse, errorResponse } from "../utils/apiResponse";
import { IBook } from "../interfaces/Ibook"
// GET /books - listar todos los libros
export const getBooks = async (_req: Request, res: Response): Promise<void> => {
  try {
    const books = await Book.find(); // buscamos todos los libros
    res.status(200).json(successResponse(books, "Listado de libros"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse("Error al obtener los libros", error));
  }
};

// GET /books/:id - obtener un libro por ID
export const getBookById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Validamos que el ID tenga formato de ObjectId de Mongo
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json(errorResponse("ID inválido"));
    return;
  }

  try {
    const book = await Book.findById(id);

    if (!book) {
      res.status(404).json(errorResponse("Libro no encontrado"));
      return;
    }

    res.status(200).json(successResponse(book, "Libro encontrado"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse("Error al obtener el libro", error));
  }
};

// POST /books - crear un nuevo libro
export const createBook = async (req: Request, res: Response): Promise<void> => {
  const { title, author, publishedYear, genre, available } = req.body as IBook;

  // Validación básica de campos requeridos
  if (!title || !author) {
    res
      .status(400)
      .json(errorResponse("Los campos 'title' y 'author' son obligatorios"));
    return;
  }

  try {
    // Verificamos si ya existe un libro con el mismo título
    const existingBook = await Book.findOne({ title });
    if (existingBook) {
      res
        .status(409)
        .json(errorResponse("Ya existe un libro con ese título"));
      return;
    }

    // Creamos instancia del modelo Book
    const newBook = new Book({
      title,
      author,
      publishedYear,
      genre,
      available
    });

    // Guardamos en la base de datos
    const savedBook = await newBook.save();

    res
      .status(201)
      .json(successResponse(savedBook, "Libro creado correctamente"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse("Error al crear el libro", error));
  }
};

// PATCH /books/:id - actualizar un libro existente
export const updateBook = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json(errorResponse("ID inválido"));
    return;
  }

  // Solo permitimos actualizar estos campos
  const allowedFields: (keyof IBook)[] = [
    "title",
    "author",
    "publishedYear",
    "genre",
    "available"
  ];

  const updateData: Partial<IBook> = {};

  // Filtramos el body para no actualizar campos desconocidos
  for (const field of allowedFields) {
    if (field in req.body) {
      (updateData as any)[field] = req.body[field];
    }
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
      new: true // devuelve el documento actualizado
    });

    if (!updatedBook) {
      res.status(404).json(errorResponse("Libro no encontrado"));
      return;
    }

    res
      .status(200)
      .json(successResponse(updatedBook, "Libro actualizado correctamente"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse("Error al actualizar el libro", error));
  }
};

// DELETE /books/:id - eliminar un libro
export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json(errorResponse("ID inválido"));
    return;
  }

  try {
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      res.status(404).json(errorResponse("Libro no encontrado"));
      return;
    }

    res
      .status(200)
      .json(successResponse(deletedBook, "Libro eliminado correctamente"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse("Error al eliminar el libro", error));
  }
};
