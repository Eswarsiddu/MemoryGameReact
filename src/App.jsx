import { useState } from "react";
import Game from "./Game";

function App() {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
