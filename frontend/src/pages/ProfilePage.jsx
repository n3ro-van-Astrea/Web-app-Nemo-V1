import React, { useState } from "react";

const ProfilePage = () => {
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  const leave = () => {
    const login = localStorage.getItem("login");
    if (!login) {
      setError("Вы еще даже не входили в аккаунт");
    } else {
      setInfo("Вы успешно вышли из аккаунта");
      localStorage.clear();
      window.location.reload();
    }
  };

  const login = localStorage.getItem("login");
  return (
    <div className="flex flex-col w-[101vw] h-[85vh] bg-gray-700 items-center">
      {login && <h2 className="text-white text-2xl font-mono">{login}</h2>}
      <button
        onClick={leave}
        className="bg-rose-500 p-3 px-5 rounded-xl text-white text-2xl fixed bottom-20"
      >
        Выйти
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {info && <p style={{ color: "green" }}>{info}</p>}
    </div>
  );
};

export default ProfilePage;
