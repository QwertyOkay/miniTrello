import React from "react";
import Header from "./Header";
import Board from "./Board";

function App() {
  return (
    <div className="h-screen w-screen flex  md:justify-center items-center">
      <div className="bg-white dark:bg-slate-900 flex items-center flex-col">
        <Header />
        <Board />
      </div>
    </div>
  );
}

export default App;
