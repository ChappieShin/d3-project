import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './routes/Home';
import { BarChart } from './routes/BarChart';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'

export const App = () => (
  <HashRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/bar_chart' element={<BarChart />} />
      {/* <Route path='/line_chart' element={<LineChart />} />
      <Route path='/scatter_plot' element={<ScatterPlot />} />
      <Route path='/choropleth_map' element={<ChoroplethMap />} /> */}
    </Routes>
    <Tooltip id='barChart-tooltip' />
  </HashRouter>
);
