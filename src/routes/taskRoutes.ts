import TaskController from "../controllers/task.controller";
import { Router } from "express";

const taskRoutes = Router();

taskRoutes.post("/tasks", TaskController.create);

export default taskRoutes;