import { useState } from "react";
import QuizProgress from "../QuizProgress";
import QuizQuestion from "../QuizQuestion";
import QuizTimer from "../QuizTimer";

function Quiz({ step, setStep, questions, userAnswers, setUserAnswers }) {
    const [chosenAnswer, setChosenAnswers] = useState("");

    const toNextQuestion = () => {
        setUserAnswers([...userAnswers, chosenAnswer]);
        setChosenAnswers("");
        setStep(step + 1);
    };

    return (
        <>
            <QuizProgress step={step + 1} total={questions.length} />
            <QuizTimer toNextQuestion={toNextQuestion} step={step} />
            <QuizQuestion question={questions[step]} setChosenAnswers={setChosenAnswers} />
            <div className='btn-wrapper btn_pos_right'>
                <button className='quiz-button quiz-button_color_green' onClick={toNextQuestion}>
                    Next
                </button>
            </div>
        </>
    );
}

export default Quiz;
