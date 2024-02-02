import { useState } from "react";
import Game from "./Game";

function App() {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gridSize, setGridSize] = useState(4);

  if (process.env.NODE_ENV === "development") {
    document.title = "D- Memory Game";
  }

  return (
    <>
      {/* {isPlaying ? null : (
        <button
          onClick={() => {
            setIsPlaying(true);
            setStartTime(Date.now());
          }}
        >
          Start
        </button>
      )} */}
      <Game
        isplaying={isPlaying}
        startTime={startTime}
        gridSize={gridSize}
        setGridSize={setGridSize}
        endTime={endTime}
        endGame={() => {
          setIsPlaying(false);
          setEndTime(Date.now());
        }}
      />
      <a classname="mt-5" href="https://www.freepik.com/free-vector/rope-font-nautical-alphabet-ropes-hand-drawn-letters-alphabet-typographic-vintage-rope-string-typeface_13422926.htm#query=cursive%20letter&position=2&from_view=keyword&track=ais&uuid=329c1631-058b-4d65-b4c4-68c58c575c12">Images by macrovector</a> on Freepik
    </>
  );
}

export default App;
