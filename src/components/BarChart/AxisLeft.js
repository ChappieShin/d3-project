export const AxisLeft = ({yScale}) => (
    yScale.domain().map((domainValue) => (
        <g className='domain'>
            <text key={domainValue} x={-10} y={yScale(domainValue) + yScale.bandwidth()/2} dy='.32em' textAnchor='end'>{domainValue}</text>
        </g>
        
    ))
);
