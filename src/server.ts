import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDatabase } from "./config/database";

const PORT = process.env.PORT || 3000;

async function startServer() {
    await connectDatabase();
    
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
}

startServer();