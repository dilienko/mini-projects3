import { useEffect, useState } from "react";
import "./index.css";

function QuizTimer({ toNextQuestion, step }) {
    const [seconds, setSeconds] = useState(60);

    useEffect(() => {
        const timerID = setInterval(() => {
            if (seconds === 0) toNextQuestion();
            setSeconds(seconds - 1);
        }, 1000);
        return () => clearInterval(timerID);
    }, [seconds]);

    //restart timer after change question
    useEffect(() => setSeconds(60), [step]);

    return (
        <div className='quiz-timer-wrapper'>
            <div className='quiz-timer'>{seconds}</div>
        </div>
    );
}

export default QuizTimer;
