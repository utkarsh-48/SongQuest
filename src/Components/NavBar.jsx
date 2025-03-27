import React from "react";
import { FaMusic } from "react-icons/fa";

function NavBar() {
  return (
    <div
      className={`flex w-full justify-between h-16 bg-{#121212} text-white items-center px-10 py-9`}
    >
      <div className="flex items-center gap-2">
        <FaMusic className="text-[#9E2B25] text-2xl" />
        <h1 className="text-2xl font-bold">SongQuest</h1>
      </div>

      <h1 className="text-lg font-semibold">Welcome</h1>

      <button className="px-5 py-2 font-bold text-gray-700 bg-teal-400 rounded-full border hover:bg-gray-200 transition">
        Login / Sign Up
      </button>
    </div>
  );
}

export default NavBar;
