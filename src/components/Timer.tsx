import react, { useState, useRef, useEffect } from "react";
import ReactSwitch from "react-switch";
import ".././App.css";
import alarm from "../png/alarm.png"
import stopwatch from "../png/stopwatch.png"
import useSound from "use-sound";
import Ding from "../audiofiles/Ding.mp3"
import schoolbell from "../audiofiles/schoolbell.mp3"
import ALARM from "../audiofiles/ALARM.wav"
import ALERT1 from "../audiofiles/ALERT1.wav"
import useStayAwake from "use-stay-awake";


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
  const [displayAlertHr, setDisplayAlertHr] = useState<number>(0);
  const [displayAlertMin, setDisplayAlertMin] = useState<number>(0);
  const [displayAlertSec, setDisplayAlertSec] = useState<number>(0);





  const timerId = useRef<any>(null);
  const device = useStayAwake()

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
    device.preventSleeping()
    let counter = 0;
    let counterDown = startTime 
    timerId.current = setInterval(() => {
      setSeconds((prev) => (prev += 1));
      if (altertInterval) {
        if (startTime){
        if ((counter === altertInterval - 1) && (counterDown > 1)) {  
          new Audio(ALERT1).play()
          console.log("alert!!!!");
       
        }} else {
          if ((counter === altertInterval - 1)) {  
            new Audio(ALERT1).play()
            console.log("alert!!!!");
         
          }

        }
        if (counter === altertInterval) {
          counter = 0;
        }
        counter++;
        counterDown -= 1
        
      }
    }, 1000);

    setStart(true);
  };

  /* stops the counter */
  const stopTimer = () => {
    device.allowSleeping()
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
    setInputHours(Number(event.target.value)*1);
    resetTimer();
  };
  const handleStartMinutes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMinutes(Number(event.target.value)*1);
    resetTimer();
  };
  const handleStartSeconds = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSeconds(Number(event.target.value)*1);
    resetTimer();
  };

  const timeToSeconds = () => {
    setStartTime(inputHours * 3600 + inputMinutes * 60 + inputSeconds * 1);
  };

  /* sets alert interval time */
  const handleAlertHr = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlertHr(Number(event.target.value)*1);
  };
  const handleAlertMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlertMins(Number(event.target.value)*1);
  };
  const handleAlertSec = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlertSecs(Number(event.target.value)*1);
  };

  const alertTimeToSeconds = () => {
    setAlertInterval(alertHr * 3600 + alertMins * 60 + alertSecs * 1);
  };

  function alertTimeDisplay(totalSeconds: number) {
    const totalMinutes = Math.floor(totalSeconds / 60);

    const secs = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    setDisplayAlertSec(secs);
    setDisplayAlertMin(mins);
    setDisplayAlertHr(hours);
  }
  

  const countDownAlert = () => {
    if ((startTime - seconds === 0) && (seconds !== 0)) {
       
      new Audio(ALARM).play()
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

  useEffect(() => {
    alertTimeDisplay(altertInterval)
  },[altertInterval])

  

  // .........................................................................
  // .........................................................................

  return (


    
    <div className="timer-container">

      
    
      <div className="switch">
        <div className="switchText">{countUp ? <p>Switch to Countdown</p> : <p>Switch to Stopwatch</p>}</div>
        <ReactSwitch   checked={countUp} onChange={countUpDown}   
        onColor="#7bb702"
        offColor="#ffffff"
        onHandleColor="#ffffff"
        offHandleColor="#7bb702"
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
            <img style={{height: "12px"}} src={stopwatch}/>
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

      
<div className="alertContainer">
      {!start ? (
        <form >
         <div> <label>alert every: </label></div>
         <div><label>Hr:</label>
          <input className="inputBox"
            type={"number"}
            // value = {altertInterval ? alertHr : undefined}
            // placeholder= {altertInterval ? undefined : "00"}
            // {altertInterval ? {value = alertHr} : {placeholder = "00"}}
            {...(altertInterval) ?  {value : alertHr} : {placeholder : "00"}}
            onChange={handleAlertHr}
          />{" "}</div> 
         <div className="mins"> <label>Min:</label>
          <input className="inputBox"
            type={"number"}
            // value = {altertInterval ? alertMins : undefined}
            // placeholder= {alertMins ? undefined : "00"}
            {...(altertInterval) ?  {value : alertMins} : {placeholder : "00"}}
            onChange={handleAlertMin}
          />{" "}</div> 
         <div className="secs"> <label>Sec:</label>
          <input className="inputBox"
            type={"number"}
            // value = {altertInterval ? alertSecs : undefined}
            // placeholder= {alertSecs? undefined : "00"}
            {...(altertInterval) ?  {value : alertSecs} : {placeholder : "00"}}
            onChange={handleAlertSec}
          />{" "}</div> 
         <div> <button id="clearbutton"
            onClick={clearAlertTime}
            type="button"
            className=""
          >
            Clear
          </button> </div> 
        </form>
      ) : (
        <div>
          <div>alert every: </div> <div>hr: {displayAlertHr < 10 ? "0" + displayAlertHr : displayAlertHr}</div> <div> mins: {displayAlertMin < 10 ? "0" + displayAlertMin : displayAlertMin}  </div> <div> secs: {displayAlertSec < 10 ? "0" + displayAlertSec : displayAlertSec} </div>
        </div>
      )}</div>
     <div id="timeandbuttons">
      <div id="displayTime" className="d-flex justify-content-center p-5">
        {displayHours < 10 ? "0" + displayHours : displayHours}:
        {displayMinutes < 10 ? "0" + displayMinutes : displayMinutes}:
        {displaySeconds < 10 ? "0" + displaySeconds : displaySeconds}

        
      </div>

      <div className="buttons">
        {start ? (
          <button id="stopbutton"
            onClick={stopTimer}
            type="button"
            className=""
          >
            Stop
          </button>
        ) : (
          <button id="startbutton"
            onClick={startTimer}
            type="button"
            className=""
          >
            Start
          </button>
        )}
        <button id="resetbutton"
          onClick={resetTimer}
          type="button"
          className=""
        >
          Reset
        </button>
      </div>


      {!start && !countUp ? (
        <div className="countdownContainer">
          <div id="fade"> <label>start countdown from: </label></div>
        <form >
          <div id="fade" className="inputboxes">
          <div id="fade"><label>Hr:</label>
          <input id="fade" className="inputBox"
            type={"number"}
            value = {startTime ? inputHours : undefined}
            placeholder= {inputHours ? undefined : "00"}
            
            onChange={handleStartHours}
            
          /></div>
          <div id="fade" className="mins"><label>Min:</label>
          <input id="fade" className="inputBox"
            type={"number"}
            
            value = {startTime ? inputMinutes : undefined}
            placeholder= {inputMinutes ? undefined : "00"}
            onChange={handleStartMinutes}
          /></div>
         <div id="fade" className="secs"> <label>Sec:</label>
         <input id="fade" className="inputBox"
            type={"number"}
            value = {startTime ? inputSeconds : undefined}
            placeholder= {inputSeconds ? undefined : "00"}
            onChange={handleStartSeconds}
          /></div></div>
         <div id="fade"><button id="clearbutton"
            onClick={clearCountdownTime}
            type="button"
            className=""
          >
            Clear
          </button></div>
        </form>
        </div>
      ) : (
        ""
      )}

     
    </div>
    
    </div> 
  );
}

export default Timer;
