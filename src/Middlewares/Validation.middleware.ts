import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { HTTP_CODES } from "../Common/Constants/Enums";

interface ValidationSchemas {
    body?: ObjectSchema;
    query?: ObjectSchema;
    params?: ObjectSchema;
}

export const validatePayload = (schemas: ValidationSchemas) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        let errors: string[] = [];

        if (schemas.body) {
            const { error } = schemas.body.validate(req.body, { abortEarly: false });
            if (error) errors.push(...error.details.map(err => err.message));
        }

        if (schemas.query) {
            const { error } = schemas.query.validate(req.query, { abortEarly: false });
            if (error) errors.push(...error.details.map(err => err.message));
        }

        if (schemas.params) {
            const { error } = schemas.params.validate(req.params, { abortEarly: false });
            if (error) errors.push(...error.details.map(err => err.message));
        }

        if (errors.length > 0) {
            res.status(HTTP_CODES.BAD_REQUEST).json({
                message: "Validation Error",
                success: false,
                errors
            });
            return;
        }

        next();
    };
};
