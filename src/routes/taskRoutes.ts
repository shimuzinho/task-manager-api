import TaskController from "../controllers/task.controller";
import { Router } from "express";

const taskRoutes = Router();

taskRoutes.get("/tasks/:id", TaskController.getOne);
taskRoutes.get("/tasks", TaskController.getAll);
taskRoutes.post("/tasks", TaskController.create);
taskRoutes.delete("/tasks/:id", TaskController.delete);

export default taskRoutes;