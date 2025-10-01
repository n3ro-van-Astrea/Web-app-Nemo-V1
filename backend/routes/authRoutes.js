const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

//регистрация

router.post("/register", async (req, res) => {
  const { login, password } = req.body;

  try {
    if (!login || !password) throw new Error("Все поля обязательны");

    const exist = await User.findOne({ login });
    if (exist) throw new Error("Логин уже используется");

    const salt = await bcrypt.genSalt(7);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ login, password: hash });

    const token = jwt.sign({ id: user._id }, "nero2008", { expiresIn: "3d" });

    res.status(200).json({ login: user.login, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//логин
router.post("/login", async (req, res) => {
  const { login, password } = req.body;

  try {
    if (!login || !password) throw new Error("Все поля обязательны");

    const user = await User.findOne({ login });
    if (!user) throw new Error("неверный логин");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Неверный пароль");

    const token = jwt.sign({ id: user._id }, "nero2008", { expiresIn: "3d" });
    res.json({ login: user.login, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
