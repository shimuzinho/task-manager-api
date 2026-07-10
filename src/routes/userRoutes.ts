import UserController from "../controllers/user.controller";
import authenticate from "../middlewares/authenticate.middleware";
import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/users/me", authenticate, UserController.getOne);
userRoutes.post("/users/login", UserController.login);
userRoutes.post("/users/register", UserController.register);
userRoutes.patch("/users/me", authenticate, UserController.update);
userRoutes.patch("/users/me/password", authenticate, UserController.updatePassword);
userRoutes.delete("/users/me", authenticate, UserController.delete);

export default userRoutes;