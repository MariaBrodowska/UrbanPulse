import type { PopulationData, InterestRateData, MeterData } from '../types';
import { CHART_COLORS, CHART_BORDER_COLORS } from './constants';
import { logarithmicScale } from './helpers';

// Type definitions for reusable functions
export type DataProcessor<T> = (data: T[]) => Record<string, number[]>;
export type AverageCalculator = (grouped: Record<string, number[]>) => Record<string, number>;

// Process interest rate data for time series (preserving exact dates)
export const processInterestRateDataForTimeSeries = (data: InterestRateData[]) => {
    // Group by type and preserve dates
    const groupedByType: Record<string, Array<{ date: string; rate: number }>> = {};
    
    data.forEach(item => {
        const typeName = item.typeOfInterestRateName || 'Unknown';
        if (!groupedByType[typeName]) {
            groupedByType[typeName] = [];
        }
        groupedByType[typeName].push({
            date: item.date,
            rate: item.rate
        });
    });

    // Sort data by date for each type
    Object.keys(groupedByType).forEach(type => {
        groupedByType[type].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });

    return groupedByType;
};

// Calculate averages from grouped data
export const calculateAveragesByYear: AverageCalculator = (groupedData) => {
    return Object.keys(groupedData).reduce((acc, year) => {
        const values = groupedData[year];
        acc[year] = values.reduce((sum, value) => sum + value, 0) / values.length;
        return acc;
    }, {} as Record<string, number>);
};

// Data processors for different data types
export const processPopulationData: DataProcessor<PopulationData> = (data) => {
    return data.reduce((acc, item) => {
        const key = `${item.year}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(item.number);
        return acc;
    }, {} as Record<string, number[]>);
};

export const processInterestRateData: DataProcessor<InterestRateData> = (data) => {
    return data.reduce((acc, item) => {
        const year = new Date(item.date).getFullYear().toString();
        if (!acc[year]) acc[year] = [];
        acc[year].push(item.rate);
        return acc;
    }, {} as Record<string, number[]>);
};

export const processMeterData: DataProcessor<MeterData> = (data) => {
    return data.reduce((acc, item) => {
        const key = `${item.year}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(item.price);
        return acc;
    }, {} as Record<string, number[]>);
};

// Create dataset with consistent styling
export const createDataset = (
    label: string,
    data: Record<string, number>,
    colorIndex: number,
    yAxisID?: string,
    useLogarithmicScale: boolean = false
) => {
    const finalData = useLogarithmicScale ? logarithmicScale(data) : data;
    
    const dataset: any = {
        label,
        data: finalData,
        backgroundColor: CHART_COLORS[colorIndex % CHART_COLORS.length],
        borderColor: CHART_BORDER_COLORS[colorIndex % CHART_BORDER_COLORS.length],
        borderWidth: 2,
        tension: 0.1
    };

    if (yAxisID) {
        dataset.yAxisID = yAxisID;
    }

    return dataset;
};

// Create Y-axis configuration
export const createYAxis = (
    label: string,
    position: 'left' | 'right',
    colorIndex: number
) => ({
    label,
    position,
    color: CHART_BORDER_COLORS[colorIndex % CHART_BORDER_COLORS.length]
});

// Process data for chart labels
export const processDataForLabels = (
    processedData: Record<string, number>,
    allLabels: string[]
): Record<string, number> => {
    const labels = Object.keys(processedData).sort();
    allLabels.push(...labels);
    
    return labels.reduce((acc, label) => {
        acc[label] = processedData[label] || 0;
        return acc;
    }, {} as Record<string, number>);
};

// Generate axis labels with logarithmic scale support
export const getAxisLabels = (useLogarithmicScale: boolean) => ({
    population: useLogarithmicScale ? 'Population (Log Scale)' : 'Population',
    interestRates: useLogarithmicScale ? 'Interest Rates (% Log Scale)' : 'Interest Rates (%)',
    meterData: useLogarithmicScale ? 'Price (Log Scale)' : 'Price'
});

// Process data for scatter plot
export const processDataForScatterPlot = (
    populationDataInput: PopulationData[],
    interestRateData: InterestRateData[],
    meterData: MeterData[]
): { [year: string]: { population?: number; interestRates?: number; meterData?: number } } => {
    const processedData: { [year: string]: { population?: number; interestRates?: number; meterData?: number } } = {};

    // Process population data
    if (populationDataInput.length > 0) {
        const groupedData = processPopulationData(populationDataInput);
        const averageData = calculateAveragesByYear(groupedData);
        
        Object.keys(averageData).forEach(year => {
            if (!processedData[year]) processedData[year] = {};
            processedData[year].population = averageData[year];
        });
    }

    // Process interest rate data
    if (interestRateData.length > 0) {
        const groupedData = processInterestRateData(interestRateData);
        const averageData = calculateAveragesByYear(groupedData);
        
        Object.keys(averageData).forEach(year => {
            if (!processedData[year]) processedData[year] = {};
            processedData[year].interestRates = averageData[year];
        });
    }

    // Process meter data
    if (meterData.length > 0) {
        const groupedData = processMeterData(meterData);
        const averageData = calculateAveragesByYear(groupedData);
        
        Object.keys(averageData).forEach(year => {
            if (!processedData[year]) processedData[year] = {};
            processedData[year].meterData = averageData[year];
        });
    }

    return processedData;
};

// Calculate average for pie chart segments
export const calculateOverallAverage = (data: any[], getValue: (item: any) => number): number => {
    if (data.length === 0) return 0;
    return data.reduce((sum, item) => sum + getValue(item), 0) / data.length;
};

// Process data and generate final dataset for basic charts
export const processDataForChart = (
    data: any[],
    processor: DataProcessor<any>,
    selectedDatasets: { [key: string]: boolean },
    dataKey: string
): { processedData: Record<string, number>; labels: string[] } | null => {
    console.log(`Processing data for ${dataKey}:`, {
        dataLength: data.length,
        isSelected: selectedDatasets[dataKey],
        sampleData: data.slice(0, 2)
    });
    
    if (!selectedDatasets[dataKey] || data.length === 0) {
        console.log(`Skipping ${dataKey}: not selected or no data`);
        return null;
    }

    const groupedData = processor(data);
    console.log(`Grouped data for ${dataKey}:`, groupedData);
    
    const averageData = calculateAveragesByYear(groupedData);
    console.log(`Average data for ${dataKey}:`, averageData);
    
    const labels = Object.keys(averageData).sort();
    console.log(`Labels for ${dataKey}:`, labels);

    const processedData = labels.reduce((acc, label) => {
        acc[label] = averageData[label] || 0;
        return acc;
    }, {} as Record<string, number>);

    console.log(`Final processed data for ${dataKey}:`, processedData);
    return { processedData, labels };
};
