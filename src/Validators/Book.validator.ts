import Joi, { ObjectSchema } from "joi";

export const bookIdSchema: ObjectSchema = Joi.object({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
});

export const createBookSchema: ObjectSchema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    author: Joi.string().min(3).max(255).required(),
    year: Joi.number().integer().min(1000).max(new Date().getFullYear()).required(),
    genre: Joi.string().min(3).max(100).required(),
});

export const updateBookSchema = {
    body: Joi.object({
        title: Joi.string().min(3).max(255).optional(),
        author: Joi.string().min(3).max(255).optional(),
        year: Joi.number().integer().min(1000).max(new Date().getFullYear()).optional(),
        genre: Joi.string().min(3).max(100).optional(),
    }),
    params: bookIdSchema
};
