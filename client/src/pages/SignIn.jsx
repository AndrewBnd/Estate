import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));

        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="p-3 items-center max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 ">Вход</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          disabled={loading}
          className="bg-blue-500 text-white p-3 rounded-xl uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Загрузка..." : "Войти"}
        </button>
      </form>
      <div className="flex gap-2 mt-5 justify-center">
        <p>Еще нет аккаунта?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-500 hover:text-blue-400">
            Зарегистрироваться
          </span>
        </Link>
      </div>
    </div>
  );
}
