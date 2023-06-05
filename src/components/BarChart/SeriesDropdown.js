import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export const SeriesDropdown = ({options, value, onChange}) => (
    <div className='dropdown-container'>
        <label>Series:</label>
        <Dropdown 
            options={options} 
            value={value} 
            onChange={({value}) => onChange(value)} 
        />
    </div>
);
