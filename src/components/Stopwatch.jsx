import React, { useState, useEffect } from 'react';
import "../assets/css/stopwatch.css";
import Lap from './Lap';

function Stopwatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [lapseTime, setLapseTime] = useState("");
    const [lastStartTime, setLastStartTime] = useState(null);

    useEffect(() => {
        let intervalId = null;

        if (isRunning) {
            // If starting, set lastStartTime if not set
            if (lastStartTime === null) {
                setLastStartTime(Date.now());
            }
            intervalId = setInterval(() => {
                setElapsedTime(prevElapsed => {
                    if (lastStartTime !== null) {
                        return prevElapsed + (Date.now() - lastStartTime);
                    }
                    return prevElapsed;
                });
                setLastStartTime(Date.now());
            }, 10);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [isRunning, lastStartTime]);

    function startOrStop() {
        if (!isRunning) {
            setIsRunning(true);
            setLastStartTime(Date.now());
        } else {
            setIsRunning(false);
            setLastStartTime(null);
        }
    }

    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
        setLapseTime("");
        setLastStartTime(null);
    }

    function lapse() {
        if (!isRunning) return;
        setLapseTime(formatTime());
    }

    function formatTime() {
        let totalElapsed = elapsedTime;
        if (isRunning && lastStartTime !== null) {
            totalElapsed += Date.now() - lastStartTime;
        }

        let hours = Math.floor(totalElapsed / (1000 * 60 * 60));
        let minutes = Math.floor((totalElapsed / (1000 * 60)) % 60);
        let seconds = Math.floor((totalElapsed / 1000) % 60);
        let milliseconds = Math.floor((totalElapsed % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }

    return (
        <div className="stopwatch">
            <div className="stopwatch-box">
                <div className="display">{formatTime()}</div>
                <div className="buttons">
                    {
                        !isRunning
                            ? <button className='start-button' onClick={startOrStop}>Start</button>
                            : <button className='stop-button' onClick={startOrStop}>Stop</button>
                    }
                    <button onClick={reset} className="reset-button">Reset</button>
                    <button className='lapse-button' onClick={lapse}>Lap</button>
                </div>
            </div>
            <Lap time={lapseTime} />
        </div>
    );
}

export default Stopwatch;