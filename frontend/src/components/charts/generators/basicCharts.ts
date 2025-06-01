import type { PopulationData, InterestRateData, MeterData } from '../types';
import { CHART_COLORS, CHART_BORDER_COLORS } from '../utils/constants';
import {
    processPopulationData,
    processInterestRateData,
    processMeterData,
    calculateAveragesByYear,
    createDataset,
    processDataForChart,
    calculateOverallAverage
} from '../utils/dataProcessors';

// Generowanie danych dla wykresu liniowego/słupkowego
export const generateLineOrBarChart = (
    populationDataInput: PopulationData[],
    interestRateData: InterestRateData[],
    meterData: MeterData[],
    selectedDatasets: { population: boolean; interestRates: boolean; meterData: boolean },
    useLogarithmicScale: boolean = false
) => {
    const datasets = [];
    let allLabels: string[] = [];
    let colorIndex = 0;
    
    // Process population data
    const populationResult = processDataForChart(
        populationDataInput,
        processPopulationData,
        selectedDatasets,
        'population'
    );

    if (populationResult) {
        const { processedData, labels } = populationResult;
        allLabels = [...new Set([...allLabels, ...labels])];

        const dataset = createDataset(
            useLogarithmicScale ? 'Population (Avg, Log Scale)' : 'Population (Avg)',
            processedData,
            colorIndex,
            undefined,
            useLogarithmicScale
        );
        datasets.push(dataset);
        colorIndex++;
    }
  
    // Process interest rate data
    if (selectedDatasets.interestRates && interestRateData.length > 0) {
        const groupedData = processInterestRateData(interestRateData);
        const averageData = calculateAveragesByYear(groupedData);
        const labels = Object.keys(averageData).sort();
        allLabels = [...new Set([...allLabels, ...labels])];

        // Use first value for each year for chart compatibility
        const interestDataSingleValues = labels.reduce((acc, label) => {
            acc[label] = averageData[label];
            return acc;
        }, {} as Record<string, number>);

        console.log(interestRateData);

        const dataset = createDataset(
            useLogarithmicScale ? 'Interest Rates (% Avg, Log Scale)' : 'Interest Rates (% Avg)',
            interestDataSingleValues,
            colorIndex,
            undefined,
            useLogarithmicScale
        );
        datasets.push(dataset);
        colorIndex++;
    }

    // Process meter data
    const meterResult = processDataForChart(
        meterData,
        processMeterData,
        selectedDatasets,
        'meterData'
    );

    if (meterResult) {
        const { processedData, labels } = meterResult;
        allLabels = [...new Set([...allLabels, ...labels])];

        const dataset = createDataset(
            useLogarithmicScale ? 'Meter Data (Avg Price, Log Scale)' : 'Meter Data (Avg Price)',
            processedData,
            colorIndex,
            undefined,
            useLogarithmicScale
        );
        datasets.push(dataset);
        colorIndex++;
    }

    // Sort labels and map data
    allLabels = [...new Set(allLabels)].sort();
    
    const mappedDatasets = datasets.map(dataset => ({
        ...dataset,
        data: allLabels.map(label => dataset.data[label] || 0)
    }));
      
    return {
        labels: allLabels,
        datasets: mappedDatasets
    };
};

// Generowanie danych dla wykresu kołowego
export const generatePieChart = (
    populationData: PopulationData[],
    interestRateData: InterestRateData[],
    meterData: MeterData[],
    selectedDatasets: { population: boolean; interestRates: boolean; meterData: boolean },
    useLogarithmicScale: boolean = false
) => {
    const labels = [];
    const data = [];
    const backgroundColors = [];
    const borderColors = [];
    let colorIndex = 0;

    if (selectedDatasets.population && populationData.length > 0) {
        const avgPopulation = calculateOverallAverage(populationData, (item) => item.number);
        const finalPopulation = useLogarithmicScale && avgPopulation > 0 ? Math.log(avgPopulation) : avgPopulation;
        labels.push(useLogarithmicScale ? 'Avg Population (Log Scale)' : 'Avg Population');
        data.push(finalPopulation);
        backgroundColors.push(CHART_COLORS[colorIndex % CHART_COLORS.length]);
        borderColors.push(CHART_BORDER_COLORS[colorIndex % CHART_BORDER_COLORS.length]);
        colorIndex++;
    }

    if (selectedDatasets.interestRates && interestRateData.length > 0) {
        const avgRate = calculateOverallAverage(interestRateData, (item) => item.rate);
        const finalRate = useLogarithmicScale && avgRate > 0 ? Math.log(avgRate) : avgRate;
        labels.push(useLogarithmicScale ? 'Avg Interest Rate (Log Scale)' : 'Avg Interest Rate (%)');
        data.push(finalRate);
        backgroundColors.push(CHART_COLORS[colorIndex % CHART_COLORS.length]);
        borderColors.push(CHART_BORDER_COLORS[colorIndex % CHART_BORDER_COLORS.length]);
        colorIndex++;
    }

    if (selectedDatasets.meterData && meterData.length > 0) {
        const avgPrice = calculateOverallAverage(meterData, (item) => item.price);
        const finalPrice = useLogarithmicScale && avgPrice > 0 ? Math.log(avgPrice) : avgPrice;
        labels.push(useLogarithmicScale ? 'Avg Meter Price (Log Scale)' : 'Avg Meter Price');
        data.push(finalPrice);
        backgroundColors.push(CHART_COLORS[colorIndex % CHART_COLORS.length]);
        borderColors.push(CHART_BORDER_COLORS[colorIndex % CHART_BORDER_COLORS.length]);
        colorIndex++;
    }

    return {
        labels,
        datasets: [{
            data,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 2
        }]
    };
};
