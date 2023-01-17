import InputError from "../InputError";

function NewAnswer({ register, index, i, errors }) {
    return (
        <li>
            <div className='new-answer'>
                <input
                    type='radio'
                    value={i}
                    {...register(`questions.${index}.correctAnswer`, {
                        required: "Choose correct answer",
                    })}
                />

                <input
                    placeholder={`Answer ${i + 1}`}
                    className='creator-input-answer'
                    autoComplete='off'
                    {...register(`questions.${index}.answers.${i}`, {
                        onChange: (e) => {
                            e.target.value = e.target.value.trimStart();
                        },
                        required: "This field is required",
                    })}
                />
            </div>
            <InputError name={`questions.${index}.answers.${i}`} errors={errors} />
        </li>
    );
}

export default NewAnswer;
