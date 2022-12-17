import React, { useEffect, useState } from "react";
import ConverterButton from "../ConverterButton";
import ConverterInput from "../ConverterInput";
import ConverterOption from "../ConverterOption";
import './index.css'
import { offlineRates } from "./currencyRate";
import { ThreeDots } from  'react-loader-spinner'
import ConverterOutput from "../ConverterOutput";




function App() {
    const [amount, setAmount] = useState('1')
    const [from, setFrom] = useState('USD')
    const [to, setTo] = useState('UAH')
    const [exchangeRate, setExchangeRate] = useState([])
    const codes = {USD: 840, UAH: 980, EUR: 978}
    const [result, setResult] = useState(0)
    const [wasLoaded, setWasLoaded] = useState(false)

    useEffect(() => {
        if(wasLoaded) convertCurrency()
    }, [to, from, amount, wasLoaded])

    // get exchange rate on page load
    useEffect(() => {
        fetch('https://api.monobank.ua/bank/currency')
            .then(response => response.json())
            .then(result => {
                setExchangeRate(result.splice(0,3))
            })
            .catch(() => {
                setExchangeRate(offlineRates)
            })
            .finally(() => setWasLoaded(true))
    }, [])


    const convertCurrency = () => {
        //if currencies are the same, result - input value
        if (to === from){
            setResult(amount)
            return
        }
        //select currency rate
        let currencyRate = [...exchangeRate].filter(e => {
            let values = Object.values(e)
            return values.includes(codes[from]) && values.includes(codes[to])
        })[0]
        // choose buy or sell rate
        if(currencyRate.currencyCodeA == codes[from]){
            setResult(amount * currencyRate.rateBuy)
        }else {
            setResult(amount / currencyRate.rateSell)
        }
    }
    
    return (
        <div className="app">
            <div className="app__input">
                <ConverterInput amount={amount} setAmount={setAmount} from={from}/>
                <ConverterOption value={from} setValue={setFrom} label= {'From'}/>
                <ConverterButton to={to} from={from} setTo={setTo} setFrom={setFrom}/>
                <ConverterOption value={to} setValue={setTo} label= {'To'}/>
            </div> 
            {wasLoaded? 
            <ConverterOutput amount={amount} to={to} from={from} result={result}/>
            : <ThreeDots height="50" width="50" radius="8.5" color="#229b22" 
            wrapperClass="converter-output" />}
            
        </div>
    )
}

export default App;