import React, { useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";

const NoteDetails = () => {
  const [notes, setNotes] = useState([]);
  const [expandedDates, setExpandedDates] = useState({});
  const token = localStorage.getItem("token");

  // здесь вместо boolean храним id заметки, которую хотим удалить
  const [deleteTargetId, setDeleteTargetId] = useState(null);

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
    setDeleteTargetId(null); // закрываем модалку
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

              const isExpanded = expandedDates[date] ?? false;

              return (
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", delay: 0.4, duration: 1.5 }}
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
                  <AnimatePresence mode="wait">
                    {isExpanded && (
                      <motion.div
                        key="notes"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="flex flex-col gap-2 mt-2 overflow-hidden"
                      >
                        {notesForDate.map((note) => (
                          <motion.div
                            key={note._id}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ type: "spring", duration: 0.3 }}
                            className="bg-gray-900 rounded-xl p-4 shadow-md"
                          >
                            <div className="flex w-full justify-between">
                              <strong>{note.title}:</strong>
                              <motion.button
                                initial={{ opacity: 0, scale: 0.7 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileTap={{
                                  scale: 1.1,
                                  transition: { type: "spring", duration: 0.3 },
                                }}
                                transition={{ delay: 0.2, type: "spring" }}
                                onClick={() => setDeleteTargetId(note._id)}
                              >
                                <FaTrashCan size={20} color="red" />
                              </motion.button>
                            </div>
                            <div className="p-1">{note.content}</div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-gray-700 w-[101vw] h-[85vh] flex items-center justify-center text-white text-2xl">
          Войдите в аккаунт
        </div>
      )}

      {/* Модалка вынесена на уровень всего компонента */}
      <AnimatePresence>
        {deleteTargetId && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-80 rounded-2xl bg-white p-6 shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="mb-4 text-lg font-bold">Удаление заметки</h2>
              <p className="mb-6 text-gray-700">
                Вы точно хотите удалить заметку?
              </p>
              <div className="flex w-full gap-2">
                <button
                  onClick={() => deleteNote(deleteTargetId)}
                  className="w-full rounded-lg bg-pink-600 px-4 py-2 text-white hover:bg-pink-700"
                >
                  Удалить
                </button>
                <button
                  onClick={() => setDeleteTargetId(null)}
                  className="w-full rounded-lg bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
                >
                  Отмена
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NoteDetails;
