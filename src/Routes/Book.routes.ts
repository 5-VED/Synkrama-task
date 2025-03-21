import { BookController } from '../Controllers/Book.controller';
import { Router } from 'express';
import { createBookSchema, updateBookSchema, bookIdSchema } from '../Validators/Book.validator';
import { validatePayload } from '../Middlewares/Validation.middleware';
import { authMiddleware } from '../Middlewares/Auth.middleware';

const BookRoutes = Router();

BookRoutes.get('/', BookController.getBooks);
BookRoutes.post('/', authMiddleware, validatePayload({ body: createBookSchema }), BookController.addBook);
BookRoutes.get('/:id', validatePayload({ params: bookIdSchema }), BookController.getBook);
BookRoutes.delete('/:id', authMiddleware,validatePayload({ params: bookIdSchema }), BookController.deleteBook);
BookRoutes.put('/:id', authMiddleware, validatePayload({ body: updateBookSchema.body, params: bookIdSchema }), BookController.updateBook);

export default BookRoutes;
