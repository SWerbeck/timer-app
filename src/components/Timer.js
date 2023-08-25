import { React, useState, useRef } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  const timerId = useRef();

  const startTimer = () => {
    timerId.current = setInterval(() => {
      setSeconds((prev) => (prev += 1));
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
  };

  const resetTimer = () => {
    setSeconds(0);
  };

  return (
    <div>
      <p>secs: {seconds}</p>
      <button onClick={startTimer}> Start </button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default Timer;
