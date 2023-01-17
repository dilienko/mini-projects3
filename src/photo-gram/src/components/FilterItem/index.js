import Select from "react-select";
import "./index.css";

function FilterItem({ options, value, setValue, setCurrentPage }) {
    const handleChange = (e) => {
        setValue(e.value);
        setCurrentPage(0);
    };

    return (
        <Select
            options={options}
            className='filter__select'
            isSearchable={false}
            value={options.filter((option) => option.value === value)}
            onChange={handleChange}
        />
    );
}

export default FilterItem;
