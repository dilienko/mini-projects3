import "./index.css";

function ConverterButton({ to, from, setTo, setFrom }) {
    const changeValues = () => {
        let [newFrom, newTo] = [to, from];
        setFrom(newFrom);
        setTo(newTo);
    };

    return (
        <button onClick={changeValues} className='converter__button'>
            &#8644;
        </button>
    );
}

export default ConverterButton;
