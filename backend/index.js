const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./src/routes/auth.routes");
const consumoRoutes = require("./src/routes/consumo_interno.routes");

console.log("🔹 Iniciando servidor...");

const app = express();

// Middleware CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Authorization"]
}));

// Middleware para JSON
app.use(express.json());

// Middleware de logs gerais
app.use((req, res, next) => {
  console.log("==================================");
  console.log(`🔹 Método: ${req.method} | URL: ${req.originalUrl}`);
  console.log("🔹 Headers recebidos:", req.headers);
  console.log("==================================");
  next();
});

// Rotas
app.use("/auth", authRoutes);
app.use("/consumo-interno", consumoRoutes);

// Servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log("SUPABASE_URL:", process.env.SUPABASE_URL ? "OK" : "NÃO ENCONTRADA");
  console.log("SUPABASE_KEY:", process.env.SUPABASE_KEY ? "OK" : "NÃO ENCONTRADA");
});