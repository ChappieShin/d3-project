export const ColorLegend = ({colorScale, tickSpacing, tickSize, tickTextOffset, onHover, hoveredValue, fadeOpacity}) => (
    colorScale.domain().map((domainValue, i) => (
        <g 
            className='domain' 
            transform={`translate(0, ${i * tickSpacing})`}
            onMouseEnter={() => {onHover(domainValue)}}
            onMouseLeave={() => {onHover(null)}}
            opacity={hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1}
        >
            <circle fill={colorScale(domainValue)} r={tickSize} />
            <text x={tickTextOffset} dy='.32em'>{domainValue}</text>
        </g>
    ))
);
