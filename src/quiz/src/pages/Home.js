/* eslint-disable react-hooks/exhaustive-deps */
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import swal from "sweetalert";
import { AppContext } from "..";
import Greeting from "../components/Greeting";
import Quiz from "../components/Quiz";
import Result from "../components/Result";
import { offlineQuestions } from "../utils/questions";

function Home() {
    const { auth, database } = useContext(AppContext);
    const [step, setStep] = useState(-1);
    const [userAnswers, setUserAnswers] = useState([]);
    const [category, setCategory] = useState("");
    const [difficultyLvl, setDificultyLvl] = useState("");
    const [quizCode, setQuizCode] = useState("");
    const [optionsSelected, setOptionsSelected] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [authorTest, setAuthorTest] = useState(null);
    const [questions, setQuestions] = useState(offlineQuestions);

    useEffect(() => {
        getTest();
    }, [optionsSelected]);

    async function getTest() {
        if (optionsSelected && !quizCode) {
            loadRandomTest();
        } else if (optionsSelected && quizCode) {
            if (!auth.currentUser) {
                if (difficultyLvl && category) loadRandomTest();
                else {
                    swal({
                        title: "This quiz is only available to authorized user",
                        icon: "error",
                    });
                    resetState();
                }
            } else {
                setStep(step + 1);

                const isComplited = await getDoc(
                    doc(database, "users", auth.currentUser.uid, "tests", quizCode)
                );
                if (isComplited.exists()) {
                    swal({
                        title: "You have already completed this quiz",
                        icon: "error",
                    });
                    resetState();
                    return;
                }

                const test = await getDoc(doc(database, "tests", quizCode));
                if (!test.exists()) {
                    swal({
                        title: "You entered the wrong quiz code",
                        icon: "error",
                    });
                    resetState();
                    return;
                }
                const testData = test.data();
                setAuthorTest(testData);
                setQuestions(testData.questions);
                setIsLoaded(true);
            }
        }
    }

    const loadRandomTest = () => {
        setStep(step + 1);
        fetch(
            `https://the-trivia-api.com/api/questions?limit=10&difficulty=${difficultyLvl}&tags=${category}`
        )
            .then((response) => response.json())
            .then((result) => setQuestions(result))
            .catch(() => setQuestions(offlineQuestions))
            .finally(() => setIsLoaded(true));
    };

    const resetState = () => {
        setStep(-1);
        setUserAnswers([]);
        setCategory("");
        setDificultyLvl("");
        setQuizCode("");
        setOptionsSelected(false);
        setIsLoaded(false);
        setQuestions(offlineQuestions);
        setAuthorTest(null);
    };

    return (
        <div className='app-content'>
            {step === -1 ? (
                <Greeting
                    setOptionsSelected={setOptionsSelected}
                    category={category}
                    setCategory={setCategory}
                    difficultyLvl={difficultyLvl}
                    setDificultyLvl={setDificultyLvl}
                    quizCode={quizCode}
                    setQuizCode={setQuizCode}
                />
            ) : optionsSelected && !isLoaded ? (
                <div className='quiz-loader'>
                    <Bars height='80' width='80' color='#4fa94d' />
                </div>
            ) : step < questions.length ? (
                <Quiz
                    step={step}
                    setStep={setStep}
                    questions={questions}
                    userAnswers={userAnswers}
                    setUserAnswers={setUserAnswers}
                />
            ) : (
                <Result
                    questions={questions}
                    userAnswers={userAnswers}
                    testName={authorTest ? authorTest.testName : `${category}-${difficultyLvl}`}
                    resetState={resetState}
                    authorTest={authorTest}
                />
            )}
        </div>
    );
}

export default Home;
