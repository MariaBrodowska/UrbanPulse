// Re-export all chart functions from modular files
export { CHART_COLORS, CHART_BORDER_COLORS } from './utils/constants';
export { logarithmicScale, buildFilterUrl } from './utils/helpers';
export { 
    generateLineOrBarChart, 
    generatePieChart,
    generateMultiAxisLineChart,
    generateCorrelationScatterPlot,
    generateTimeSeriesInterestRatesChart
} from './generators';
