import { React, useState, useRef, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [displaySeconds, setDisplaySeconds] = useState(0);
  const [displayMinutes, setDisplayMinutes] = useState(0);
  const [displayHours, setDisplayHours] = useState(5);
  const [start, setStart] = useState(false);

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
    setStart(true);
  };

  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
    setStart(false);
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

      {start ? (
        <button onClick={stopTimer}>Stop</button>
      ) : (
        <button onClick={startTimer}> Start </button>
      )}

      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default Timer;
