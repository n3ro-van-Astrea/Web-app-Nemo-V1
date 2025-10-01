import React, { useEffect, useState } from "react";
import { TbLogin2 } from "react-icons/tb";
import { LuNotebookPen } from "react-icons/lu";
import { CgNotes } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";
import { HiOutlineUserAdd } from "react-icons/hi";

import { Link } from "react-router-dom";

const Navbar = () => {
  const [nick, setNick] = useState("");
  useEffect(() => {
    try {
      const login = localStorage.getItem("login");

      if (!login) return;

      if (login) {
        setNick(login); // сохраняем логин в состояние
      }
    } catch (err) {
      console.error("Ошибка чтения юзера из localStorage:", err);
    }
  }, []);
  return (
    <>
      <header className="w-[101vw]  px-5 py-5 bg-gray-800 border-b-1 border-white font-mono">
        <div className="flex justify-between items-center">
          <Link to="/">
            <h1 className="text-2xl text-white font-bold">Nemo</h1>
          </Link>
          {nick ? (
            <div className="text-white text-xl"> {nick} </div>
          ) : (
            <div className=" flex gap-3">
              <Link to="/signup">
                <div>
                  <HiOutlineUserAdd color="white" size={28} />
                </div>
              </Link>
              <Link to="/login">
                <div className="text-xl">
                  <TbLogin2 color="white" size={28} />
                </div>
              </Link>
            </div>
          )}
        </div>
      </header>

      <footer className="w-[101vw]  px-5 py-5 bg-gray-800 border-t-1 border-white font-mono fixed bottom-0">
        <div className="flex justify-between items-center">
          <Link to="/">
            <div className="text-2xl">
              <LuNotebookPen color="white" size={28} />
            </div>
          </Link>
          <Link to="/notes">
            <CgNotes color="white" size={28} />
          </Link>
          <Link to="/profile">
            <CgProfile color="white" size={28} />
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Navbar;
