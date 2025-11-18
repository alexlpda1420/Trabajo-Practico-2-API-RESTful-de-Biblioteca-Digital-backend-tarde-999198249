// src/routes/bookRoutes.ts
import { Router } from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from "../controllers/bookController";

// Creamos un router de Express para agrupar las rutas de libros
const router = Router();

// GET /books
router.get("/books", getBooks);

// GET /books/:id
router.get("/books/:id", getBookById);

// POST /books
router.post("/books", createBook);

// PATCH /books/:id
router.patch("/books/:id", updateBook);

// DELETE /books/:id
router.delete("/books/:id", deleteBook);

export default router;
