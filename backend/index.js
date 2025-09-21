const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./src/routes/auth.routes");
const relatorioRoutes = require("./src/routes/consumo_interno.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/relatorios", relatorioRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
  console.log("SUPABASE_KEY:", process.env.SUPABASE_KEY ? "OK" : "NÃO ENCONTRADA");
  console.log(`Servidor rodando na porta ${PORT}`);
});