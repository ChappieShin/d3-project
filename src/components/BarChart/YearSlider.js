export const YearSlider = ({yearMin, yearMax, yearValue, onYearValueChange, data}) => (
  <div className='slider-container'>
    <p>Year</p>
    <label>{yearMin}</label>
    <input className='slider' type='range' min={yearMin} max={yearMax} step={1} value={parseInt(yearValue)} onChange={(event) => onYearValueChange(event.target.value)} list='ticks' />
    <label>{yearMax}</label>
    <datalist id='ticks'>
      {data.map((d) => (
        <option value={d.Year}></option>
      ))}
    </datalist>
  </div>
);
