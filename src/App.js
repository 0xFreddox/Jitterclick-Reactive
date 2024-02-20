import React, { useState, useEffect } from "react";
const App = () => {


    /* Vettori di stato */
    const [jitterCount, setJitterCount] = useState(0);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    

      useEffect(() => {
        const intervalId = setInterval(() => {
            if (timerRunning) {
                setTimer(prevTimer => prevTimer + 1);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timerRunning]);
    
    useEffect(() => {
        if (jitterCount > 0 && !timerRunning) {
            setTimerRunning(true);
        }
    }, [jitterCount]);
    
    useEffect(() => {
        if(timer === 10){
            setTimerRunning(false);
            if(jitterCount >= 80){
                alert("Cavolo sei veloce! " );
            } else {
                alert("Sei Un pò lento, continua a cliccare!");
            }
        }
    }, [timer, jitterCount]);
    
    const handleButtonClick = () => {
        setJitterCount(prevCount => {
            const newCount = prevCount + 1;
            if (newCount % 10 === 0) {
                setScore(prevScore => prevScore + 100);
            }
            return newCount;
        });
    };
    
    const seconds = timer % 60;
    
    return (
        <div className="app-container">
            <a href="#" className="loginLink">Login</a>
            <div className="box-timer">
                <p className="timerText">{seconds < 10 ? '' + seconds : seconds}</p>
            </div>
            <button className="btnClick" onClick={handleButtonClick} disabled={timer === 10}>
                {jitterCount}
            </button>
            <div className="box-cps"><p>Score: {score}</p></div>
        </div>
    );
}

export default App;
