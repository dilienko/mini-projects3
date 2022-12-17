import './index.css'

function ConverterInput({amount, setAmount,from}) {

    const handleClick =  (e) => {
        let value = e.target.value.replace(',', '.')
        let numParts = value.split('.').map(e => e.length)
        //Number can contain up to 11 digits and 22 digits after decimal point
        if(numParts[0] > 11 || numParts[1] > 2) return
        //check for number
        if(/^([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(value) 
        || value=='') setAmount(value || '')
    }

    return(
        <div className='converter-amount'>
            <label className='input-header'>Amount</label>
            <div className='converter-amount__wrapper'>
                <div className={`converter-amount__sign-${from}`}></div>
                <input type="text" className='converter-amount__field'
                value={amount} 
                onChange={e => handleClick(e)}
                />
            </div>
            
        </div>
    )
}

export default ConverterInput;