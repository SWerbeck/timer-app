import react, { useState, useRef, useEffect } from "react";
import ReactSwitch from "react-switch";
import ".././App.css";

function Timer() {
  /* counter everything runs off of */
  const [seconds, setSeconds] = useState(0);
  /* hours, minutes and seconds displayed on the page counting up or down */
  const [displaySeconds, setDisplaySeconds] = useState<number>(0);
  const [displayMinutes, setDisplayMinutes] = useState<number>(0);
  const [displayHours, setDisplayHours] = useState<number>(0);
  /* input times for countdown*/
  const [inputHours, setInputHours] = useState<number>(0);
  const [inputMinutes, setInputMinutes] = useState<number>(0);
  const [inputSeconds, setInputSeconds] = useState<number>(0);
  /* for making button switch start/stop */
  const [start, setStart] = useState<boolean>(false);
  /* for making counter count up or down */
  const [countUp, setCountUp] = useState<boolean>(true);
  /* start time when counting down */
  const [startTime, setStartTime] = useState(0);
  /* time interval for alerts */
  const [altertInterval, setAlertInterval] = useState<number>(0);
  const [alertSecs, setAlertSecs] = useState<number>(0);
  const [alertMins, setAlertMins] = useState<number>(0);
  const [alertHr, setAlertHr] = useState<number>(0);

  const timerId = useRef<any>(null);

  // .........................................................................
  // .........................................................................

  /*converts secs to hr:min:sec for count up */
  function timeDisplay(totalSeconds: number) {
    const totalMinutes = Math.floor(totalSeconds / 60);

    const secs = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    setDisplaySeconds(secs);
    setDisplayMinutes(mins);
    setDisplayHours(hours);
  }

  /*converts secs to hr:min:sec for count down */
  function timeDisplayCountdown(totalSeconds: number) {
    if (totalSeconds <= 0) {
      stopTimer();
      setSeconds(0);
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
    let counter = 0;
    console.log(startTime);
    timerId.current = setInterval(() => {
      setSeconds((prev) => (prev += 1));
      if (altertInterval) {
        if (counter === altertInterval - 1) {
          console.log("alert!!!!");
        }
        if (counter === altertInterval) {
          counter = 0;
        }
        counter++;
        console.log(counter);
      }
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
  const countUpDown = (val: boolean) => {
    setCountUp(val);
    setSeconds(0);
  };

  /* sets start time for count down */
  const handleStartHours = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputHours(Number(event.target.value));
    resetTimer();
  };
  const handleStartMinutes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMinutes(Number(event.target.value));
    resetTimer();
  };
  const handleStartSeconds = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSeconds(Number(event.target.value));
    resetTimer();
  };

  const timeToSeconds = () => {
    setStartTime(inputHours * 3600 + inputMinutes * 60 + inputSeconds * 1);
  };

  /* sets alert interval time */
  const handleAlertHr = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlertHr(Number(event.target.value));
  };
  const handleAlertMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlertMins(Number(event.target.value));
  };
  const handleAlertSec = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlertSecs(Number(event.target.value));
  };

  const alertTimeToSeconds = () => {
    setAlertInterval(alertHr * 3600 + alertMins * 60 + alertSecs * 1);
  };

  const countDownAlert = () => {
    if (startTime - seconds === 0) {
      console.log("TIME'S UP!!!!");
      resetTimer();
    }
  };

  const clearAlertTime = () => {
    setAlertSecs(0);
    setAlertHr(0);
    setAlertMins(0);
  };

  const clearCountdownTime = () => {
    setInputHours(0);
    setInputMinutes(0);
    setInputSeconds(0);
  };

  // .........................................................................
  // .........................................................................

  /* watches seconds state and runs timeDisplay function everytime it changes */
  useEffect(() => {
    if (countUp) {
      timeDisplay(seconds);
    } else {
      timeDisplayCountdown(startTime - seconds);
      countDownAlert();
    }
  }, [seconds, startTime, countUp]);

  useEffect(() => {
    timeToSeconds();
  }, [inputHours, inputMinutes, inputSeconds]);

  useEffect(() => {
    alertTimeToSeconds();
  }, [alertHr, alertMins, alertSecs]);

  // .........................................................................
  // .........................................................................

  return (
    <div className="timer-container">
      <div className="d-flex justify-content-center">
        {countUp ? <p>Countdown</p> : <p>Stopwatch</p>}
        <ReactSwitch checked={countUp} onChange={countUpDown} />
      </div>

      {!start && !countUp ? (
        <form className="d-flex justify-content-center">
          <label>Hr:</label>
          <input
            type={"number"}
            value={inputHours}
            onChange={handleStartHours}
          />
          <label>Min:</label>
          <input
            type={"number"}
            value={inputMinutes}
            onChange={handleStartMinutes}
          />
          <label>Sec:</label>
          <input
            type={"number"}
            value={inputSeconds}
            onChange={handleStartSeconds}
          />
          <button
            onClick={clearCountdownTime}
            type="button"
            className="btn btn-danger me-3 btn-lg"
          >
            Clear
          </button>
        </form>
      ) : (
        ""
      )}

      {!start ? (
        <form className="d-flex justify-content-center">
          <label>alert every: </label>
          <label>Hr:</label>
          <input
            type={"number"}
            value={alertHr}
            onChange={handleAlertHr}
          />{" "}
          <label>Min:</label>
          <input
            type={"number"}
            value={alertMins}
            onChange={handleAlertMin}
          />{" "}
          <label>Sec:</label>
          <input
            type={"number"}
            value={alertSecs}
            onChange={handleAlertSec}
          />{" "}
          <button
            onClick={clearAlertTime}
            type="button"
            className="btn btn-danger me-3 btn-lg"
          >
            Clear
          </button>
        </form>
      ) : (
        <div>
          {" "}
          alert every: hr: {alertHr} : mins: {alertMins} : secs: {alertSecs}
        </div>
      )}

      <div className="d-flex justify-content-center p-5">
        time: {displayHours < 10 ? "0" + displayHours : displayHours}:
        {displayMinutes < 10 ? "0" + displayMinutes : displayMinutes}:
        {displaySeconds < 10 ? "0" + displaySeconds : displaySeconds}
      </div>

      <div className="buttons d-flex justify-content-center p-5">
        {start ? (
          <button
            onClick={stopTimer}
            type="button"
            className="btn btn-danger me-3 btn-lg"
          >
            Stop
          </button>
        ) : (
          <button
            onClick={startTimer}
            type="button"
            className="btn btn-primary me-3 btn-lg"
          >
            Start
          </button>
        )}
        <button
          onClick={resetTimer}
          type="button"
          className="btn btn-warning me-3 btn-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;
