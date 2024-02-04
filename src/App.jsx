import { useState } from "react";
import Game from "./Game";
import Timer from "./Timer";

function App() {
  const [startTime, setStartTime] = useState(undefined);
  const [endTime, setEndTime] = useState(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gridSize, setGridSize] = useState(4);

  if (process.env.NODE_ENV === "development") {
    document.title = "D- Memory Game";
  }

  function ResetGame() {
    setIsPlaying(false);
    setStartTime(undefined);
    setEndTime(undefined);
  }

  function StartGame() {
    setIsPlaying(true);
    setStartTime(Date.now());
  }

  return (
    <>
      <div className="container mx-auto max-w-max flex mb-4">
        <button
          className=" bg-green-500 hover:bg-green-400 text-black rounded px-2 py-1"
          onClick={() => {
            if (isPlaying) {
              ResetGame();
            } else {
              StartGame();
            }
          }}
        >
          {isPlaying ? "Reset" : "Start"}
        </button>
        <Timer startTime={startTime} endTime={endTime} resetGame={ResetGame} />
        <div className="flex gap-2">
          <label htmlFor="">Size</label>
          <select
            className=" text-black rounded px-1 py-1 bg-slate-500 hover:bg-slate-400"
            onChange={(event) => {
              setGridSize(event.target.value);
              // setGrid(GenerateGrid(event.target.value));
            }}
          >
            <option value="4">4</option>
            <option value="6">6</option>
          </select>
        </div>
      </div>
      <Game
        isplaying={isPlaying}
        startTime={startTime}
        gridSize={gridSize}
        endTime={endTime}
        endGame={() => {
          setIsPlaying(false);
          setEndTime(Date.now());
        }}
      />
      <div className="flex justify-center mt-8">
        <a
          target="_blank"
          href="https://www.freepik.com/free-vector/rope-font-nautical-alphabet-ropes-hand-drawn-letters-alphabet-typographic-vintage-rope-string-typeface_13422926.htm"
        >
          Image by macrovector
        </a>{" "}
        on Freepik
      </div>
    </>
  );
}

export default App;
