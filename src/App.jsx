import './App.css'
import React, { useState, useEffect } from 'react'
import CRTEffect from 'vault66-crt-effect';//Crt Shaders
import "vault66-crt-effect/dist/vault66-crt-effect.css"; //CRT Shaders
import codec from './assets/images/mg2_msx/ui_elements/codec_image.png';
import portraitSnake from './assets/images/mg2_msx/ui_elements/snake-portrait.png';
import portraitFox from './assets/images/mg2_msx/ui_elements/fox-portrait.png';
import portraitHolly from './assets/images/mg2_msx/ui_elements/holly-portrait.png';
import portraitCampbell from './assets/images/mg2_msx/ui_elements/campbell-portrait.png';
import textBlock from './assets/images/mg2_msx/ui_elements/text-block.png';

function App() {
  // ------------------------------
  // CONSTANTS & STATE
  // ------------------------------
  const INITIAL_TIME = 1500; // 25 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);// Holds the current countdown time (in seconds)
  const [isRunning, setIsRunning] = useState(false);   // Tracks if the timer is currently running
  // ------------------------------
  // FUNCTIONS
  // ------------------------------
  // Toggle the timer between start and pause
  function toggleTimer() {
    setIsRunning(prev => !prev); // Flip the boolean value
  }
  // Stop the timer completely and reset the countdown
  function stopTimer() {
    setIsRunning(false); // Stop the timer
    setTimeLeft(INITIAL_TIME); // Reset to initial time
  }
  // ------------------------------
  // EFFECT: Countdown logic
  // ------------------------------
  useEffect(() => {
    if (!isRunning) return; // If timer is not running, do nothing
    // Start interval to count down every second
    const intervalId = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Stop at 0 and clear interval
          clearInterval(intervalId);
          setIsRunning(false); // Pause timer when done
          return 0;
        }
        return prev - 1; // Decrease time by 1 second
      });
    }, 1000); // Every 1000 ms = 1 second
    return () => clearInterval(intervalId); // Cleanup: clear interval when component unmounts or timer stops
  }, [isRunning]); // Only re-run when isRunning changes
  // ------------------------------
  // TIME FORMATTING
  // ------------------------------
  // Convert seconds into MM:SS format
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  // ------------------------------
  // RENDER
  // ------------------------------
  return (
    <CRTEffect preset="minimal"><div className="wrapper">
      <h1>Soliton Pomodoro Timer</h1>
      {/* Timer display */}
      {/* <div className='codec-portrait-container'>
      </div> */}
      <div className="timer-display">
        {minutes}:{seconds}
      </div>
      {/* LEFT CODEC SLOT  <img> */}
      <div className="codec-slot-l">
      <img src={codec} alt="Codec L" className="codec-frame" />
      <img src={portraitSnake} alt="Snake" className="codec-portrait"/>
      </div>
      {/* RIGHT CODEC SLOT  <img> */}
      <div className="codec-slot-r">
      <img src={codec} alt="Codec R" className="codec-frame" />
      <img src={portraitFox} alt="Fox" className="codec-portrait" />
      <img src={portraitHolly} alt="Holly" className="codec-portrait" />
      <img src={portraitCampbell} alt="Campbell" className="codec-portrait" />
      </div>

      {/* Buttons & Container*/}
      <div className="button-container">
        <button className="button" onClick={toggleTimer}>
          {isRunning ? 'PAUSE' : 'START'}
        </button>
        <button className="button" onClick={stopTimer}>
          STOP
        </button>
      </div>
      {/* TEXT CONTAINER*/}
      <div className="text-container">
        <img src={textBlock} className="textBlock" alt="Text Block" />
      </div>


    </div></CRTEffect>
      );
    }

export default App;
