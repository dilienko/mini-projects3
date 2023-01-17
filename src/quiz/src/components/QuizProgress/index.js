import "./index.css";

function QuizProgress({ step, total }) {
    return (
        <div className='progress'>
            <div
                className='progress-line'
                style={{ width: `${Math.round((step / total) * 100)}%` }}
            ></div>
        </div>
    );
}

export default QuizProgress;
