import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="/">
          <h1 className="font-bold text-2xl flex">
            <span>BestEstate</span>
          </h1>
        </Link>
        <form className="flex items-center border border-gray-300 rounded-xl py-2 px-4 shadow-md shadow-gray-300">
          <input
            type="text"
            placeholder="Поиск..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <button className="bg-blue-500 p-2 text-white rounded-full">
            <FaSearch />
          </button>
        </form>
        <ul className="flex gap-6">
          <Link to="/about">
            <li className="hidden sm:inline hover:underline text-lg">О нас</li>
          </Link>
          <Link to="/sign-in">
            <li className="hover:underline text-lg">Войти</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
