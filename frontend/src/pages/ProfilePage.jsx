import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const ProfilePage = () => {
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  const leave = () => {
    const login = localStorage.getItem("login");
    if (!login) {
      setError("Вы еще даже не входили в аккаунт");
      setInfo(null);
    } else {
      setInfo("Вы успешно вышли из аккаунта");
      setError(null);
      localStorage.clear();
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
  };

  const login = localStorage.getItem("login");

  return (
    <div className="flex justify-center items-center w-[101vw] h-[85vh] bg-gray-700">
      <div className="bg-gray-900 shadow-lg rounded-2xl p-8 w-[90%] max-w-md flex flex-col items-center">
        {/* Аватар */}
        <FaUserCircle size={80} className="text-rose-400 mb-4" />

        {/* Логин */}
        {login ? (
          <h2 className="text-white text-2xl font-mono mb-6">{login}</h2>
        ) : (
          <h2 className="text-gray-400 text-xl font-mono mb-6">Гость</h2>
        )}

        {/* Сообщения */}
        {error && <p className="text-red-500 mb-3">{error}</p>}
        {info && <p className="text-green-400 mb-3">{info}</p>}

        {/* Кнопка выхода */}
        <button
          onClick={leave}
          className="bg-rose-600 hover:bg-rose-700 transition px-6 py-2 rounded-md text-white text-lg font-semibold"
        >
          {login ? "Выйти из аккаунта" : "Выйти"}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
