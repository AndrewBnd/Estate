import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="/">
          <h1 className="font-bold text-2xl flex">
            <span>Estate</span>
          </h1>
        </Link>
        <form className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
          <input
            type="text"
            placeholder="Поиск..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <button className="bg-sky-500 p-2 text-white rounded-full">
            <FaSearch />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline hover:underline">About</li>
          </Link>
          <Link to="/sign-in">
            <li className="hover:underline">Sign in</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
