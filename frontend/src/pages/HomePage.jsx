import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  const token = localStorage.getItem("token");

  //Добавление заметки

  const addNote = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });

    const data = await response.json();
    if (response.ok) {
      setNotes((prev) => [...prev, data]);
      setTitle("");
      setContent("");
      setInfo("Заметка добавлена");
      setError(null);
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-[101vw] h-[85vh] bg-gray-700 text-2xl text-white ">
      <motion.form
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ type: "spring" }}
        onSubmit={addNote}
        className="shadow-xl p-5 rounded-2xl border-1 border-gray-600 gap-4 mb-4 bg-gray-900 flex flex-col"
      >
        <div className="flex flex-col self-start w-full gap-4">
          <motion.input
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", delay: 0.7, duration: 1.5 }}
            className=" border-1 border-gray-600 p-2 rounded-md"
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <motion.input
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", delay: 1.2, duration: 1.5 }}
            className=" border-1 border-gray-600 p-2 rounded-md"
            placeholder="Задача"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <motion.button
          initial={{ y: 80, opacity: 0 }}
          whileInView={{
            y: 0,
            opacity: 1,
            transition: { type: "spring", duration: 1, delay: 1.7 },
          }}
          whileTap={{
            scale: 1.1,
            transition: { delay: 0, type: "spring", duration: 0.5 },
          }}
          className="bg-green-700 p-2 px-10 rounded-md text-center"
          type="submit"
        >
          Добавить
        </motion.button>
        {error && <div className="text-red-600">{error}</div>}
        {info && <div className="text-green-600">{info}</div>}
      </motion.form>
    </div>
  );
};

export default HomePage;
