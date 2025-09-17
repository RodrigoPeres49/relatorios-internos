const express = require("express");
const router = express.Router();
const { criarRelatorio, listarRelatorios } = require("../controllers/relatorio.controller");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, criarRelatorio);
router.get("/", authMiddleware, listarRelatorios);

module.exports = router;
