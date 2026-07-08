import TaskController from "../controllers/task.controller";
import authenticate from "../middlewares/authenticate.middleware";
import { Router } from "express";

const taskRoutes = Router();

taskRoutes.get("/tasks/:id", authenticate, TaskController.getOne);
taskRoutes.get("/tasks", authenticate, TaskController.getAll);
taskRoutes.post("/tasks", authenticate, TaskController.create);
taskRoutes.patch("/tasks/:id", authenticate, TaskController.update);
taskRoutes.delete("/tasks/:id", authenticate, TaskController.delete);

export default taskRoutes;