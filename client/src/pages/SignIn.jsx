import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <div className="p-3 items-center max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 ">Вход</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Имя"
          className="border p-3 rounded-xl"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="your@email.com"
          className="border p-3 rounded-xl"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Пароль"
          className="border p-3 rounded-xl"
          id="password"
          onChange={handleChange}
        />

        <button
          
          className="bg-blue-500 text-white p-3 rounded-xl uppercase hover:opacity-95 disabled:opacity-80"
        >
          Войти
        </button>
      </form>
      <div className="flex gap-2 mt-5 justify-center">
        <p>Еще нет аккаунта?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-500 hover:text-blue-400">Зарегистрироваться</span>
        </Link>
      </div>
    </div>
  );
}

