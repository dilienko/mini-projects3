import { useEffect, useMemo, useState } from 'react'
import './index.css'

function QuizQuestion({question, setChosenAnswers}){
    const answers = question.answers || [...question.incorrectAnswers, question.correctAnswer].sort((a, b) => a.localeCompare(b))
    const [activeAnswer, setActiveAnswer] = useState({0: '', 1: '', 2: '', 3: ''})

    const handleClick = (answer, index) =>{
        setChosenAnswers(answer)
        setActiveAnswer(Object.assign({}, 
            {0: '', 1: '', 2: '', 3: ''}, {[index]: 'active'}))
    }

    //reset answer`s styles after change question
    useEffect(() => setActiveAnswer({0: '', 1: '', 2: '', 3: ''}), [question])

    return (
        <>
            <div className='question__text'>{question.question}</div>
            <div className='question__answers'>
                {answers.map((answer, index) => {
                    return (
                    <div className={`question__answer answer_${activeAnswer[index]}`}
                    key={answer}
                    onClick={() => handleClick(answer, index)}
                    >{answer}</div>)
                })}
                
            </div>
        </>
    )
}

export default QuizQuestion;