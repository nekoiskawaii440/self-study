import React, { useState, useEffect } from "react";
import "./Timer.css";

function Timer() {
    const [remainingTime, setRemainingTime] = useState<number>(0); //デフォは3分
    const [inputMinute, setInputMinute] = useState<number>(0);
    const [inputSecond, setInputSecond] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [timerEnd, setTimerEnd] = useState<boolean>(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
    const seconds = (remainingTime % 60).toString().padStart(2, '0');
    const displayTime = `${minutes}:${seconds}`;

    const audio = new Audio("/sounds/alarm.mp3");

    const handleTimerStart = () => {
        audio.play().then(() => {
            audio.pause();
            audio.currentTime = 0;
        });
        if (inputSecond >= 60) {
            alert("秒は0〜59の間にしてください！🫵😮");
            return;
        }
        const total = inputMinute * 60 + inputSecond;
        if (total > 0) {
            setTimerEnd(false);
            if (intervalId !== null) {
                clearInterval(intervalId); // 前回のタイマーが残ってたら消す
            }
            setRemainingTime(total);
            setIsRunning(true);
            const id = setInterval(() => {
                setRemainingTime(prev => {
                    if (prev <= 1) {
                        clearInterval(id);
                        setIsRunning(false);
                        setTimerEnd(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            setIntervalId(id);
        }
    };

    useEffect(() => {
        if (timerEnd) {
            audio.play().catch((e) => {
                console.error("音声の再生に失敗しました:", e);
            });
            setShowModal(true);
        }
    }, [timerEnd]);

    const handleTimerStop = () => {
        setInputMinute(Math.floor(remainingTime / 60));
        setInputSecond(remainingTime % 60);
        if (intervalId !== null) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
        setIsRunning(false);
    };

    const handleTimerReset = () => {
        if (intervalId !== null) {
            clearInterval(intervalId);
        }
        setRemainingTime(inputMinute * 60 + inputSecond);
        setIntervalId(null);
        setIsRunning(false);
    };


    return (
        <div className="timer">
            <h2 className="title">Timer</h2>
            {isRunning ? (
                <>
                    <p>{displayTime}</p>
                    <button className="button" type="button" onClick={handleTimerStop}>停止</button>
                    <button className="button" type="button" onClick={handleTimerReset}>リセット</button>
                </>
            ) : (
                <>
                    <input
                        type="number"
                        value={inputMinute}
                        min="0"
                        onChange={(e) => setInputMinute(e.target.valueAsNumber)}
                        placeholder="分"
                    />
                    <input
                        type="number"
                        value={inputSecond}
                        min="0"
                        onChange={(e) => setInputSecond(e.target.valueAsNumber)}
                        placeholder="秒"
                    />
                    <button className="button" type="button" onClick={handleTimerStart}>開始</button>
                </>
            )}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Pew Pew Pew!!</h3>
                        <button onClick={() => setShowModal(false)}>CLOSE</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Timer;