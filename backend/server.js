//библиотеки
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//--------------
//импорт роутов
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
//--------------
//мидлвееры
const app = express();
app.use(cors());
app.use(express.json());
//---------------

app.use("/api/auth", authRoutes);
app.use("/api/notes", authRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(
    "mongodb+srv://nero:nero2008@cluster0.kdnkhte.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("База данных подключена");

    app.listen(PORT, "0.0.0.0", () => {
      console.log("Сервер подлючен на порте:", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
