import { Delaunay } from 'd3-delaunay';

export const VoronoiOverlay = ({data, xScale, yScale, xValue, yValue, innerWidth, innerHeight, onHover}) => {
    const points = data.map((d) => [xScale(xValue(d)), yScale(yValue(d))]);
    const delaunay = Delaunay.from(points);
    const voronoi = delaunay.voronoi([0, 0, innerWidth, innerHeight]);
     
    return (
        <g className='voronoi'>
            {points.map((point, i) => (
                <path 
                    key={i} 
                    d={voronoi.renderCell(i)} 
                    onMouseEnter={() => onHover(data[i])} 
                    onMouseLeave={() => onHover(null)} 
                />
            ))}
        </g>
    );
};
