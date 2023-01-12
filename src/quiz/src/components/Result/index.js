import './index.css'
import { doc, setDoc } from "firebase/firestore"; 
import { useContext } from 'react';
import { AppContext } from '../..';

function Result ({questions, userAnswers, testName, resetState, authorTest}){
    const correctAnswers = userAnswers.filter((e, i, arr) => {
     return arr[i] === questions[i].correctAnswer  
    }).length
    const questionAmount = questions.length 

    const {auth, database} = useContext(AppContext)
    const testId = authorTest? authorTest.id : String(Date.now())

    if(auth.currentUser){
        const testData = {
            testName: testName,
            user: auth.currentUser.displayName,
            id: testId,
            date: Date.now(),
            questions: questions.map(question => {
                return {
                    question: question.question,
                    answers: question.answers || [...question.incorrectAnswers, question.correctAnswer].sort((a, b) => a.localeCompare(b)),
                    correctAnswer: question.correctAnswer
                }
            }),
            userAnswers: userAnswers,
            correctAnswers: correctAnswers,
            questionAmount: questionAmount
        }

       setDoc(doc(database, "users", `${auth.currentUser.uid}`, 'tests', testId), testData); 
       if(authorTest){
         setDoc(doc(database, `users/${authorTest.author}/createdTests/${testId}/usersAnswer/${auth.currentUser.uid}`), testData); 
       }

       
    }
    

    return (
        <div className="result">
            <div className="result__header">Quiz Result</div>
            <div className="result__logo">
                <img src={`.${process.env.PUBLIC_URL}/assets/images/result.png`} alt='logo'/>
            </div>
            <h2 className="result__score-header">Your Score:</h2>
            <h1 className="result__score">{`${correctAnswers} / ${questionAmount}`}</h1>
            <button  className='result__button' onClick={resetState}>New Quiz</button>
        </div>
    )
}

export default Result;