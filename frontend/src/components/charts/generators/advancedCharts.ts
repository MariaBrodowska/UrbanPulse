import type { PopulationData, InterestRateData, MeterData, MultiAxisChartData, ScatterPlotData, TimeSeriesInterestRateData } from '../types';
import { CHART_COLORS, CHART_BORDER_COLORS } from '../utils/constants';
import {
    calculateAveragesByYear,
    processPopulationData,
    processInterestRateData,
    processMeterData,
    createDataset,
    createYAxis,
    processDataForLabels,
    processDataForScatterPlot,
    getAxisLabels,
    processInterestRateDataForTimeSeries
} from '../utils/dataProcessors';

// Wykres Liniowy/Słupkowy Wieloosiowy - każdy zestaw danych ma swoją oś Y
export const generateMultiAxisLineChart = (
    populationDataInput: PopulationData[],
    interestRateData: InterestRateData[],
    meterData: MeterData[],
    selectedDatasets: { population: boolean; interestRates: boolean; meterData: boolean },
    useLogarithmicScale: boolean = false
): MultiAxisChartData => {
    const datasets = [];
    let allLabels: string[] = [];
    let colorIndex = 0;
    const yAxes: { [key: string]: { label: string; position: 'left' | 'right'; color: string } } = {};

    if (selectedDatasets.population && populationDataInput.length > 0) {
        const groupedData = processPopulationData(populationDataInput);
        const averageData = calculateAveragesByYear(groupedData);
        const processedData = processDataForLabels(averageData, allLabels);

        const label = useLogarithmicScale ? 'Population (Avg, Log Scale)' : 'Population (Avg)';
        const dataset = createDataset(label, processedData, colorIndex, 'y-population', useLogarithmicScale);
        datasets.push(dataset);

        const yAxisLabel = useLogarithmicScale ? 'Population (Log Scale)' : 'Population';
        yAxes['y-population'] = createYAxis(yAxisLabel, 'left', colorIndex);
        colorIndex++;
    }

    if (selectedDatasets.interestRates && interestRateData.length > 0) {
        const groupedData = processInterestRateData(interestRateData);
        const averageData = calculateAveragesByYear(groupedData);
        const processedData = processDataForLabels(averageData, allLabels);

        const label = useLogarithmicScale ? 'Interest Rates (% Avg, Log Scale)' : 'Interest Rates (% Avg)';
        const dataset = createDataset(label, processedData, colorIndex, 'y-interest', useLogarithmicScale);
        datasets.push(dataset);

        const yAxisLabel = useLogarithmicScale ? 'Interest Rates (% Log Scale)' : 'Interest Rates (%)';
        yAxes['y-interest'] = createYAxis(yAxisLabel, 'right', colorIndex);
        colorIndex++;
    }

    if (selectedDatasets.meterData && meterData.length > 0) {
        const groupedData = processMeterData(meterData);
        const averageData = calculateAveragesByYear(groupedData);
        const processedData = processDataForLabels(averageData, allLabels);

        const label = useLogarithmicScale ? 'Meter Data (Avg Price, Log Scale)' : 'Meter Data (Avg Price)';
        const dataset = createDataset(label, processedData, colorIndex, 'y-meter', useLogarithmicScale);
        datasets.push(dataset);

        const position = Object.keys(yAxes).length === 0 ? 'left' : 'right';
        const yAxisLabel = useLogarithmicScale ? 'Price (Log Scale)' : 'Price';
        yAxes['y-meter'] = createYAxis(yAxisLabel, position, colorIndex);
        colorIndex++;
    }

    // Sortowanie etykiet i mapowanie danych
    allLabels = [...new Set(allLabels)].sort();
    
    const mappedDatasets = datasets.map(dataset => ({
        ...dataset,
        data: allLabels.map(label => dataset.data[label] || 0)
    }));

    return {
        labels: allLabels,
        datasets: mappedDatasets,
        yAxes
    };
};

// Wykres Punktowy (Scatter Plot) - pokazuje korelację między dwoma zmiennymi
export const generateCorrelationScatterPlot = (
    populationDataInput: PopulationData[],
    interestRateData: InterestRateData[],
    meterData: MeterData[],
    xAxisData: 'population' | 'interestRates' | 'meterData',
    yAxisData: 'population' | 'interestRates' | 'meterData',
    useLogarithmicScale: boolean = false
): ScatterPlotData => {
    // Process all data using reusable function
    const processedData = processDataForScatterPlot(populationDataInput, interestRateData, meterData);

    // Create scatter points
    const scatterPoints: Array<{ x: number; y: number; year: string }> = [];
    
    Object.keys(processedData).forEach(year => {
        const yearData = processedData[year];
        if (yearData[xAxisData] !== undefined && yearData[yAxisData] !== undefined) {
            let xValue = yearData[xAxisData]!;
            let yValue = yearData[yAxisData]!;

            // Apply logarithmic scaling if enabled
            if (useLogarithmicScale) {
                if (xValue > 0) xValue = Math.log10(xValue) + 1;
                if (yValue > 0) yValue = Math.log10(yValue) + 1;
            }

            scatterPoints.push({
                x: xValue,
                y: yValue,
                year
            });
        }
    });

    // Get axis labels using helper function
    const axisLabels = getAxisLabels(useLogarithmicScale);

    return {
        datasets: [{
            label: `${axisLabels[yAxisData]} vs ${axisLabels[xAxisData]}`,
            data: scatterPoints,
            backgroundColor: CHART_COLORS[0],
            borderColor: CHART_BORDER_COLORS[0],
            pointRadius: 6,
            pointHoverRadius: 8
        }],
        xAxisLabel: axisLabels[xAxisData],
        yAxisLabel: axisLabels[yAxisData]
    };
};

// Time Series Interest Rates Chart - pokazuje stopy procentowe w czasie z dokładnymi datami
export const generateTimeSeriesInterestRatesChart = (
    interestRateData: InterestRateData[]
): TimeSeriesInterestRateData => {
    const processedData = processInterestRateDataForTimeSeries(interestRateData);
    
    // Create datasets for each rate type
    const rateTypes = Object.keys(processedData);
    const datasets = rateTypes.map((rateType, index) => {
        const typeData = processedData[rateType];
        
        return {
            label: `${rateType}`,
            data: typeData.map(item => ({
                x: item.date,
                y: item.rate
            })),
            borderColor: CHART_BORDER_COLORS[index % CHART_BORDER_COLORS.length],
            backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
            borderWidth: 2,
            fill: false,
            tension: 0.1
        };
    });

    return {
        labels: [], // Time series doesn't use labels array
        datasets,
        xAxisConfig: {
            type: 'time',
            time: {
                unit: 'month',
                displayFormats: {
                    month: 'MMM yyyy'
                }
            },
            title: {
                display: true,
                text: 'Date'
            }
        },
        yAxisConfig: {
            title: {
                display: true,
                text: 'Interest Rate (%)'
            }
        }
    };
};
