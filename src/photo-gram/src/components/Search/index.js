import { useState } from 'react';
import './index.css'

function Search({setQuery, setCurrentPage}){
    const [value, setValue] = useState('')
    const [wasSearch, setWasSearch] = useState(false)
    

    const handleChange = (e) =>{
        setWasSearch(false)
        setValue(e.target.value.trimStart().replace('  ', ' '))
    }

    const handleClick = () =>{
        if(wasSearch){
            setValue('')
            setQuery('')
            setCurrentPage(0)
            setWasSearch(false)
        }else{
            sendQuery()
        }
    }

    const sendQuery = () => {
        const searchQuery = value.trimEnd().split(' ').join('+').toLowerCase()
        setCurrentPage(0)
        setQuery(searchQuery)
        if(searchQuery !== '') setWasSearch(true)
    }

    return (
        <div className="search">
            <input type="text" className="search__input" placeholder="Search photos..."
            onKeyDown={e => {if(e.key === "Enter") sendQuery()}}
            value={value} onChange={handleChange}/>
            <button className="search__button"
            onClick={handleClick}>{wasSearch? 'x' : 'Search'}</button>
        </div>
    )
}

export default Search;