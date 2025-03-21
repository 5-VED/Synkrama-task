import { Router } from "express";
import { UserController } from "../Controllers/User.controller";
import { loginSchema, signupSchema } from "../Validators/User.validator";
import { validatePayload } from "../Middlewares/Validation.middleware";
const UserRoutes = Router();

// Authentication routes (public)
UserRoutes.post('/signup', validatePayload({ body: signupSchema }), UserController.signup);
UserRoutes.post('/login', validatePayload({ body: loginSchema }), UserController.login);

export default UserRoutes; 