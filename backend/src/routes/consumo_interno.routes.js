const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const {
  cadastrarConsumoInterno,
  listarConsumoInterno,
  editarConsumoInterno,
  deletarConsumoInterno
} = require("../controllers/consumo_interno.controller");

// Logs para verificar rota
router.use((req, res, next) => {
  console.log("✅ Rota consumo_interno acessada:", req.method, req.originalUrl);
  next();
});

// Rotas
router.post("/", authMiddleware, cadastrarConsumoInterno);
router.get("/listar-consumo", authMiddleware, listarConsumoInterno);
router.put("/:id", authMiddleware, (req, res, next) => {
  console.log("✅ PUT recebido em /consumo-interno/:id");
  next();
}, editarConsumoInterno);
router.delete("/:id", authMiddleware, deletarConsumoInterno);

module.exports = router;
