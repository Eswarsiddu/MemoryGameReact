import React, { useEffect } from "react";

function Timer({ startTime = undefined, endTime = undefined, resetGame }) {
  const currentTime = Date.now();
  const [time, setTime] = React.useState(
    endTime ? endTime - startTime : startTime ? currentTime - startTime : 0
  );
  if (time > 5400000) {
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

  return <p className="w-[150px] text-center">{TimerText(time)}</p>;
}

function DoubleDigit(num) {
  return num < 10 ? `0${num}` : num;
}

function TripileDigit(num) {
  return num < 100 ? `0${DoubleDigit(num)}` : num;
}

function TimerText(time) {
  let text = "";
  let milliseconds = time % 1000;
  let seconds = Math.floor(time / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  console.log("timer", milliseconds);
  if (hours) {
    text += `${DoubleDigit(hours)}:`;
  }
  if (minutes) {
    text += `${DoubleDigit(minutes)}:`;
  }
  //   if (seconds) {
  text += `${DoubleDigit(seconds)}:`;
  //   }
  //   if (milliseconds) {
  text += `${TripileDigit(milliseconds)}`;
  //   }
  return text;
}

export default Timer;
