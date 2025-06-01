export interface PopulationData {
    id: number;
    year: number;
    number: number;
    cityId: number;
    cityName: string;
}

export interface InterestRateData {
    id: number;
    date: string;
    rate: number;
    typeOfInterestRateId: number;
    typeOfInterestRateName: string;
}

export interface MeterData {
    id: number;
    year: number;
    price: number;
    quarter: number;
    isSecondaryMarket: boolean;
    isRealistic: boolean;
    cityId: number;
    cityName: string;
}

export interface FilterState {

        year?: string;
        city?: string;
        yearRange?: string;
        yearRange_2?: string;
    
   
}

export interface SelectedDatasets {
    population: boolean;
    interestRates: boolean;
    meterData: boolean;
}

export interface ChartDataSet {
    label: string;
    data: number[] | Array<{ x: number; y: number; year?: string }>;
    backgroundColor: string | string[];
    borderColor: string | string[];
    borderWidth: number;
    fill?: boolean;
    tension?: number;
    yAxisID?: string; // Dla wykresów wieloosiowych
    pointRadius?: number; // Dla scatter
    pointHoverRadius?: number; // Dla scatter
}

export interface ChartData {
    labels: string[];
    datasets: ChartDataSet[];
}

// Rozszerzone typy wykresów
export type ChartType = 'line' | 'bar' | 'pie' | 'scatter' | 'multiAxis' | 'timeSeriesInterestRates';

// Typ dla danych z wieloma osiami Y
export interface MultiAxisChartData {
    labels: string[];
    datasets: ChartDataSet[];
    yAxes: {
        [key: string]: {
            label: string;
            position: 'left' | 'right';
            color: string;
        };
    
    };
    xAxes?: {
        [key: string]: {
            label: string;
            position: 'top' | 'bottom';
            type: string;
        };
    };
}

// Typ dla danych wykresu punktowego (scatter)
export interface ScatterPlotData {
    datasets: Array<{
        label: string;
        data: Array<{ x: number; y: number; year?: string }>;
        backgroundColor: string;
        borderColor: string;
        pointRadius?: number;
        pointHoverRadius?: number;
    }>;
    xAxisLabel: string;
    yAxisLabel: string;
}

// Typ dla wykresu czasowego stóp procentowych
export interface TimeSeriesInterestRateData {
    labels: string[];
    datasets: Array<{
        label: string;
        data: Array<{ x: string; y: number }>;
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
        tension: number;
        fill: boolean;
    }>;
    xAxisConfig: {
        type: 'time';
        time: {
            unit: 'month' | 'quarter' | 'year';
            displayFormats: {
                [key: string]: string;
            };
        };
        title: {
            display: boolean;
            text: string;
        };
    };
    yAxisConfig: {
        title: {
            display: boolean;
            text: string;
        };
    };
}
