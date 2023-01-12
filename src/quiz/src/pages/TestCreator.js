import { useContext, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import swal from 'sweetalert'
import { doc, setDoc } from "firebase/firestore";
import InputError from "../components/InputError";
import { AppContext } from "..";
import './styles/test-creator.css'



function TestCreator() {
    const {auth, database } = useContext(AppContext)

    const [questionsAmount, setQuestionamount] = useState(1)

    const navigator = useNavigate()

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        criteriaMode: "all",
        defaultValues: {
            questions: [{ question: "", answers:  [ '' , '', '', ''], correctAnswer: ""}]
        }
    });

    const { fields, append, remove} = useFieldArray({ control,
        name: "questions"
    });

    const addQuestion = () => {
        append({ question: "", answers:  [ '' , '', '', ''], correctAnswer: ""})
        setQuestionamount(prev => prev + 1)
    }

    const removeQuestion = (index) => {
        if(questionsAmount === 1){
            swal({title: "Test must contain at least 1 question", icon: "error"})
        } else {
            remove(index)
            setQuestionamount(prev => prev - 1)
        }
        
        
    }

    const onSubmit = (data) => {
        const questions = data.questions.map(question => {
            return {...question,
                 correctAnswer: question.answers[Number(question.correctAnswer)]
                }
        })
        const test = {
            id: nanoid(10),
            testName: data.testName,
            questions: questions,
            author: auth.currentUser.uid,
            date: Date.now()
        }
        

        setDoc(doc(database, "tests", test.id), test)
            .then(() => {
                setDoc(doc(database, "users", `${auth.currentUser.uid}`, 'createdTests', `${test.id}`), test)
                .then(() => {
                    swal({title: `Test was successfully created`, icon: "success"}).then(() => {
                    navigator('/profile')  
                    })
                })
                .catch((err) => console.log(err))
            })
            .catch((err) => {
                swal({title: "Failed to created test", icon: "error"})
                console.log(err)
            })


    }

  

    return(
        <div className="app-content">
            <h1 className="form__header">Create Quiz</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="Quiz Title" 
                className="creator-input-title" autoComplete="off"
                {...register('testName', {
                    onChange: e => e.target.value = e.target.value.trimStart(),
                    required: 'This field is required',
                    validate: {
                        length: e => e.split(' ').length <= 10 || "Title length should not exceed 10 words"
                    }

                })}/>
                <InputError name='testName' errors={errors}/>

                <ul className="created-questions">{
                    fields.map((item, index) => {
                        return (
                            <li className="new-question" key={item.id}>
                                <div className="new-question__header">
                                    <h1 className="new-question__header-text">{`Question ${index+1}`}</h1>
                                    <button type="button" className="new-question__header-button"
                                     onClick={() => removeQuestion(index)}>Delete</button>
                                </div>
                                
                                <input placeholder="Question" 
                                className="creator-input-question" autoComplete="off"
                                {...register(`questions.${index}.question`, {
                                    onChange: e => e.target.value = e.target.value.trimStart(),
                                    required: 'This field is required'
                                })}/>
                                <InputError name={`questions.${index}.question`} errors={errors}/>
                                <ul className="created-answers">
                                    {
                                        Array(4).fill(0).map((e, i) => {
                                            
                                            return (
                                                <li key={`question_${item.id}answer_${i+1}`}>
                                                    <div className="new-answer"> 
                                                        <input
                                                        type="radio"
                                                        value= {i}
                                                        {...register(`questions.${index}.correctAnswer`, {required: "Choose correct answer"})}
                                                        />
                                                                                                
                                                        <input placeholder={`Answer ${i+1}`} 
                                                        className="creator-input-answer" autoComplete="off"
                                                        {...register(`questions.${index}.answers.${i}`, {
                                                            onChange: e => {
                                                                e.target.value = e.target.value.trimStart();
                                                            },
                                                            required: 'This field is required'
                                                        })}/>      
                                                    </div>
                                                    <InputError name={`questions.${index}.answers.${i}`} errors={errors}/>
        
                                                </li>
                                            )
                                        })
                                    }
                                   
                                </ul>
                                
                                <InputError name={`questions.${index}.correctAnswer`} errors={errors}/>

                             </li>
                        )
                    })}
                </ul>

                <div className="form-buttons">
                    <button type="button" onClick={addQuestion} 
                    className="quiz-button quiz-button_color_gray form-btn">Add Question</button>

                    <button type="submit" className="quiz-button quiz-button_color_green form-btn">Create Quiz</button>
                </div>
                
                
            </form>
        </div>
    )
}

export default TestCreator;