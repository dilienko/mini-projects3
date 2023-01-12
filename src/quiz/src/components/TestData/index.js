import { motion, AnimatePresence} from 'framer-motion'
import './index.css'

function TestData({test, isVisible}){
    const CORRECT_ANSWER = 'lightgreen'
    const INCORRECT_ANSWER = '#f36767'

    return(
        <AnimatePresence>
            {
                isVisible 
                &&
                <motion.div className="test-data" 
                    initial={{height: 0, opacity: 0}}
                    animate={{height: "auto", opacity: 1}}
                    exit={{height: 0, opacity: 0}}
                    style={{overflow: 'hidden'}}
                    transition={{duration: 0.5}}
                    >
        
                    {test.questions.map((item, index) => {
                        const userAnswer = test.userAnswers[index] !== '' ? [test.userAnswers[index]] :
                        item.answers.filter(answer => answer !== item.correctAnswer)
                        
                        return(
                            <div className="test__question" key={item.question + index}>
                                <p className="test__question-text" key={item.question}>{`${index + 1}. ${item.question}`}</p>
                                {item.answers.map((answer) => {
                                    const answerColor = answer === item.correctAnswer? CORRECT_ANSWER:
                                    userAnswer.includes(answer)? INCORRECT_ANSWER : 'white'
                                    const fontColor = answerColor === INCORRECT_ANSWER? 'black' : 'black'
                                    return(
                                        <p className="test__answer" 
                                        key={answer}
                                        style={{
                                            backgroundColor: answerColor,
                                            color: fontColor
                                        }}
                                        >{answer}</p>
                                    )
                                })}
                            </div>
                        )
                    })}
                </motion.div>
            }
        </AnimatePresence>
        
    )
}

export default TestData;