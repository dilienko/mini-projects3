import './index.css'

function Result ({questions, userAnswers}){
    const correctAnswers = userAnswers.filter((e, i, arr) => {
     return arr[i] === questions[i].correctAnswer  
    }).length
    const questionAmount = questions.length 


    return (
        <div className="result">
            <div className="result__header">Quiz Result</div>
            <div className="result__logo">
                <img src={`${process.env.PUBLIC_URL}/assets/images/result.png`} alt='logo'/>
            </div>
            <h2 className="result__score-header">Your Score:</h2>
            <h1 className="result__score">{`${correctAnswers} / ${questionAmount}`}</h1>
            <a href='/' className='result__button'>New Quiz</a>
        </div>
    )
}

export default Result;