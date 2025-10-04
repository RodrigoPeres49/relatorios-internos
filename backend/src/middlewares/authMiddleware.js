const jwt = require("jsonwebtoken");

console.log("🔹 authMiddleware carregado");

function authMiddleware(req, res, next) {
  console.log("🔹 Entrou no authMiddleware");

  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  console.log("🔹 authHeader:", authHeader);

  if (!authHeader) {
    console.log("❌ Token não fornecido");
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    console.log("❌ Formato do token inválido");
    return res.status(401).json({ error: "Formato do token inválido" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    console.log("❌ Formato do token inválido");
    return res.status(401).json({ error: "Formato do token inválido" });
  }

  try {
    console.log("🔹 Token recebido:", token);
    console.log("🔹 JWT_SECRET:", process.env.JWT_SECRET ? "OK" : "NÃO ENCONTRADO");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔹 Token decodificado:", decoded);

    req.user = decoded;

    next();
  } catch (err) {
    console.error("❌ Erro ao verificar token:", err.message);
    return res.status(401).json({ error: "Token inválido" });
  }
}

module.exports = authMiddleware;