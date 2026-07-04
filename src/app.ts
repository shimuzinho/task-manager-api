import express, { Request, Response } from "express";
import taskRoutes from "./routes/taskRoutes";

const app = express();

app.use(express.json());
app.use(taskRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello Word!");
});

export default app;