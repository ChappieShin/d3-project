import { useState } from 'react';
import { scaleLinear, scaleBand, scaleOrdinal, min, max } from 'd3';
import Dropdown from 'react-dropdown';
import { DataLoading } from '../components/DataLoading';
import { AxisBottom } from '../components/BarChart/AxisBottom';
import { AxisLeft } from '../components/BarChart/AxisLeft';
import { ColorLegend } from '../components/BarChart/ColorLegend';
import { Marks } from '../components/BarChart/Marks';
import { YearSlider } from '../components/BarChart/YearSlider';
import { DataSummary } from '../components/BarChart/DataSummary';
import '../components/BarChart/stylesBarChart.css';
import 'react-dropdown/style.css';

const width = 1440;
const height = 740;
const margin = { top: 50, bottom: 470, right: 30, left: 150 };
const innerWidth = width - margin.top - margin.bottom;
const innerHeight = height - margin.right - margin.left;
const xAxisLabelOffset = 45;
const tickSpacing = 30;
const tickSize = 10;
const tickTextOffset = 20;
const fadeOpacity = 0.2;

export const BarChart = () => {
    const data = DataLoading();
    const [hoveredValue, setHoveredValue] = useState(null);
    const [tooltipValue, setTooltipValue] = useState(null);
    const [yearValue, setYearValue] = useState('2000');
    const [serieValue, setSerieValue] = useState('Headline Consumer Price Inflation');

    if (data) {
        const filteredData = data.filter((d) => d['Year'] === yearValue);
        const subgroups = data.columns.slice(2);
        const groups = filteredData.map((d) => d.Country);

        const yearMin = parseInt(min(data, (d) => d.Year));
        const yearMax = parseInt(max(data, (d) => d.Year));

        const maxValue = max(filteredData, (d) => {
            return Math.max(
                d['Headline Consumer Price Inflation'], 
                d['Energy Consumer Price Inflation'], 
                d['Food Consumer Price Inflation'], 
                d['Official Core Consumer Price Inflation'], 
                d['Producer Price Inflation']
            );
        });

        const xScale = scaleLinear()
            .domain([0, maxValue])
            .range([0, innerWidth]);
    
        const yScale = scaleBand()
            .domain(groups)
            .range([0, innerHeight])
            .padding([0.2]);

        const ySubgroup = scaleBand()
            .domain(subgroups)
            .range([0, yScale.bandwidth()])
            .padding([0.2]);

        const colorScale = scaleOrdinal()
            .domain(subgroups)
            .range(['#e3ba22', '#e6842a', '#137b80', '#8e6c8a', '#978f80']);
        
        return (
            <>
                <svg width={width} height={height}>
                    <g transform={`translate(${margin.left}, ${margin.top})`}>
                        <AxisBottom xScale={xScale} innerHeight={innerHeight} />
                        <AxisLeft yScale={yScale} />
                        <text className='axis-label' x={innerWidth/2} y={innerHeight + xAxisLabelOffset} textAnchor='middle'>Inflation Rates</text>
                        <g transform={`translate(${innerHeight + 410}, 60)`}>
                            <text className='axis-label' x={50} y={-30} textAnchor='middle'>Series Name</text>
                            <ColorLegend 
                                colorScale={colorScale} 
                                tickSpacing={tickSpacing} 
                                tickSize={tickSize} 
                                tickTextOffset={tickTextOffset} 
                                onHover={setHoveredValue} 
                                hoveredValue={hoveredValue} 
                                fadeOpacity={fadeOpacity} 
                            />
                        </g>
                        <Marks 
                            data={filteredData} 
                            subgroups={subgroups} 
                            xScale={xScale} 
                            yScale={yScale} 
                            ySubgroup={ySubgroup} 
                            colorScale={colorScale} 
                            hoveredValue={hoveredValue} 
                            fadeOpacity={fadeOpacity}
                            onTooltip={setTooltipValue}
                            tooltipValue={tooltipValue}
                        />
                        <g transform={`translate(${innerHeight + 410}, 360)`}>
                            <text className='axis-label' x={35} y={-30} textAnchor='middle'>Summary</text>
                            <DataSummary data={filteredData} dropdownValue={serieValue} colorScale={colorScale} />
                        </g>
                    </g>
                </svg>
                <YearSlider 
                    yearMin={yearMin} 
                    yearMax={yearMax} 
                    yearValue={yearValue} 
                    onYearValueChange={setYearValue}
                />
                <div className='dropdown-container'>
                    <label>Series:</label>
                    <Dropdown options={subgroups} value={serieValue} onChange={({value}) => setSerieValue(value)} />
                </div>
            </>
        );
    } 
    else {
        return null;
    }
};
