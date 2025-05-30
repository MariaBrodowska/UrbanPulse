import { useState, useEffect } from "react";
import "./Charts.css";
import axios from "axios";
import Navbar from "../../components/Navbar";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

// Importowanie modułowych komponentów
import {
    DatasetSelector,
    ChartTypeSelector,
    ChartFilters,
    ChartActions,
    ChartContainer,
    ChartInfo,
    ScatterAxisSelector,
    generateLineOrBarChart,
    generatePieChart,
    generateMultiAxisLineChart,
    generateCorrelationScatterPlot,
    buildFilterUrl
} from "../../components/charts";

// Importowanie typów
import type { 
    PopulationData, 
    InterestRateData, 
    MeterData, 
    ChartType, 
    FilterState,
    SelectedDatasets
} from "../../components/charts";

// Rejestrowanie komponentów Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const API_BASE_URL = 'http://localhost:5000/api';

function ChartsPage() {
    const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // Stan komponentów
    const [selectedDatasets, setSelectedDatasets] = useState<SelectedDatasets>({
        population: true,
        interestRates: false,
        meterData: false
    });
    const [chartType, setChartType] = useState<ChartType>('line');
    const [chartData, setChartData] = useState<any>(null);
    const [useLogarithmicScale, setUseLogarithmicScale] = useState<boolean>(false);
    
    // Stan dla wykresu punktowego
    const [scatterXAxis, setScatterXAxis] = useState<'population' | 'interestRates' | 'meterData'>('population');
    const [scatterYAxis, setScatterYAxis] = useState<'population' | 'interestRates' | 'meterData'>('meterData');
    
    const [filters, setFilters] = useState<FilterState>({
        populations: {},
        interestrates: {},
        meterdata: {}
    });
    
    // Dane z API
    const [populationData, setPopulationData] = useState<PopulationData[]>([]);
    const [interestRateData, setInterestRateData] = useState<InterestRateData[]>([]);
    const [meterDataList, setMeterDataList] = useState<MeterData[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('http://localhost:5000/api/auth/me', {withCredentials:true}
                    );
                    setUserEmail(response.data.user.email);
                }
            } catch (error) {
                console.error('Błąd podczas pobierania danych użytkownika:', error);
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        };

        fetchUserData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const requests = [];

            if (selectedDatasets.population) {
                const populationUrl = buildFilterUrl(`${API_BASE_URL}/population/combined`, filters.populations);
                requests.push(
                    axios.get(populationUrl,{withCredentials:true}).then(response => ({ type: 'population', data: response.data }))
                );
            }

            if (selectedDatasets.interestRates) {
                const interestRateUrl = buildFilterUrl(`${API_BASE_URL}/interest-rates/combined`, filters.interestrates);
                requests.push(
                    axios.get(interestRateUrl,{withCredentials:true}).then(response => ({ type: 'interestRates', data: response.data }))
                );
            }

            if (selectedDatasets.meterData) {
                const meterDataUrl = buildFilterUrl(`${API_BASE_URL}/flat-prices/combined`, filters.meterdata);
                requests.push(
                    axios.get(meterDataUrl,{withCredentials:true}).then(response => ({ type: 'meterData', data: response.data }))
                );
            }

            if (requests.length === 0) {
                setError('Please select at least one dataset');
                return;
            }

            const responses = await Promise.all(requests);
            
            // Reset danych
            setPopulationData([]);
            setInterestRateData([]);
            setMeterDataList([]);

            // Przetwarzanie odpowiedzi
            let newPopulationData = populationData;
            let newInterestRateData = interestRateData;
            let newMeterDataList = meterDataList;

            responses.forEach(response => {
                switch (response.type) {
                    case 'population':
                        setPopulationData(response.data);
                        newPopulationData = response.data;
                        break;
                    case 'interestRates':
                        setInterestRateData(response.data);
                        newInterestRateData = response.data;
                        break;
                    case 'meterData':
                        setMeterDataList(response.data);
                        newMeterDataList = response.data;
                        break;
                }
            });

            // Generowanie danych dla wykresu
            generateChart(newPopulationData, newInterestRateData, newMeterDataList);

        } catch (error: any) {
            console.error('Error fetching data:', error);
            setError(error.response?.data?.message || 'Failed to fetch data');
        } finally {
            setIsLoading(false);
        }
    };

    const generateChart = (
        populationDataParam?: PopulationData[],
        interestRateDataParam?: InterestRateData[],
        meterDataParam?: MeterData[]
    ) => {
        const popData = populationDataParam || populationData;
        const intData = interestRateDataParam || interestRateData;
        const metData = meterDataParam || meterDataList;

        let data;
        if (chartType === 'pie') {
            data = generatePieChart(popData, intData, metData, selectedDatasets, useLogarithmicScale);
        } else if (chartType === 'multiAxis') {
            data = generateMultiAxisLineChart(popData, intData, metData, selectedDatasets, useLogarithmicScale);
        } else if (chartType === 'scatter') {
            data = generateCorrelationScatterPlot(popData, intData, metData, scatterXAxis, scatterYAxis, useLogarithmicScale);
        } else {
            data = generateLineOrBarChart(popData, intData, metData, selectedDatasets, useLogarithmicScale);
        }

        setChartData(data);
    };

    const handleGenerate = () => {
        fetchData();
    };

    const handleClear = () => {
        setChartData(null);
        setPopulationData([]);
        setInterestRateData([]);
        setMeterDataList([]);
        setError(null);
        setFilters({
            populations: {},
            interestrates: {},
            meterdata: {}
        });
    };

    const handleDatasetChange = (newSelectedDatasets: SelectedDatasets) => {
        setSelectedDatasets(newSelectedDatasets);
    };

    const handleChartTypeChange = (newChartType: ChartType) => {
        setChartType(newChartType);
        if (chartData) {
            // Regeneruj wykres z nowym typem
            generateChart();
        }
    };

    const handleFiltersChange = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    const handleLogarithmicScaleChange = (newUseLogarithmicScale: boolean) => {
        setUseLogarithmicScale(newUseLogarithmicScale);
        if (chartData) {
            // Regeneruj wykres z nową opcją logarytmiczną
            generateChart();
        }
    };

    const hasSelectedDatasets = Object.values(selectedDatasets).some(Boolean);

    return (
        <div className="charts-page">
            <Navbar userEmail={userEmail} />
            
            <div className="charts-container">
                <div className="charts-header">
                    <h1>Data Visualization</h1>
                    <p>Create interactive charts from multiple data sources</p>
                </div>

                <div className="charts-content">
                    <div className="charts-main">
                        <ChartContainer
                            chartType={chartType}
                            chartData={chartData}
                            error={error}
                        />

                        <ChartInfo
                            populationData={populationData}
                            interestRateData={interestRateData}
                            meterData={meterDataList}
                            selectedDatasets={selectedDatasets}
                        />
                    </div>

                    <div className="charts-sidebar">
                        <DatasetSelector
                            selectedDatasets={selectedDatasets}
                            onDatasetChange={handleDatasetChange}
                        />

                        <ChartTypeSelector
                            chartType={chartType}
                            onChartTypeChange={handleChartTypeChange}
                        />

                        {chartType === 'scatter' && (
                            <ScatterAxisSelector
                                xAxisData={scatterXAxis}
                                yAxisData={scatterYAxis}
                                onXAxisChange={setScatterXAxis}
                                onYAxisChange={setScatterYAxis}
                            />
                        )}

                        <ChartFilters
                            filters={filters}
                            selectedDatasets={selectedDatasets}
                            onFiltersChange={handleFiltersChange}
                        />

                        <ChartActions
                            onGenerate={handleGenerate}
                            onClear={handleClear}
                            isLoading={isLoading}
                            hasSelectedDatasets={hasSelectedDatasets}
                            useLogarithmicScale={useLogarithmicScale}
                            onLogarithmicScaleChange={handleLogarithmicScaleChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChartsPage;
