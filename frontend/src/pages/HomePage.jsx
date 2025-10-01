import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token");

  //получение всех заметок
  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("http://localhost:5000/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setNotes(data);
      }
    };

    fetchNotes();
  }, [token]);

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
    } else {
      alert(data.error);
    }
  };
  // Удаление заметки
  const deleteNote = async (id) => {
    const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setNotes((prev) => prev.filter((note) => note._id !== id));
    }
  };

  return (
    <div>
      <form onSubmit={addNote} className="mb-4">
        <input
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Задача"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Добавить</button>
      </form>

      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <b>{note.title}:</b> {note.content}{" "}
            <button onClick={() => deleteNote(note._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
