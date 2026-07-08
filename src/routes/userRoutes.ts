import UserController from "../controllers/user.controller";
import authenticate from "../middlewares/authenticate.middleware";
import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/users/:id", UserController.getOne);
userRoutes.post("/users/login", UserController.login);
userRoutes.post("/users/register", UserController.register);
userRoutes.delete("/users", authenticate, UserController.delete);

export default userRoutes;