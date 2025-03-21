import { Router } from "express";
import { RoleController } from "../Controllers/Role.controller";


const RoleRoutes = Router();

// Routes with validators
RoleRoutes.post('/add',  RoleController.addRole);
RoleRoutes.delete('/remove/:id', RoleController.deleteRole);
RoleRoutes.get('/get', RoleController.getRoles);

export default RoleRoutes;