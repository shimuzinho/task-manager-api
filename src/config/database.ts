import mongoose from "mongoose";

export async function connectDatabase () {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error("Caminho para o banco de dados não definido.");
        }
        await mongoose.connect(mongoURI);
        console.log("Banco de dados conectado com sucesso.");
    } catch (error) {
        console.log(`Erro ao conectar ao banco de dados: ${error}`);
        process.exit(1);
    }
}