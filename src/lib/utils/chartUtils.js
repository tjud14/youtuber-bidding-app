import { Chart, registerables } from 'chart.js';

// Register all the components we need
Chart.register(...registerables);

export default Chart;