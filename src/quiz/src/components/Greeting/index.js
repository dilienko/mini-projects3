
import swal from 'sweetalert'
import QuizSelect from '../QuizSelect'
import './index.css'

function Greeting({setOptionsSelected, category, setCategory, difficultyLvl, setDificultyLvl, quizCode, setQuizCode}){
    const categories = ['animals', 'art', 'biology', 'cities', 'film', 'history', 
        'literature', 'music', 'people', 'science', 'sport']

    const difficulty = ['easy', 'medium', 'hard']  
    
    
    const handleClick = () => {
        if((category && difficultyLvl) || quizCode){
            setOptionsSelected(true)
        }else{
            swal({title: "Select a category and difficulty level or enter quiz code", icon: 'error'})
        }
    }

    
    
    return (
        <div className='greeting'>
            <div className="greeting__logo">
                <img src={`.${process.env.PUBLIC_URL}/assets/images/logo.png`} alt='logo'/>
            </div>
            <h1 className="greeting__header">Welcome to QuizApp</h1>
            <p className="greeting__text">Select a quiz category and difficulty level or enter quiz code</p>
            <div className='greeting__selects'>
                <QuizSelect options={categories} label="Category" setValue={setCategory}/>
                <QuizSelect options={difficulty} label="Difficulty" setValue={setDificultyLvl}/>
            </div>
            <p className="greeting__text">OR</p>
            
            <input type="text" placeholder='Quiz Code' className='greeting__input'
            value={quizCode} onChange={(e) => setQuizCode(e.target.value.trim())}/>
            
            <button className='greeting__button' onClick={handleClick}>Start Quiz</button>
        </div>
    )
}
export default Greeting;