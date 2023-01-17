import swal from "sweetalert";
import InputError from "../InputError";
import NewAnswer from "../NewAnswer";

function NewQuestion({
    register,
    item,
    index,
    errors,
    remove,
    questionsAmount,
    setQuestionamount,
}) {
    const removeQuestion = (index) => {
        if (questionsAmount === 1) {
            swal({
                title: "Test must contain at least 1 question",
                icon: "error",
            });
        } else {
            remove(index);
            setQuestionamount((prev) => prev - 1);
        }
    };

    return (
        <li className='new-question'>
            <div className='new-question__header'>
                <h1 className='new-question__header-text'>{`Question ${index + 1}`}</h1>
                <button
                    type='button'
                    className='new-question__header-button'
                    onClick={() => removeQuestion(index)}
                >
                    Delete
                </button>
            </div>

            <input
                placeholder='Question'
                className='creator-input-question'
                autoComplete='off'
                {...register(`questions.${index}.question`, {
                    onChange: (e) => (e.target.value = e.target.value.trimStart()),
                    required: "This field is required",
                })}
            />
            <InputError name={`questions.${index}.question`} errors={errors} />
            <ul className='created-answers'>
                {Array(4)
                    .fill(0)
                    .map((e, i) => {
                        return (
                            <NewAnswer
                                key={`question_${item.id}answer_${i + 1}`}
                                i={i}
                                index={index}
                                register={register}
                                errors={errors}
                            />
                        );
                    })}
            </ul>

            <InputError name={`questions.${index}.correctAnswer`} errors={errors} />
        </li>
    );
}

export default NewQuestion;
