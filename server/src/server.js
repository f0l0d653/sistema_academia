import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para ler JSON nas requisições
app.use(express.json());

// Rota de teste
app.get("/api/v1/status", (req, res) => {
  res.json({
    status: "Online",
    message: "Backend do Sistema Academia operando!",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando lindamente na porta ${PORT}`);
});
