import { minIndex, maxIndex, mean } from 'd3';

export const DataSummary = ({data, dropdownValue, colorScale}) => {
    const minDataIndex = minIndex(data, (d) => +d[dropdownValue]);
    const maxDataIndex = maxIndex(data, (d) => +d[dropdownValue]);
    const minData = data[minDataIndex][dropdownValue];
    const maxData = data[maxDataIndex][dropdownValue];
    const minCountry = data[minDataIndex].Country;
    const maxCountry = data[maxDataIndex].Country;
    const avgData = mean(data, (d) => +d[dropdownValue]);
    const yearData = data[0].Year;

    return (
        <g className='dataSummary-container' transform={`translate(0, 70)`}>
            <g transform={`translate(0, 10)`}>
                <text className='dataSummary-year' dy='.32em'>Year {yearData}</text>
                <circle fill={colorScale(dropdownValue)} r={17} cx={165} />
            </g>
            <g transform={`translate(0, 50)`}>
                <text className='dataSummary-rates' id='min-rate' dy='.32em'>Lowest Rates: {minData} {'('}{minCountry}{')'}</text>
            </g>
            <g transform={`translate(0, 80)`}>
                <text className='dataSummary-rates' id='max-rate' dy='.32em'>Highest Rates: {maxData} {'('}{maxCountry}{')'}</text>
            </g>
            <g transform={`translate(0, 110)`}>
                <text className='dataSummary-rates' id='avg-rate' dy='.32em'>Average Inflation Rates: {avgData.toFixed(2)}</text>
            </g>
        </g>
    );
};
