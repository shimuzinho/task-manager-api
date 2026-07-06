import UserController from "../controllers/user.controller";
import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/users", UserController.register);

export default userRoutes;