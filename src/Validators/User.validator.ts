import Joi, { ObjectSchema } from 'joi';

// Schema for user ID validation
export const userIdSchema: ObjectSchema = Joi.object({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('Invalid user ID format').required()
});

// Schema for user signup validation
export const signupSchema: ObjectSchema = Joi.object({
    firstName: Joi.string().required().min(2).max(50).trim(),
    lastName: Joi.string().required().min(2).max(50).trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().min(6).max(50),
    role: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('Invalid role ID format').optional()
});

// Schema for user login validation
export const loginSchema: ObjectSchema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required()
}); 