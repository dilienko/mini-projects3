import { useEffect, useState } from 'react'
import QuizSelect from '../QuizSelect'
import './index.css'

function Greeting({setOptionsSelected, category, setCategory, difficultyLvl, setDificultyLvl}){
    const categories = ['animals', 'art', 'biology', 'cities', 'film', 'history', 
        'literature', 'music', 'people', 'science', 'sport']

    const difficulty = ['easy', 'medium', 'hard']  
    
    //check selecrion category and difficulty level
    const handleClick = () => {
        if(category && difficultyLvl){
            setOptionsSelected(true)
        }
    }
    
    return (
        <div className='greeting'>
            <div className="greeting__logo">
                <img src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt='logo'/>
            </div>
            <h1 className="greeting__header">Welcome to QuizApp</h1>
            <p className="greeting__text">Select a quiz category and difficulty level</p>
            <div className='greeting__selects'>
                <QuizSelect options={categories} label="Category" setValue={setCategory}/>
                <QuizSelect options={difficulty} label="Difficulty" setValue={setDificultyLvl}/>
            </div>
            <button className='greeting__button' onClick={handleClick}>Start Quiz</button>
        </div>
    )
}
export default Greeting;