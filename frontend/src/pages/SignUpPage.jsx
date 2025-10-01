import React, { useState } from "react";

const SignUpPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);

      setError(null);
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="w-[101vw] h-[85vh] p-4 bg-gray-700 text-white text-xl flex flex-col items-center justify-center">
      <form
        className="shadow-xl border-1 w-[100%] bg-gray-900 flex flex-col items-center justify-center p-6 rounded-xl gap-6"
        onSubmit={handleSubmit}
      >
        <h3 className="bg-gray-700 p-2 rounded-md w-full text-center">
          Sign Up
        </h3>
        <div className="flex flex-col gap-6 self-start w-full">
          <input
            className="border-1 p-2 rounded-md "
            type="text"
            placeholder="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            className="border-1 p-2 rounded-md "
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-green-800 p-2 px-10 rounded-md text-center"
          type="submit"
        >
          Sign up
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default SignUpPage;
