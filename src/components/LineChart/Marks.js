import { useEffect, useRef } from 'react';
import { line, select, easeCubic } from 'd3';

export const Marks = ({data, xScale, yScale, xValue, yValue, groups, colorScale, hoverValue, fadeOpacity, seriesValue}) => {
    const arrangedData = (group) => data.filter((d) => d.Country === group);
    const lineRefs = useRef([]);
    const textRefs = useRef([]);

    useEffect(() => {
        groups.forEach((country, i) => {
            select(lineRefs.current[i])
            .attr('d', line()
                .x((d) => xScale(xValue(d)))
                .y((d) => yScale(yValue(d)))
                (arrangedData(country)));
            
            select(textRefs.current[i])
            .attr('x', xScale(xValue(arrangedData(country)[arrangedData(country).length - 1])))
            .attr('y', yScale(yValue(arrangedData(country)[arrangedData(country).length - 1])));
        });
    }, [groups]);

    useEffect(() => {
        groups.forEach((country, i) => {
            select(lineRefs.current[i])
            .transition()
            .duration(800)
            .ease(easeCubic)
            .attr('d', line()
                .x((d) => xScale(xValue(d)))
                .y((d) => yScale(yValue(d)))
                (arrangedData(country)));
            
            select(textRefs.current[i])
            .transition()
            .duration(800)
            .ease(easeCubic)
            .attr('x', xScale(xValue(arrangedData(country)[arrangedData(country).length - 1])))
            .attr('y', yScale(yValue(arrangedData(country)[arrangedData(country).length - 1])));
        });
    }, [seriesValue, groups]);

    return (
        groups.map((country, i) => (
            <g key={country} className='marks'>
                <path
                    stroke={colorScale(country)}
                    opacity={hoverValue && country !== hoverValue.Country ? fadeOpacity : 1}
                    ref={(ref) => lineRefs.current[i] = ref}
                />
                {hoverValue && country === hoverValue.Country ? 
                <g transform={`translate(${xScale(xValue(hoverValue))}, ${yScale(yValue(hoverValue))})`}>
                    <circle r={5} fill={colorScale(hoverValue.Country)} />
                    <text 
                        id='text-tooltip' 
                        fill={colorScale(hoverValue.Country)}
                        x={hoverValue.Year < 2011 ? 6 : -6} 
                        y={-5} 
                        textAnchor={hoverValue.Year < 2011 ? 'start' : 'end'}
                    >
                        {hoverValue.Country} in {xValue(hoverValue)}: {yValue(hoverValue)}
                    </text>
                </g>
                : null}
                <text 
                    id='text-line'
                    dx='.32em'
                    dy='.32em'
                    fill={colorScale(country)}
                    opacity={hoverValue && country !== hoverValue.Country ? fadeOpacity : 1}
                    ref={(ref) => textRefs.current[i] = ref}
                >
                    {country}
                </text>
            </g>
        ))
    );
};
