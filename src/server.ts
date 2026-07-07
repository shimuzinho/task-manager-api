import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDatabase } from "./config/database";

const PORT = process.env.PORT || 3000;

async function startServer() {
    if (!process.env.MONGO_URI) { 
        console.log("MONGO_URI is not defined.");
        process.exit(1);
    }
    if (!process.env.SECRET_KEY) {
        console.log("SECRET_KEY is not defined.");
        process.exit(1);
    }
    await connectDatabase();

    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
}

startServer();