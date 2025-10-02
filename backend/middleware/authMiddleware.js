const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ error: "Не авторизован" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "nero2008");
    req.user = decoded.id; // добавляем id пользователя в req.user
    next();
  } catch (err) {
    res.status(401).json({ error: "Вы не авторизованы" });
  }
};

module.exports = authMiddleware;
