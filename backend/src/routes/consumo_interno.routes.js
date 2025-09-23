const express = require("express");
const router = express.Router();
const { cadastrarConsumoInterno, listarConsumoInterno } = require("../controllers/consumo_interno.controller");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, cadastrarConsumoInterno);
router.get("/", authMiddleware, listarConsumoInterno);

module.exports = router;
