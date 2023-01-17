import { doc, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { useContext, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AppContext } from "..";
import InputError from "../components/InputError";
import NewQuestion from "../components/NewQuestion";
import "./styles/test-creator.css";

function TestCreator() {
    const { auth, database } = useContext(AppContext);

    const [questionsAmount, setQuestionamount] = useState(1);

    const navigator = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        criteriaMode: "all",
        defaultValues: {
            questions: [{ question: "", answers: ["", "", "", ""], correctAnswer: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "questions",
    });

    const addQuestion = () => {
        append({ question: "", answers: ["", "", "", ""], correctAnswer: "" });
        setQuestionamount((prev) => prev + 1);
    };

    const onSubmit = (data) => {
        const questions = data.questions.map((question) => {
            return {
                ...question,
                correctAnswer: question.answers[Number(question.correctAnswer)],
            };
        });
        const test = {
            id: nanoid(10),
            testName: data.testName,
            questions: questions,
            author: auth.currentUser.uid,
            date: Date.now(),
        };

        setDoc(doc(database, "tests", test.id), test)
            .then(() => {
                setDoc(
                    doc(database, "users", `${auth.currentUser.uid}`, "createdTests", `${test.id}`),
                    test
                )
                    .then(() => {
                        swal({
                            title: `Test was successfully created`,
                            icon: "success",
                        }).then(() => {
                            navigator("/profile");
                        });
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => {
                swal({ title: "Failed to created test", icon: "error" });
            });
    };

    return (
        <div className='app-content'>
            <h1 className='form__header'>Create Quiz</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    placeholder='Quiz Title'
                    className='creator-input-title'
                    autoComplete='off'
                    {...register("testName", {
                        onChange: (e) => (e.target.value = e.target.value.trimStart()),
                        required: "This field is required",
                        validate: {
                            length: (e) =>
                                e.split(" ").length <= 10 ||
                                "Title length should not exceed 10 words",
                        },
                    })}
                />
                <InputError name='testName' errors={errors} />

                <ul className='created-questions'>
                    {fields.map((item, index) => {
                        return (
                            <NewQuestion
                                register={register}
                                key={item.id}
                                item={item}
                                index={index}
                                errors={errors}
                                remove={remove}
                                questionsAmount={questionsAmount}
                                setQuestionamount={setQuestionamount}
                            />
                        );
                    })}
                </ul>

                <div className='form-buttons'>
                    <button
                        type='button'
                        onClick={addQuestion}
                        className='quiz-button quiz-button_color_gray form-btn'
                    >
                        Add Question
                    </button>

                    <button type='submit' className='quiz-button quiz-button_color_green form-btn'>
                        Create Quiz
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TestCreator;
