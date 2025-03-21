import { Router } from "express";
import BookRoutes from "./Book.routes";
import RoleRoutes from "./Role.routes";
import UserRoutes from "./User.routes";

const RootRouter = Router();

RootRouter.use("/book", BookRoutes);
RootRouter.use("/role", RoleRoutes);
RootRouter.use("/user", UserRoutes);

export default RootRouter;