import { useEffect, useRef } from 'react';
import { select, easeCubic } from 'd3';

export const Marks = ({data, subgroups, xScale, yScale, ySubgroup, colorScale, hoveredValue, fadeOpacity, onTooltip, tooltipValue}) => {
    const rectRefs = useRef([]);
    
    useEffect(() => {
        if (rectRefs.current.every((row) => row.every((ref) => ref))) {
            rectRefs.current.forEach((row, i) => {
                row.forEach((ref, j) => {
                    select(ref)
                    .transition()
                    .duration(800)
                    .ease(easeCubic)
                    .attr('width', xScale(data[i][subgroups[j]]));
                });
            });
        }
    }, [data, xScale]);

    return (
        data.map((d, i) => (
            <g key={d.Country} transform={`translate(0, ${yScale(d.Country)})`}>
                {subgroups.map((subgroup, j) => (
                    <rect 
                        key={`${d.Country}-${subgroup}`} 
                        x={0} 
                        y={ySubgroup(subgroup)} 
                        width={0} 
                        height={ySubgroup.bandwidth()} 
                        fill={colorScale(subgroup)}
                        opacity={((hoveredValue && subgroup !== hoveredValue) || (tooltipValue && d[subgroup] !== tooltipValue)) ? fadeOpacity : 1}
                        onMouseEnter={() => onTooltip(d[subgroup])}
                        onMouseLeave={() => onTooltip(null)}
                        data-tooltip-id='barChart-tooltip'
                        data-tooltip-html={`Country: <strong>${d.Country}</strong> <br /> Year: <strong>${d.Year}</strong> <br /> Inflation Rates: <strong>${d[subgroup]}</strong>`}
                        ref={(ref) => {!rectRefs.current[i] ? rectRefs.current[i] = [] : rectRefs.current[i][j] = ref}}
                    />
                ))}
            </g>
        ))
    );
};
