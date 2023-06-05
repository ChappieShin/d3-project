export const AxisBottom = ({xScale, innerHeight, tickOffset}) => (
    xScale.ticks().map((tickValue) => (
        <g className='tick' key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
            <line y2={innerHeight} />
            <text y={innerHeight + tickOffset} dy='.71em' textAnchor='middle'>{tickValue}</text>
        </g>
    ))
);
