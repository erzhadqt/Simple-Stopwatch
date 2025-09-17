import React, {useState, useEffect, useRef} from 'react';
import "../assets/css/stopwatch.css";
import Lap from './Lap';

function Stopwatch(){

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);
    const [lapseTime, setLapseTime] = useState("");

    useEffect(() => {

        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }

    }, [isRunning]);

    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop(){
        setIsRunning(false);
    }

    function reset(){
        setElapsedTime(0);
        setIsRunning(false);
        setLapseTime("");
    }

    function lapse(){
        if(!isRunning) return;
        setLapseTime(formatTime());
    }

    function formatTime(){

        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${hours}:${minutes}:${seconds}:${milliseconds}`;

    }

    return(
        <div className="stopwatch">
            <div className="stopwatch-box">
                <div className="display">{formatTime()}</div>

                <div className="buttons">
                <button onClick={start} className="start-button">{isRunning ? "stop": "Start"}</button>
                <button onClick={stop} className="stop-button">Stop</button>
                <button onClick={reset} className="reset-button">Reset</button>
                <button className='lapse-button' onClick={lapse}>Lap</button>

                </div>
            </div>

            <Lap time={lapseTime}/>
            


        </div>
        
        
    );

}
export default Stopwatch;