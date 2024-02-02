import { useState } from "react";
import Game from "./Game";

function App() {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gridSize, setGridSize] = useState(4);

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
    </>
  );
}

export default App;
