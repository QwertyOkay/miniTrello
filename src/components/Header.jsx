import React from "react";

function Header(props) {
  return (
    <div className="w-full border-b border-b-slate-300 dark:border-b-slate-800 shadow-md">
      <nav className="px-11 py-5 bm-12 flex justify-between">
        <h1 className="text-2xl font-bold cursor-pointer text-blue-500 dark:text-cyan-400 text-[#026AA7]">
          Mini Trello/Kanban
        </h1>
      </nav>
    </div>
  );
}

export default Header;
