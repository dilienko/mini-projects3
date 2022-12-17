import React, { useEffect } from 'react'
import { useState } from "react"
import Select from 'react-select'
import './index.css'

function QuizSelect({options, label, setValue}){

    const handleChange = (e) => {
        setValue(e.value)
    }
    
    return (
        <Select options={
            options.map(e => ({value: e, label: e.toUpperCase()}))
        }
        placeholder={label}
        className='quiz-select'
        onChange={handleChange}
        isSearchable={false}
        defaultValue=''
        />

    );
}

export default QuizSelect


