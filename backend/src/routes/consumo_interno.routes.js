const express = require("express");
const router = express.Router();
const { criarConsumoInterno, listarConsumoInterno } = require("../controllers/consumo_interno.controller");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, criarConsumoInterno);
router.get("/", authMiddleware, listarConsumoInterno);

module.exports = router;
