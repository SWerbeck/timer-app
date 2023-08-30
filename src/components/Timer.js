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
    let counter = 0
    timerId.current = setInterval(() => {
      setSeconds((prev) => (prev += 1));
      if (altertInterval){
        if (counter === altertInterval-1){
          console.log("alert!!!!")
        }
        if (counter === altertInterval){
          
          counter = 0
        }
        counter++
        console.log(counter)
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
  const countUpDown = (event) => {
    if (event.target.value === "countDown"){
      setCountUp(false)
    } else if (event.target.value === "stopwatch"){
      setCountUp(true)
    }
  
   
    
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
    setStartTime((inputHours * 3600) + (inputMinutes * 60) + (inputSeconds * 1));

  };

    /* sets alert interval time */
    const handleAlertHr = (event) => {
      setAlertHr(event.target.value);
    };
    const handleAlertMin = (event) => {
      setAlertMins(event.target.value);
    };
    const handleAlertSec = (event) => {
      setAlertSecs(event.target.value);
    };

    const alertTimeToSeconds = () => {
      setAlertInterval((alertHr * 3600) + (alertMins * 60) + (alertSecs *1));
  
    };
     
    const countDownAlert = () => {
      if (startTime - seconds === 0){
        console.log("TIME'S UP!!!!")
        resetTimer()
      }
    }



// .........................................................................
// .........................................................................



  /* watches seconds state and runs timeDisplay function everytime it changes */
  useEffect(() => {
    if (countUp) {
      timeDisplay(seconds);
    } else {
      timeDisplayCountdown(startTime - seconds);
      countDownAlert()
    }

  }, [seconds]);

  useEffect(() => {
    timeToSeconds();
  }, [inputHours, inputMinutes, inputSeconds]);

  useEffect(() => {
    alertTimeToSeconds();
  }, [alertHr, alertMins, alertSecs]);


  // .........................................................................
  // .........................................................................



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


 {!start ? (
        <form>
          <label>alert every:  </label>
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
        </form>
      ) : (
       <p> alert every:  hr: {alertHr} : mins: {alertMins} : secs: {alertSecs}  </p>    )}

      <label>Stopwatch / Count Down: </label>
      <select value={countUp} onChange={countUpDown}>
        <option value={"stopwatch"}>Stopwatch</option>
        <option value={"countDown"}>Count Down</option>
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
