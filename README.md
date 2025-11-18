# 📚 API RESTful de Biblioteca Digital

Trabajo práctico de la materia **Fullstack Web Developer – UTN**.  
El objetivo es construir una **API RESTful** para gestionar una colección de libros usando:

- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB + Mongoose**
- **Patrón MVC**
- Cliente de pruebas: **Bruno**

---

## 🧩 Descripción del proyecto

Esta API permite gestionar libros de una biblioteca digital.  
Incluye las operaciones básicas **CRUD** sobre el modelo `Book`:

- Crear libros
- Listar libros
- Obtener un libro por ID
- Actualizar un libro
- Eliminar un libro

La API está desarrollada con **TypeScript**, organizada bajo el patrón **MVC** y utiliza **MongoDB** como base de datos no relacional.

---
## 🛠️ Tecnologías utilizadas

- **Node.js 22+**
- **TypeScript**
- **Express**
- **MongoDB**
- **Mongoose**
- **process.loadEnvFile()** para variables de entorno
- **Git** para control de versiones

---

## 🧱 Modelo `Book`

El modelo `Book` representa un libro en la biblioteca y tiene los siguientes campos:

| Campo          | Tipo    | Requerido | Detalles                         |
|----------------|---------|-----------|----------------------------------|
| `title`        | string  | ✅        | Único, sin espacios extra        |
| `author`       | string  | ✅        | Autor del libro                  |
| `publishedYear`| number  | ❌        | Año de publicación               |
| `genre`        | string  | ❌        | Género literario                 |
| `available`    | boolean | ❌        | Por defecto `true`               |

---
## 📁 Estructura del proyecto

```bash
src/
├── config/
│   ├── db.ts          # Conexión a MongoDB
│   └── env.ts         # Variables de entorno (process.loadEnvFile)
├── controllers/
│   └── bookController.ts   # Lógica de negocio de libros
├── interfaces/
│   └── book.interface.ts   # Interface TypeScript de Book
├── models/
│   └── Book.ts        # Esquema y modelo Mongoose
├── routes/
│   └── bookRoutes.ts  # Rutas /books
├── utils/
│   └── apiResponse.ts # Formato estándar de respuestas
└── index.ts           # Punto de entrada de la aplicación
```
---
## ⚙️ Requisitos previos

- Antes de iniciar, necesitás tener instalado:

- Node.js 22 o superior (requerido para process.loadEnvFile())

- npm

- MongoDB (local o en la nube, por ejemplo MongoDB Atlas)

- Git
---

## 🚀 Instalación y ejecución

1. Clonar el repositorio

``` bash
git clone <URL_DEL_REPOSITORIO>
cd biblioteca-api

```
2. Instalar dependencias

``` bash
npm install

```
3. Configurar variables de entorno

Crear un archivo .env en la raíz del proyecto:

``` env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/biblioteca

```

4. Ejecutar en modo desarrollo
``` bash
npm run dev

```
Esto levanta el servidor con ts-node-dev y recarga automática.

5. Ejecutar compilado (modo “producción local”)
``` bash
npm run build
npm start
```
6. Verificar que el servidor responda
``` text
GET http://localhost:3000/
```
Deberías ver un mensaje similar a:

``` text
API Biblioteca Digital funcionando ✅
```
---
## 🌐 Endpoints disponibles
Todos los endpoints están bajo el prefijo:
``` text
http://localhost:3000/api
```
## 📚 Rutas de libros

| Método | Ruta         | Descripción                   |
| ------ | ------------ | ----------------------------- |
| GET    | `/books`     | Listar todos los libros       |
| GET    | `/books/:id` | Obtener un libro por ID       |
| POST   | `/books`     | Crear un nuevo libro          |
| PATCH  | `/books/:id` | Actualizar un libro existente |
| DELETE | `/books/:id` | Eliminar un libro             |

---
## 🧪 Pruebas con Bruno (cliente de API)
Base URL
``` text
http://localhost:3000/api
```
1️⃣ Crear un libro – POST /books
URL:
``` text
POST http://localhost:3000/api/books
```
Body (JSON):
``` json
{
  "title": "El nombre del viento",
  "author": "Patrick Rothfuss",
  "publishedYear": 2007,
  "genre": "Fantasía"
}
```

2️⃣ Listar todos los libros – GET /books
``` text
GET http://localhost:3000/api/books
```
3️⃣ Obtener un libro por ID – GET /books/:id
``` text
GET http://localhost:3000/api/books/ID_DEL_LIBRO
```
Ejemplo:
``` text
GET http://localhost:3000/api/books/67890abcdef1234567890abc
```
4️⃣ Actualizar un libro – PATCH /books/:id

``` text
PATCH http://localhost:3000/api/books/ID_DEL_LIBRO
``` 
Body (JSON) de ejemplo:

``` json
{
  "available": false
}
```
5️⃣ Eliminar un libro – DELETE /books/:id
``` text
DELETE http://localhost:3000/api/books/ID_DEL_LIBRO
```
## 📦 Formato estándar de respuestas

Todas las respuestas de la API siguen el mismo formato, tanto para éxito como para error.

✅ Respuesta exitosa

``` json
{
  "success": true,
  "message": "Libro creado correctamente",
  "data": {
    "_id": "67890abcdef1234567890abc",
    "title": "El nombre del viento",
    "author": "Patrick Rothfuss",
    "publishedYear": 2007,
    "genre": "Fantasía",
    "available": true,
    "createdAt": "2025-11-18T18:30:00.123Z",
    "updatedAt": "2025-11-18T18:30:00.123Z"
  }
}
```
❌ Respuesta de error

```json 
{
  "success": false,
  "message": "Libro no encontrado",
  "error": "..."
}
```
## 🧠 Patrón MVC aplicado

* Modelo (models/Book.ts)
Define el esquema de Mongoose y la estructura del documento en MongoDB.

* Controlador (controllers/bookController.ts)
Contiene la lógica de negocio de cada endpoint (CRUD de libros), usando async/await, try/catch y validación de IDs.

* Rutas (routes/bookRoutes.ts)
Define las rutas HTTP y las asocia con sus controladores:

GET /books → getBooks

GET /books/:id → getBookById

POST /books → createBook

PATCH /books/:id → updateBook

DELETE /books/:id → deleteBook

* Configuración (config/)

env.ts carga variables de entorno con process.loadEnvFile().

db.ts maneja la conexión a MongoDB.

* Utilidades (utils/apiResponse.ts)
Centraliza el formato de respuesta para mantener la API consistente.

## 📌 Buenas prácticas aplicadas
- Uso de TypeScript con tipos definidos (IBook, ApiResponse).

- Manejo de asincronía con async/await.

- Manejo de errores con try/catch.

- Validación de IDs de MongoDB antes de consultar la base.

- Respuestas estandarizadas para casos exitosos y de error.

- Código organizado siguiendo el patrón MVC.

- Variables sensibles (URI de MongoDB, puerto) manejadas vía .env.