import { useState } from "react";
import { motion } from "framer-motion";
import TestData from "../TestData";
import { testVariants, toggleVariants } from "../../utils/animateVariants";
import "./index.css";

function UserTest({ test, index, recursion, name }) {
    const [isVisible, setIsVisible] = useState(false);

    const setVisible = () => {
        setIsVisible((prev) => !prev);
    };

    return (
        <motion.div
            variants={testVariants}
            initial='initial'
            animate='animate'
            custom={index}
            className='test'
            onClick={setVisible}
        >
            <div className='test-info'>
                <p className='test__name'> {name === "test" ? test.testName : test.user}</p>
                <p className='test__result'>
                    {recursion ? test.id : `${test.correctAnswers}/${test.questionAmount}`}
                </p>
                <span className='test__date'>{new Date(test.date).toLocaleString()}</span>
                <motion.span
                    variants={toggleVariants}
                    className='test__result'
                    initial='initial'
                    animate={isVisible ? "animate" : "initial"}
                    transition={{ duration: 0.4 }}
                    style={{ visibility: recursion ? "hidden" : "visible" }}
                >
                    {">"}
                </motion.span>
            </div>

            {recursion ? (
                <>
                    {test.userAnswers
                        .sort((a, b) => b.date - a.date)
                        .map((userAnswer, index) => {
                            return (
                                <UserTest
                                    test={userAnswer}
                                    index={index}
                                    recursion={false}
                                    name={"user"}
                                    key={userAnswer.date}
                                />
                            );
                        })}
                </>
            ) : (
                <TestData isVisible={isVisible} test={test} />
            )}
        </motion.div>
    );
}

export default UserTest;
