import { useState, useEffect } from 'react';

export const CountryCheckbox = ({options, value, onChange, colorScale}) => {
    const [selectAll, setSelectAll] = useState(true);

    const handleCheckboxChecked = (country, isChecked) => {
        let checkedCountries = [...value];
        if (isChecked) {
            checkedCountries.push(country);
        }
        else {
            checkedCountries = checkedCountries.filter((checked) => checked !== country);
        }
        onChange(checkedCountries);
    };

    const handleCheckboxAllChecked = (isChecked) => {
        setSelectAll(isChecked)
        if (isChecked) {
            onChange(options);
        }
        else {
            onChange([]);
        }
    };

    useEffect(() => {
        handleCheckboxAllChecked(selectAll);
    }, []);

    return (
        <div className='checkbox-container'>
            <p>Countries</p>
            <div className='checkbox'>
                <input 
                    type='checkbox' 
                    value={options} 
                    checked={selectAll}
                    onChange={(event) => handleCheckboxAllChecked(event.target.checked)}
                />
                <label>Select All</label>
            </div>
            {options.map((d) => (
                <div key={d} className='checkbox'>
                    <input 
                        type='checkbox' 
                        value={d} 
                        checked={value.includes(d)}  
                        onChange={(event) => handleCheckboxChecked(event.target.value, event.target.checked)}
                    />
                    <label style={{color: colorScale(d)}}>{d}</label>
                </div>
            ))}
        </div>
    );
};
