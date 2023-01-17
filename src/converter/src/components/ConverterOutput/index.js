import "./index.css";

function ConverterOutput({ amount, from, to, result }) {
    return (
        <div className='converter-output'>
            <div className='converter-output__initial'>
                {`${Number(amount).toFixed(2)} ${from} =`}
            </div>
            <div className='converter-output__result'>{`${Number(result).toFixed(5)} ${to}`}</div>
        </div>
    );
}

export default ConverterOutput;
