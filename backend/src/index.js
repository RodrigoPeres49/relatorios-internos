const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const relatorioRoutes = require("./routes/relatorio.routes");

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/auth", authRoutes);
app.use("/relatorios", relatorioRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});