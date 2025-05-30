import type { PopulationData, InterestRateData, MeterData } from '../types';
import { CHART_COLORS, CHART_BORDER_COLORS } from '../utils/constants';
import { logarithmicScale } from '../utils/helpers';

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

        const populationData = labels.reduce((acc, label) => {
            acc[label] = avgPopulationByYear[label] || 0;
            return acc;
        }, {} as Record<string, number>);

        const finalPopulationData = useLogarithmicScale ? logarithmicScale(populationData) : populationData;

        datasets.push({
            label: useLogarithmicScale ? 'Population (Avg, Log Scale)' : 'Population (Avg)',
            data: finalPopulationData,
            backgroundColor: CHART_COLORS[colorIndex % CHART_COLORS.length],
            borderColor: CHART_BORDER_COLORS[colorIndex % CHART_BORDER_COLORS.length],
            borderWidth: 2,
            tension: 0.1
        });
        colorIndex++;
    }

    if (selectedDatasets.interestRates && interestRateData.length > 0) {
        // Grupuj stopy procentowe według lat i oblicz średnią dla każdego roku
        const ratesByYear = interestRateData.reduce((acc, item) => {
            const year = new Date(item.date).getFullYear().toString();
            if (!acc[year]) acc[year] = [];
            acc[year].push(item.rate);
            return acc;
        }, {} as Record<string, number[]>);

        // Oblicz średnią dla każdego roku
        const avgRatesByYear = Object.keys(ratesByYear).reduce((acc, year) => {
            const rates = ratesByYear[year];
            acc[year] = rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
            return acc;
        }, {} as Record<string, number>);

        const labels = Object.keys(avgRatesByYear).sort();
        allLabels = [...new Set([...allLabels, ...labels])];

        const interestData = labels.reduce((acc, label) => {
            acc[label] = avgRatesByYear[label] || 0;
            return acc;
        }, {} as Record<string, number>);

        const finalInterestData = useLogarithmicScale ? logarithmicScale(interestData) : interestData;

        datasets.push({
            label: useLogarithmicScale ? 'Interest Rates (% Avg, Log Scale)' : 'Interest Rates (% Avg)',
            data: finalInterestData,
            backgroundColor: CHART_COLORS[colorIndex % CHART_COLORS.length],
            borderColor: CHART_BORDER_COLORS[colorIndex % CHART_BORDER_COLORS.length],
            borderWidth: 2,
            tension: 0.1
        });
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

        datasets.push({
            label: useLogarithmicScale ? 'Meter Data (Avg Price, Log Scale)' : 'Meter Data (Avg Price)',
            data: finalMeterData,
            backgroundColor: CHART_COLORS[colorIndex % CHART_COLORS.length],
            borderColor: CHART_BORDER_COLORS[colorIndex % CHART_BORDER_COLORS.length],
            borderWidth: 2,
            tension: 0.1
        });
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
        const avgPopulation = populationData.reduce((sum, item) => sum + item.number, 0) / populationData.length;
        const finalPopulation = useLogarithmicScale && avgPopulation > 0 ? Math.log(avgPopulation) : avgPopulation;
        labels.push(useLogarithmicScale ? 'Avg Population (Log Scale)' : 'Avg Population');
        data.push(finalPopulation);
        backgroundColors.push(CHART_COLORS[colorIndex % CHART_COLORS.length]);
        borderColors.push(CHART_BORDER_COLORS[colorIndex % CHART_BORDER_COLORS.length]);
        colorIndex++;
    }

    if (selectedDatasets.interestRates && interestRateData.length > 0) {
        const avgRate = interestRateData.reduce((sum, item) => sum + item.rate, 0) / interestRateData.length;
        const finalRate = useLogarithmicScale && avgRate > 0 ? Math.log(avgRate) : avgRate;
        labels.push(useLogarithmicScale ? 'Avg Interest Rate (Log Scale)' : 'Avg Interest Rate (%)');
        data.push(finalRate);
        backgroundColors.push(CHART_COLORS[colorIndex % CHART_COLORS.length]);
        borderColors.push(CHART_BORDER_COLORS[colorIndex % CHART_BORDER_COLORS.length]);
        colorIndex++;
    }

    if (selectedDatasets.meterData && meterData.length > 0) {
        const avgPrice = meterData.reduce((sum, item) => sum + item.price, 0) / meterData.length;
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
