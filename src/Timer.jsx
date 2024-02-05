import React, { useEffect } from "react";
import { DoubleDigit, TripileDigit } from "./Constants";

function Timer({ startTime = undefined, endTime = undefined, resetGame }) {
  const currentTime = Date.now();
  const [time, setTime] = React.useState(
    endTime ? endTime - startTime : startTime ? currentTime - startTime : 0
  );
  if (time > 3600000) {
    resetGame();
  }
  useEffect(() => {
    let interval;
    if (startTime) {
      if (endTime) {
        if (interval) clearInterval(interval);
      } else {
        interval = setInterval(() => {
          setTime(Date.now() - startTime);
        }, 1);
      }
    } else {
      if (interval) clearInterval(interval);
      setTime(0);
    }

    return () => (interval ? clearInterval(interval) : null);
  }, [startTime, endTime]);

  const milliseconds = TripileDigit(time % 1000);
  let seconds = DoubleDigit(Math.floor(time / 1000) % 60);
  let minutes = DoubleDigit(Math.floor(time / 60000) % 60);

  return (
    // <p className=" text-center md:text-xl">
    <p className="w-[180px] md:w-[180px] md:text-xl flex justify-evenly px-6">
      <span className="w-[27px]">{minutes}</span>
      <span>:</span>
      <span className="w-[27px]">{seconds}</span>
      <span>:</span>
      <span className="w-[38px]">{milliseconds}</span>
    </p>
    // </p>
  );
}

export default Timer;
