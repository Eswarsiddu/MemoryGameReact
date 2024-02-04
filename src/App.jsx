import { useState } from "react";
import Game from "./Game";
import Timer from "./Timer";

function App() {
  const [startTime, setStartTime] = useState(undefined);
  const [endTime, setEndTime] = useState(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gridSize, setGridSize] = useState(4);
  const [isfirstPlay, setIsFirstPlay] = useState(true);

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
    setEndTime(undefined);
    setIsFirstPlay(false);
  }

  return (
    <>
      <div className="container mx-auto max-w-max flex mb-6 items-center">
        <button
          className=" bg-green-500 hover:bg-green-400 text-black rounded px-2 py-1 w-[60px]"
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
        <div className="flex gap-2 items-center">
          <label htmlFor="">Size</label>
          <select
            disabled={isPlaying}
            className=" text-black rounded px-1 py-1 bg-slate-500 hover:enabled:bg-slate-400"
            onChange={(event) => {
              setGridSize(event.target.value);
              ResetGame();
            }}
          >
            <option value="4">4</option>
            <option value="6">6</option>
          </select>
        </div>
      </div>
      <Game
        isplaying={isPlaying}
        isfirstPlay={isfirstPlay}
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
