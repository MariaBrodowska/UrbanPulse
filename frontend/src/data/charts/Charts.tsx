import { useState, useEffect } from "react";
import "./Charts.css";
import axios from "axios";
import Navbar from "../../components/Navbar";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

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
    generateTimeSeriesInterestRatesChart,
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
    TimeScale,
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
    
    const [filters, setFilters] = useState<FilterState>({});
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
    // Dane z API
    const [populationData, setPopulationData] = useState<PopulationData[]>([]);
    const [interestRateData, setInterestRateData] = useState<InterestRateData[]>([]);
    const [meterDataList, setMeterDataList] = useState<MeterData[]>([]);

    useEffect(() => {
       const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/me', {
                    withCredentials: true
                });
                setUserEmail(response.data.email);
            } catch (error) {
                console.error('Błąd podczas pobierania danych użytkownika:', error);
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
                const populationUrl = buildFilterUrl(`${API_BASE_URL}/population/combined`, filters);
                console.log(populationUrl)
                console.log("Population filters",filters)
                requests.push(
                    axios.get(populationUrl,{withCredentials:true}).then(response => ({ type: 'population', data: response.data }))
                );
            }

            if (selectedDatasets.interestRates) {
                console.log("rates filters", filters)
                const interestRateUrl = buildFilterUrl(`${API_BASE_URL}/interest-rates/combined`, filters);
                console.log(interestRateUrl)
                requests.push(
                    axios.get(interestRateUrl,{withCredentials:true}).then(response => ({ type: 'interestRates', data: response.data }))
                );
            }

            if (selectedDatasets.meterData) {
                console.log("flat filters", filters)
                const meterDataUrl = buildFilterUrl(`${API_BASE_URL}/flat-prices/combined`, filters);
                console.log(meterDataUrl)
                requests.push(
                    axios.get(meterDataUrl,{withCredentials:true}).then(response => ({ type: 'meterData', data: response.data }))
                );
            }

            if (requests.length === 0) {
                setError('Please select at least one dataset');
                return;
            }

            const responses = await Promise.all(requests);
            
            // Initialize new data arrays
            let newPopulationData: PopulationData[] = [];
            let newInterestRateData: InterestRateData[] = [];
            let newMeterDataList: MeterData[] = [];

            // Process responses and update data
            responses.forEach(response => {
                console.log('Processing response:', response.type, response.data.length, 'items');
                switch (response.type) {
                    case 'population':
                        newPopulationData = response.data;
                        setPopulationData(response.data);
                        break;
                    case 'interestRates':
                        newInterestRateData = response.data;
                        setInterestRateData(response.data);
                        break;
                    case 'meterData':
                        newMeterDataList = response.data;
                        setMeterDataList(response.data);
                        break;
                }
            });
            console.log("Final data before chart generation:");
            console.log("Population data", newPopulationData.length, newPopulationData);
            console.log("Interest rate data", newInterestRateData.length, newInterestRateData);
            console.log("MeterData", newMeterDataList.length, newMeterDataList);
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
        } else if (chartType === 'timeSeriesInterestRates') {
            data = generateTimeSeriesInterestRatesChart(intData);
        } else {
            data = generateLineOrBarChart(popData, intData, metData, selectedDatasets, useLogarithmicScale);
        }
        console.log('Generated chart data:', data);
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
        setFilters({});
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
        console.log(newFilters);
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
