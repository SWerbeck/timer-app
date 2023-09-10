import { React, useState, useRef, useEffect } from "react";
import ReactSwitch from "react-switch";
import ".././App.css";
import alarm from "/Users/stephenwerbeck/projects/timer-app/src/png/alarm.png"

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
  const [countUp, setCountUp] = useState(true);
  /* start time when counting down */
  const [startTime, setStartTime] = useState(0);
  /* time interval for alerts */
  const [altertInterval, setAlertInterval] = useState(0);
  const [alertSecs, setAlertSecs] = useState(0);
  const [alertMins, setAlertMins] = useState(0);
  const [alertHr, setAlertHr] = useState(0);

  const timerId = useRef();

  // .........................................................................
  // .........................................................................

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
  const countUpDown = (val) => {
    setCountUp(val);
    setSeconds(0);
  };

  /* sets start time for count down */
  const handleStartHours = (event) => {
    setInputHours(event.target.value * 1);
    resetTimer();
  };
  const handleStartMinutes = (event) => {
    setInputMinutes(event.target.value * 1);
    resetTimer();
  };
  const handleStartSeconds = (event) => {
    setInputSeconds(event.target.value * 1);
    resetTimer();
  };

  const timeToSeconds = () => {
    setStartTime(inputHours * 3600 + inputMinutes * 60 + inputSeconds * 1);
  };

  /* sets alert interval time */
  const handleAlertHr = (event) => {
    setAlertHr(event.target.value * 1);
  };
  const handleAlertMin = (event) => {
    setAlertMins(event.target.value * 1);
  };
  const handleAlertSec = (event) => {
    setAlertSecs(event.target.value * 1);
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
        <ReactSwitch 
        checked={countUp} onChange={countUpDown}   
        onColor="#ffdfe"
        onHandleColor="#2693e6"
        handleDiameter={30}
        uncheckedIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              
              
            }}
          >
            <img style={{height: "12px"}} src={alarm}/>
          </div>
        }
        checkedIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              
              
            }}
          >
            <img style={{height: "12px"}} src={alarm}/>
          </div>
        }
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={20}
        width={48} 
        className="switch" />
      </div>

      {!start && !countUp ? (
        <form  className="d-flex justify-content-center">
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
<div className="input">
      {!start ? (
        <form className="d-flex justify-content-center">
          <label id="alertEvery">Alert Every </label>
          <label className="inputTextWhite">Hr:</label>
          <input
            type={"number"}
            value={alertHr}
            onChange={handleAlertHr}
          />{" "}
          <label className="inputTextWhite">Min:</label>
          <input
            type={"number"}
            value={alertMins}
            onChange={handleAlertMin}
          />{" "}
          <label className="inputTextWhite">Sec:</label>
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
        <div className="inputText">
          {" "}
          <p id="alertEvery">Alert Every </p> hr: {alertHr} : mins: {alertMins} : secs: {alertSecs}
        </div>
      )} </div>

      <div  id="displayTime">
       {displayHours < 10 ? "0" + displayHours : displayHours}:
        {displayMinutes < 10 ? "0" + displayMinutes : displayMinutes}:
        {displaySeconds < 10 ? "0" + displaySeconds : displaySeconds}
      </div>

      <div className="buttons d-flex justify-content-center p-5">
        {start ? (
          <button id="stop"
            onClick={stopTimer}
            type="button"
            className="btn btn-danger me-3 btn-lg"
          >
            Stop
          </button>
        ) : (
          <button id="start"
            onClick={startTimer}
            type="button"
            className="btn btn-primary me-3 btn-lg"
          >
            Start
          </button>
        )}
        <button id="reset"
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
