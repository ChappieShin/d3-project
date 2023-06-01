import { Link } from 'react-router-dom';
import '../css/stylesNavbar.css';

export const Navbar = () => (
    <nav>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/bar_chart'>Bar Chart</Link></li>
            <li><Link to='/line_chart'>Line Chart</Link></li>
            <li><Link to='/scatter_plot'>Scatter Plot</Link></li>
            <li><Link to='/choropleth_map'>Choropleth Map</Link></li>
        </ul>
    </nav>
);
