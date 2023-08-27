import { React, useState, useRef, useEffect } from "react";

function Timer() {
  /* counter everything runs off of */
  const [seconds, setSeconds] = useState(0);
  /* hours, minutes and seconds displayed on the page counting up or down */
  const [displaySeconds, setDisplaySeconds] = useState(0);
  const [displayMinutes, setDisplayMinutes] = useState(0);
  const [displayHours, setDisplayHours] = useState(0);
  /* input times for countdown*/
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);
  /* for making button switch start/stop */
  const [start, setStart] = useState(false);
  /* for making counter count up or down */
  const [countUp, setCountUp] = useState(false);
  /* start time when counting down */
  const [startTime, setStartTime] = useState(0);

  const timerId = useRef();

  /*converts secs to hr:min:sec for count up */
  function timeDisplay(totalSeconds) {
    const totalMinutes = Math.floor(totalSeconds / 60);

    const secs = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    setDisplaySeconds(secs);
    setDisplayMinutes(mins);
    setDisplayHours(hours);
  }

  /*converts secs to hr:min:sec for count down */
  function timeDisplayCountdown(totalSeconds) {
    if (totalSeconds === 0) {
      stopTimer();
    }

    const totalMinutes = Math.floor(totalSeconds / 60);

    const secs = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    setDisplaySeconds(secs);
    setDisplayMinutes(mins);
    setDisplayHours(hours);

    if (displayHours === 0 && displayMinutes === 0 && displaySeconds === 0) {
      stopTimer();
    }
  }

  /* starts the counter */
  const startTimer = () => {
    timerId.current = setInterval(() => {
      setSeconds((prev) => (prev += 1));
    }, 1000);
    setStart(true);
  };

  /* stops the counter */
  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
    setStart(false);
  };

  /* rests the counter */
  const resetTimer = () => {
    setSeconds(0);
  };

  /* sets count up or down */
  const countUpDown = (event) => {
    setCountUp(event.target.value);
  };

  /* sets start time for count down */
  const handleStartHours = (event) => {
    setInputHours(event.target.value);
  };
  const handleStartMinutes = (event) => {
    setInputMinutes(event.target.value);
  };
  const handleStartSeconds = (event) => {
    setInputSeconds(event.target.value);
  };

  const timeToSeconds = () => {
    setStartTime(inputHours * 3600 + inputMinutes * 60 + inputSeconds);
  };

  /* watches seconds state and runs timeDisplay function everytime it changes */
  useEffect(() => {
    if (countUp) {
      timeDisplay(seconds);
    } else {
      timeDisplayCountdown(startTime - seconds);
    }
  }, [seconds]);

  useEffect(() => {
    timeToSeconds();
  }, [inputHours, inputMinutes, inputSeconds]);

  return (
    <div>
      <p>(this will be removed for final version) secs: {seconds}</p>

      {!start && !countUp ? (
        <form>
          <label>Hr:</label>
          <input
            type={"number"}
            value={inputHours}
            onChange={handleStartHours}
          />{" "}
          <label>Min:</label>
          <input
            type={"number"}
            value={inputMinutes}
            onChange={handleStartMinutes}
          />{" "}
          <label>Sec:</label>
          <input
            type={"number"}
            value={inputSeconds}
            onChange={handleStartSeconds}
          />{" "}
        </form>
      ) : (
        ""
      )}

      <label>Stopwatch / Count Down: </label>
      <select value={false} onChange={countUpDown}>
        <option value={true}>Stopwatch</option>
        <option value={false}>Count Down</option>
      </select>

      <p>
        time: {displayHours < 10 ? "0" + displayHours : displayHours}:
        {displayMinutes < 10 ? "0" + displayMinutes : displayMinutes}:
        {displaySeconds < 10 ? "0" + displaySeconds : displaySeconds}
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
