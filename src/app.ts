import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";

const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(taskRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello Word!");
});

export default app;