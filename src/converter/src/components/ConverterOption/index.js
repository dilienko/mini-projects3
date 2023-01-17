import Select from "react-select";
import "./index.css";

function ConverterOption({ value, setValue, label }) {
    const options = [
        {
            value: "USD",
            label: "USD - US Dollar",
            image: `.${process.env.PUBLIC_URL}/assets/images/USD.svg`,
        },
        {
            value: "UAH",
            label: "UAH - Ukrainian Hryvnia",
            image: `.${process.env.PUBLIC_URL}/assets/images/UAH.svg`,
        },
        {
            value: "EUR",
            label: "EUR - Euro",
            image: `.${process.env.PUBLIC_URL}/assets/images/EUR.svg`,
        },
    ];

    const handleChange = (e) => {
        setValue(e.value);
    };

    return (
        <div className='converter-options'>
            <label className='input-header'>{label}</label>
            <div className='converter-options-wrapper'>
                <Select
                    options={options}
                    formatOptionLabel={(currency) => (
                        <div className='currency__option'>
                            <img
                                src={currency.image}
                                alt='flag'
                                style={{ height: "2vh", aspectRatio: "4/3", marginRight: "3%" }}
                            />
                            <span>{currency.label}</span>
                        </div>
                    )}
                    className='converter-option'
                    isSearchable={false}
                    value={options.filter((option) => option.value === value)}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

export default ConverterOption;
