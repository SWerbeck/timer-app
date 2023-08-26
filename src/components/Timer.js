import { React, useState, useRef, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [displaySeconds, setDisplaySeconds] = useState(0);
  const [displayMinutes, setDisplayMinutes] = useState(0);
  const [displayHours, setDisplayHours] = useState(5);

  const timerId = useRef();

  function timeDisplay(totalSeconds) {
    const totalMinutes = Math.floor(totalSeconds / 60);

    const secs = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    setDisplaySeconds(secs);
    setDisplayMinutes(mins);
    setDisplayHours(hours);
  }

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

  useEffect(() => {
    timeDisplay(seconds);
  }, [seconds]);

  return (
    <div>
      <p>secs: {seconds}</p>

      <p>
        time: {displayHours}:{displayMinutes}:{displaySeconds}
     
      </p>
      <button onClick={startTimer}> Start </button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default Timer;
