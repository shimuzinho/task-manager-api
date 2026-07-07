import UserController from "../controllers/user.controller";
import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/users/:id", UserController.getOne);
userRoutes.post("/users", UserController.register);

export default userRoutes;