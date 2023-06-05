export const AxisLeft = ({yScale, innerWidth, tickOffset}) => (
    yScale.ticks().map((tickValue) => (
        <g className='tick' key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
            <line x2={innerWidth} />
            <text x={-tickOffset} dy='.32em' textAnchor='end'>{tickValue}</text>
        </g>
    ))
);
