export const YearSlider = ({yearMin, yearMax, yearValue, onYearValueChange}) => {
  const yearRange = Array.from({length: (yearMax - yearMin) + 1}, (value, index) => yearMin + index);

  return (
    <div className='slider-container'>
      <p>Year</p>
      <label>{yearMin}</label>
      <input 
        className='slider' 
        type='range' 
        min={yearMin} 
        max={yearMax} 
        step={1} 
        value={+yearValue} 
        onChange={(event) => onYearValueChange(event.target.value)} 
        list='ticks'
      />
      <label>{yearMax}</label>
      <datalist id='ticks'>
        {yearRange.map((d) => (
          <option key={d} value={d} />
        ))}
      </datalist>
    </div>
  );
};
