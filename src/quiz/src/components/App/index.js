import './index.css'
import { Bars } from  'react-loader-spinner'
import Quiz from '../Quiz'
import Result from '../Result'
import Greeting from '../Greeting'
import { offlineQuestions } from './questions';
import { useEffect, useState } from 'react';

function App() {
    const [step, setStep] = useState(-1)
    const [userAnswers, setUserAnswers] = useState([])
    const [category, setCategory] = useState('')
    const [difficultyLvl, setDificultyLvl] = useState('')
    const [optionsSelected, setOptionsSelected] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    const [questions, setQuestions] = useState(offlineQuestions)

    useEffect(() => {
        if(optionsSelected){
            setStep(step + 1)
            fetch(`https://the-trivia-api.com/api/questions?limit=10&difficulty=${difficultyLvl}&tags=${category}`)
            .then(response => response.json())
            .then(result => {
                setQuestions(result)
            })
            .catch(() => {
                setQuestions(offlineQuestions)
            })
            .finally(() => {
                setIsLoaded(true)
            })
        }
    }, [optionsSelected])

    return (
        <div className='app'>
            {(step == -1)?
             <Greeting setOptionsSelected={setOptionsSelected} category={category}
             setCategory={setCategory} difficultyLvl={difficultyLvl}
             setDificultyLvl={setDificultyLvl}/> :

            (optionsSelected && !isLoaded)? 
            <div className='quiz-loader'>
                <Bars height="80" width="80"
                color="#4fa94d"/>
            </div>:

            (step < questions.length)? 
            <Quiz step={step} setStep={setStep} questions={questions}
            userAnswers={userAnswers} setUserAnswers={setUserAnswers}/> :

            <Result questions={questions} userAnswers={userAnswers}/>
        }
        </div>
    )
}

export default App;