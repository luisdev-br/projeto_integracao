const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido!" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), "secreto");
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido!" });
  }
};

module.exports = authMiddleware;