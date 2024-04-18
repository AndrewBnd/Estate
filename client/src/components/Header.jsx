import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-5">
        <Link to="/">
          <h1 className="font-bold text-base sm:text-3xl flex">
            <span>BestEstate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="flex items-center border border-gray-300 rounded-xl py-2 px-4 shadow-md shadow-gray-300"
        >
          <input
            type="text"
            placeholder="Поиск..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-blue-500 p-2 text-white rounded-full">
            <FaSearch />
          </button>
        </form>
        <ul className="flex items-center gap-6">
          <Link to="/about">
            <li className="hidden sm:inline hover:underline text-xl">О нас</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-6 sm:h_10 w-6 sm:w-10 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="text-base sm:text-xl hover:underline"> Войти</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
