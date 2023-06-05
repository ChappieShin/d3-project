import { useState, useCallback } from 'react';
import { scaleLinear, scaleOrdinal, extent, schemeTableau10 } from 'd3';
import { DataLoading } from '../components/DataLoading';
import { AxisBottom } from '../components/LineChart/AxisBottom';
import { AxisLeft } from '../components/LineChart/AxisLeft';
import { Marks } from '../components/LineChart/Marks';
import { VoronoiOverlay } from '../components/LineChart/VoronoiOverlay';
import { CountryCheckbox } from '../components/LineChart/CountryCheckbox';
import { SeriesDropdown } from '../components/LineChart/SeriesDropdown';
import '../components/LineChart/stylesLineChart.css';

const dataUrl = 'https://gist.githubusercontent.com/ChappieShin/d1c841a4b477d843248b9389c25f5649/raw/globalInflationDataset_v1.csv';

const width = 1440;
const height = 740;
const margin = { top: 40, bottom: 80, right: 380, left: 100 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const tickOffset = 7;
const xAxisLabelOffset = 47;
const yAxisLabelOffset = 42;
const fadeOpacity = 0.2;

export const LineChart = () => {
    const data = DataLoading(dataUrl);
    const [seriesValue, setSeriesValue] = useState('Headline Consumer Price Inflation');
    const selectedColumns = ['Country', 'Year', seriesValue];
    const [countryValue, setCountryValue] = useState([]);
    const [hoveredValue, setHoveredValue] = useState(null);

    const handleDropdown = useCallback((d) => setSeriesValue(d), []);
    const handleCheckbox = useCallback((d) => setCountryValue(d), []);
    const handleHover = useCallback((d) => setHoveredValue(d), []);
    
    if (data) {
        const filteredSeriesData = data.map((d) => Object.fromEntries(
            Object.entries(d).filter(([key, value]) => selectedColumns.includes(key))
        ));
        const filteredCountryData = filteredSeriesData.filter((d) => countryValue.includes(d.Country));

        const countries = [...new Set(data.map((d) => d.Country))];
        const series = data.columns.slice(2);
        
        const xAxisLabel = 'Year';
        const xValue = (d) => +d.Year;
        const xRange = extent(filteredSeriesData, xValue);

        const yAxisLabel = 'Inflation Rates';
        const yValue = (d) => +d[seriesValue];
        const yRange = extent(filteredSeriesData, yValue);

        const xScale = scaleLinear()
            .domain([xRange[0], xRange[1] + 2])
            .range([0, innerWidth])
            .nice();

        const yScale = scaleLinear()
            .domain(yRange)
            .range([innerHeight, 0])
            .nice();

        const colorScale = scaleOrdinal()
            .domain(countries)
            .range(schemeTableau10);

        return (
            <div className='linechart'>
                <svg width={width} height={height}>
                    <g transform={`translate(${margin.left}, ${margin.top})`}>
                        <AxisBottom 
                            xScale={xScale} 
                            innerHeight={innerHeight} 
                            tickOffset={tickOffset} 
                        />
                        <text className='axis-label' x={innerWidth / 2} y={innerHeight + xAxisLabelOffset} textAnchor='middle'>{xAxisLabel}</text>
                        <AxisLeft 
                            yScale={yScale} 
                            innerWidth={innerWidth} 
                            tickOffset={tickOffset} 
                        />
                        <text className='axis-label' transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`} textAnchor='middle'>{yAxisLabel}</text>
                        <Marks 
                            data={filteredCountryData} 
                            xScale={xScale} 
                            yScale={yScale} 
                            xValue={xValue} 
                            yValue={yValue} 
                            groups={countryValue} 
                            colorScale={colorScale} 
                            hoverValue={hoveredValue} 
                            fadeOpacity={fadeOpacity}
                            seriesValue={seriesValue}
                        />
                        <VoronoiOverlay 
                            data={filteredCountryData} 
                            xScale={xScale} 
                            yScale={yScale} 
                            xValue={xValue} 
                            yValue={yValue} 
                            innerWidth={innerWidth} 
                            innerHeight={innerHeight} 
                            onHover={handleHover} 
                        />
                    </g>
                </svg>
                <CountryCheckbox
                    options={countries}
                    value={countryValue}
                    onChange={handleCheckbox}
                    colorScale={colorScale}
                />
                <SeriesDropdown
                    options={series}
                    value={seriesValue}
                    onChange={handleDropdown}
                />
            </div>
        );
    }
    else {
        return null;
    }
};
