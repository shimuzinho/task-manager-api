import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello Word!");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`http://localhost:3000`);
});