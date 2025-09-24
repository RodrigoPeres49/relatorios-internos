const express = require("express");
const router = express.Router();
const { register, login, updateUser, updatePassword } = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);
router.put("/update/:nome_usuario", updateUser);
router.put("/update-password/:id", updatePassword);

module.exports = router;