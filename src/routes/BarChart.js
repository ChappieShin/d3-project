import { useState } from 'react';
import { scaleLinear, scaleBand, scaleOrdinal, min, max } from 'd3';
import { DataLoading } from '../components/DataLoading';
import { AxisBottom } from '../components/BarChart/AxisBottom';
import { AxisLeft } from '../components/BarChart/AxisLeft';
import { ColorLegend } from '../components/BarChart/ColorLegend';
import { Marks } from '../components/BarChart/Marks';
import { YearSlider } from '../components/BarChart/YearSlider';
import { DataSummary } from '../components/BarChart/DataSummary';
import { SeriesDropdown } from '../components/BarChart/SeriesDropdown';
import '../components/BarChart/stylesBarChart.css';

const dataUrl = 'https://gist.githubusercontent.com/ChappieShin/d1c841a4b477d843248b9389c25f5649/raw/globalInflationDataset_v1.csv';

const width = 1440;
const height = 740;
const margin = { top: 40, bottom: 80, right: 380, left: 160 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const xAxisLabelOffset = 45;
const tickSpacing = 30;
const tickSize = 10;
const tickTextOffset = 20;
const fadeOpacity = 0.2;

export const BarChart = () => {
    const data = DataLoading(dataUrl);
    const [hoveredValue, setHoveredValue] = useState(null);
    const [tooltipValue, setTooltipValue] = useState(null);
    const [yearValue, setYearValue] = useState('2000');
    const [seriesValue, setSeriesValue] = useState('Headline Consumer Price Inflation');

    if (data) {
        const filteredData = data.filter((d) => d.Year === yearValue);
        const subgroups = data.columns.slice(2);
        const groups = filteredData.map((d) => d.Country);

        const yearMin = min(data, (d) => +d.Year);
        const yearMax = max(data, (d) => +d.Year);

        const maxValue = max(filteredData, (d) => {
            return Math.max(
                +d['Headline Consumer Price Inflation'], 
                +d['Energy Consumer Price Inflation'], 
                +d['Food Consumer Price Inflation'], 
                +d['Official Core Consumer Price Inflation'], 
                +d['Producer Price Inflation']
            );
        });

        const xScale = scaleLinear()
            .domain([0, maxValue])
            .range([0, innerWidth])
            .nice();
    
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
            <div className='barchart'>
                <svg width={width} height={height}>
                    <g transform={`translate(${margin.left}, ${margin.top})`}>
                        <AxisBottom 
                            xScale={xScale} 
                            innerHeight={innerHeight} 
                        />
                        <text className='axis-label' x={innerWidth / 2} y={innerHeight + xAxisLabelOffset} textAnchor='middle'>Inflation Rates</text>
                        <AxisLeft 
                            yScale={yScale} 
                        />
                        <g transform={`translate(${innerHeight + 330}, 60)`}>
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
                        <g transform={`translate(${innerHeight + 330}, 380)`}>
                            <text className='axis-label' x={35} y={-30} textAnchor='middle'>Summary</text>
                            <DataSummary 
                                data={filteredData} 
                                dropdownValue={seriesValue} 
                                colorScale={colorScale} 
                            />
                        </g>
                    </g>
                </svg>
                <YearSlider 
                    yearMin={yearMin} 
                    yearMax={yearMax} 
                    yearValue={yearValue} 
                    onYearValueChange={setYearValue}
                />
                <SeriesDropdown
                    options={subgroups}
                    value={seriesValue}
                    onChange={setSeriesValue}
                />
            </div>
        );
    } 
    else {
        return null;
    }
};
