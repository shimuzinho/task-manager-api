import mongoose from "mongoose";

export async function connectDatabase () {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error("Caminho para o banco de dados não definido.");
        }
        await mongoose.connect(mongoURI);
    } catch (err) {
        console.log(`Erro ao conectar ao banco de dados: ${err}`);
        process.exit(1)
    }
}