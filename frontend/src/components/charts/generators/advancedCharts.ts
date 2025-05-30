import type { PopulationData, InterestRateData, MeterData, MultiAxisChartData, ScatterPlotData } from '../types';
import { CHART_COLORS, CHART_BORDER_COLORS } from '../utils/constants';
import { logarithmicScale } from '../utils/helpers';

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
        const populationByYear = populationDataInput.reduce((acc, item) => {
            const key = `${item.year}`;
            if (!acc[key]) acc[key] = [];
            acc[key].push(item.number);
            return acc;
        }, {} as Record<string, number[]>);

        const avgPopulationByYear = Object.keys(populationByYear).reduce((acc, year) => {
            const numbers = populationByYear[year];
            acc[year] = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
            return acc;
        }, {} as Record<string, number>);

        const labels = Object.keys(avgPopulationByYear).sort();
        allLabels = [...new Set([...allLabels, ...labels])];

        const populationDataProcessed = labels.reduce((acc, label) => {
            acc[label] = avgPopulationByYear[label] || 0;
            return acc;
        }, {} as Record<string, number>);

        const finalPopulationData = useLogarithmicScale ? logarithmicScale(populationDataProcessed) : populationDataProcessed;

        datasets.push({
            label: useLogarithmicScale ? 'Population (Avg, Log Scale)' : 'Population (Avg)',
            data: finalPopulationData,
            backgroundColor: CHART_COLORS[colorIndex % CHART_COLORS.length],
            borderColor: CHART_BORDER_COLORS[colorIndex % CHART_BORDER_COLORS.length],
            borderWidth: 2,
            tension: 0.1,
            yAxisID: 'y-population'
        });

        yAxes['y-population'] = {
            label: useLogarithmicScale ? 'Population (Log Scale)' : 'Population',
            position: 'left',
            color: CHART_BORDER_COLORS[colorIndex % CHART_BORDER_COLORS.length]
        };
        colorIndex++;
    }

    if (selectedDatasets.interestRates && interestRateData.length > 0) {
        const ratesByYear = interestRateData.reduce((acc, item) => {
            const year = new Date(item.date).getFullYear().toString();
            if (!acc[year]) acc[year] = [];
            acc[year].push(item.rate);
            return acc;
        }, {} as Record<string, number[]>);

        const avgRatesByYear = Object.keys(ratesByYear).reduce((acc, year) => {
            const rates = ratesByYear[year];
            acc[year] = rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
            return acc;
        }, {} as Record<string, number>);

        const labels = Object.keys(avgRatesByYear).sort();
        allLabels = [...new Set([...allLabels, ...labels])];

        const interestDataProcessed = labels.reduce((acc, label) => {
            acc[label] = avgRatesByYear[label] || 0;
            return acc;
        }, {} as Record<string, number>);

        const finalInterestData = useLogarithmicScale ? logarithmicScale(interestDataProcessed) : interestDataProcessed;

        datasets.push({
            label: useLogarithmicScale ? 'Interest Rates (% Avg, Log Scale)' : 'Interest Rates (% Avg)',
            data: finalInterestData,
            backgroundColor: CHART_COLORS[colorIndex % CHART_COLORS.length],
            borderColor: CHART_BORDER_COLORS[colorIndex % CHART_BORDER_COLORS.length],
            borderWidth: 2,
            tension: 0.1,
            yAxisID: 'y-interest'
        });

        yAxes['y-interest'] = {
            label: useLogarithmicScale ? 'Interest Rates (% Log Scale)' : 'Interest Rates (%)',
            position: 'right',
            color: CHART_BORDER_COLORS[colorIndex % CHART_BORDER_COLORS.length]
        };
        colorIndex++;
    }

    if (selectedDatasets.meterData && meterData.length > 0) {
        const pricesByYear = meterData.reduce((acc, item) => {
            const key = `${item.year}`;
            if (!acc[key]) acc[key] = [];
            acc[key].push(item.price);
            return acc;
        }, {} as Record<string, number[]>);

        const avgPricesByYear = Object.keys(pricesByYear).reduce((acc, year) => {
            const prices = pricesByYear[year];
            acc[year] = prices.reduce((sum, price) => sum + price, 0) / prices.length;
            return acc;
        }, {} as Record<string, number>);

        const labels = Object.keys(avgPricesByYear).sort();
        allLabels = [...new Set([...allLabels, ...labels])];

        const meterDataProcessed = labels.reduce((acc, label) => {
            acc[label] = avgPricesByYear[label] || 0;
            return acc;
        }, {} as Record<string, number>);

        const finalMeterData = useLogarithmicScale ? logarithmicScale(meterDataProcessed) : meterDataProcessed;

        const position = Object.keys(yAxes).length === 0 ? 'left' : 'right';
        
        datasets.push({
            label: useLogarithmicScale ? 'Meter Data (Avg Price, Log Scale)' : 'Meter Data (Avg Price)',
            data: finalMeterData,
            backgroundColor: CHART_COLORS[colorIndex % CHART_COLORS.length],
            borderColor: CHART_BORDER_COLORS[colorIndex % CHART_BORDER_COLORS.length],
            borderWidth: 2,
            tension: 0.1,
            yAxisID: 'y-meter'
        });

        yAxes['y-meter'] = {
            label: useLogarithmicScale ? 'Price (Log Scale)' : 'Price',
            position,
            color: CHART_BORDER_COLORS[colorIndex % CHART_BORDER_COLORS.length]
        };
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
    // Przetworzenie danych na średnie roczne
    const processedData: { [year: string]: { population?: number; interestRates?: number; meterData?: number } } = {};

    // Przetwarzanie danych populacji
    if (populationDataInput.length > 0) {
        const populationByYear = populationDataInput.reduce((acc, item) => {
            const key = `${item.year}`;
            if (!acc[key]) acc[key] = [];
            acc[key].push(item.number);
            return acc;
        }, {} as Record<string, number[]>);

        Object.keys(populationByYear).forEach(year => {
            if (!processedData[year]) processedData[year] = {};
            const numbers = populationByYear[year];
            processedData[year].population = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
        });
    }

    // Przetwarzanie danych stóp procentowych
    if (interestRateData.length > 0) {
        const ratesByYear = interestRateData.reduce((acc, item) => {
            const year = new Date(item.date).getFullYear().toString();
            if (!acc[year]) acc[year] = [];
            acc[year].push(item.rate);
            return acc;
        }, {} as Record<string, number[]>);

        Object.keys(ratesByYear).forEach(year => {
            if (!processedData[year]) processedData[year] = {};
            const rates = ratesByYear[year];
            processedData[year].interestRates = rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
        });
    }

    // Przetwarzanie danych licznikowych
    if (meterData.length > 0) {
        const pricesByYear = meterData.reduce((acc, item) => {
            const key = `${item.year}`;
            if (!acc[key]) acc[key] = [];
            acc[key].push(item.price);
            return acc;
        }, {} as Record<string, number[]>);

        Object.keys(pricesByYear).forEach(year => {
            if (!processedData[year]) processedData[year] = {};
            const prices = pricesByYear[year];
            processedData[year].meterData = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        });
    }

    // Utworzenie punktów dla wykresu punktowego
    const scatterPoints: Array<{ x: number; y: number; year: string }> = [];
    
    Object.keys(processedData).forEach(year => {
        const yearData = processedData[year];
        if (yearData[xAxisData] !== undefined && yearData[yAxisData] !== undefined) {
            let xValue = yearData[xAxisData]!;
            let yValue = yearData[yAxisData]!;

            // Zastosuj skalowanie logarytmiczne jeśli włączone
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

    // Etykiety osi
    const axisLabels = {
        population: useLogarithmicScale ? 'Population (Log Scale)' : 'Population',
        interestRates: useLogarithmicScale ? 'Interest Rates (% Log Scale)' : 'Interest Rates (%)',
        meterData: useLogarithmicScale ? 'Price (Log Scale)' : 'Price'
    };

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
