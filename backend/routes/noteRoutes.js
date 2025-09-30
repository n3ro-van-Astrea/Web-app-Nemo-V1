const express = require("express");
const Note = require("../models/Note");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//создание новой заметки

router.post("/:id", authMiddleware, async (req, res) => {
  const { title, content } = req.body;

  try {
    if (!title || !content) throw new Error("Все поля обязательны");

    const note = await Note.create({ user: req.user }, title, content);

    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//удаление заметки

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });
    if (!note) throw new Error("Заметка не найдена");
    res.json({ message: "Заметка удалена" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
