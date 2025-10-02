import React, { useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

const NoteDetails = () => {
  const [notes, setNotes] = useState([]);
  const [expandedDates, setExpandedDates] = useState({});
  const token = localStorage.getItem("token");

  // получение всех заметок
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

  // удаление заметки
  const deleteNote = async (id) => {
    const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setNotes((prev) => prev.filter((note) => note._id !== id));
    }
  };

  // получаем уникальные даты
  const uniqueDates = [
    ...new Set(
      notes.map((n) => new Date(n.createdAt).toISOString().split("T")[0])
    ),
  ];

  return (
    <>
      {token ? (
        <div className="w-[101vw] h-[85vh] flex flex-col items-center bg-gray-700 p-2 text-xl text-white">
          <div className="w-full flex flex-col gap-4">
            {uniqueDates.map((date) => {
              const notesForDate = notes.filter(
                (note) =>
                  new Date(note.createdAt).toISOString().split("T")[0] === date
              );

              const isExpanded = expandedDates[date] ?? true; // по умолчанию раскрыты

              return (
                <div
                  key={date}
                  className="bg-gray-800 rounded-xl p-3 shadow-md"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold">{date}</h2>
                    <button
                      onClick={() =>
                        setExpandedDates((prev) => ({
                          ...prev,
                          [date]: !prev[date],
                        }))
                      }
                      className="bg-gray-600 px-3 py-1 rounded-md text-sm"
                    >
                      {isExpanded ? "Скрыть" : "Развернуть"}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="flex flex-col gap-2 mt-2">
                      {notesForDate.map((note) => (
                        <div
                          className="bg-gray-900 rounded-xl p-4 shadow-md"
                          key={note._id}
                        >
                          <div className="flex w-full justify-between">
                            <strong>{note.title}:</strong>
                            <button onClick={() => deleteNote(note._id)}>
                              <FaTrashCan size={20} color="red" />
                            </button>
                          </div>
                          <div className="p-1">{note.content}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-gray-700 w-full h-[85vh] flex items-center justify-center text-white text-2xl">
          Войдите в аккаунт
        </div>
      )}
    </>
  );
};

export default NoteDetails;
