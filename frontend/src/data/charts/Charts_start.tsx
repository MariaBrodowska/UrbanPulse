import React, { useState, useEffect } from "react";
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
import { Line, Bar, Pie } from 'react-chartjs-2';

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

// Interfejsy dla typów danych
interface PopulationData {
    id: number;
    year: number;
    number: number;
    cityId: number;
    cityName: string;
}

interface InterestRateData {
    id: number;
    date: string;
    rate: number;
    typeOfInterestRateId: number;
    typeOfInterestRateName: string;
}

interface MeterData {
    id: number;
    year: number;
    price: number;
    quarter: number;
    isSecondaryMarket: boolean;
    isRealistic: boolean;
    cityId: number;
    cityName: string;
}

interface FilterState {
    populations: {
        id?: string;
        year?: string;
        city?: string;
        yearRange?: string;
        yearRange_2?: string;
    };
    interestrates: {
        id?: string;
        yearRange?: string;
        yearRange_2?: string;
    };
    meterdata: {
        id?: string;
        market?: string;
        sales?: string;
        city?: string;
    };
}

function ChartsPage() {
    const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDatasets, setSelectedDatasets] = useState<string[]>(['populations']);
    const [chartType, setChartType] = useState<'line' | 'bar' | 'pie'>('line');
    const [chartData, setChartData] = useState<any>(null);
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
                const response = await axios.get(`${API_BASE_URL}/users/me`, {
                    withCredentials: true
                });
                setUserEmail(response.data.email);
            } catch (error) {
                console.error('Błąd podczas pobierania danych użytkownika:', error);
            }
        };

        fetchUserData();
    }, []);

    const buildFilterUrl = (dataset: string, baseUrl: string) => {
        const datasetFilters = filters[dataset as keyof FilterState];
        const params = new URLSearchParams();

        Object.entries(datasetFilters).forEach(([key, value]) => {
            if (value && value.trim() !== "" && value !== "false") {
                if (value === "true") {
                    params.append(key, "true");
                } else {
                    params.append(key, value.trim());
                }
            }
        });

        return params.toString() ? `${baseUrl}/combined?${params.toString()}` : baseUrl;
    };

    const fetchData = async (dataset: string) => {
        try {
            let url = '';
            switch (dataset) {
                case 'populations':
                    url = buildFilterUrl(dataset, `${API_BASE_URL}/population`);
                    break;
                case 'interestrates':
                    url = buildFilterUrl(dataset, `${API_BASE_URL}/interest-rates`);
                    break;
                case 'meterdata':
                    url = buildFilterUrl(dataset, `${API_BASE_URL}/flat-prices`);
                    break;
                default:
                    return [];
            }

            const response = await axios.get(url, { withCredentials: true });
            return Array.isArray(response.data) ? response.data : [response.data];
        } catch (error) {
            console.error(`Błąd podczas pobierania danych dla ${dataset}:`, error);
            return [];
        }
    };

    const generateChart = async () => {
        if (selectedDatasets.length === 0) {
            alert('Wybierz przynajmniej jeden dataset');
            return;
        }

        setIsLoading(true);

        try {
            const dataPromises = selectedDatasets.map(dataset => fetchData(dataset));
            const results = await Promise.all(dataPromises);

            // Przypisanie wyników
            selectedDatasets.forEach((dataset, index) => {
                switch (dataset) {
                    case 'populations':
                        setPopulationData(results[index]);
                        break;
                    case 'interestrates':
                        setInterestRateData(results[index]);
                        break;
                    case 'meterdata':
                        setMeterDataList(results[index]);
                        break;
                }
            });

            generateChartData(results, selectedDatasets);
        } catch (error) {
            console.error('Błąd podczas generowania wykresu:', error);
            alert('Wystąpił błąd podczas generowania wykresu');
        } finally {
            setIsLoading(false);
        }
    };

    const generateChartData = (dataResults: any[], datasets: string[]) => {
        const colors = [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)'
        ];

        const borderColors = [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ];

        if (chartType === 'pie') {
            generatePieChart(dataResults, datasets, colors);
        } else {
            generateLineOrBarChart(dataResults, datasets, colors, borderColors);
        }
    };

    const generatePieChart = (dataResults: any[], datasets: string[], colors: string[]) => {
        const labels: string[] = [];
        const data: number[] = [];

        datasets.forEach((dataset, index) => {
            const result = dataResults[index];
            if (result && result.length > 0) {
                switch (dataset) {
                    case 'populations':
                        const totalPopulation = result.reduce((sum: number, item: PopulationData) => sum + item.number, 0);
                        labels.push(`Populacja (${result.length} miast)`);
                        data.push(totalPopulation);
                        break;
                    case 'interestrates':
                        const avgRate = result.reduce((sum: number, item: InterestRateData) => sum + item.rate, 0) / result.length;
                        labels.push(`Średnia stopa procentowa`);
                        data.push(Math.round(avgRate));
                        break;
                    case 'meterdata':
                        const avgPrice = result.reduce((sum: number, item: MeterData) => sum + item.price, 0) / result.length;
                        labels.push(`Średnia cena mieszkań`);
                        data.push(Math.round(avgPrice));
                        break;
                }
            }
        });

        setChartData({
            labels,
            datasets: [{
                data,
                backgroundColor: colors.slice(0, labels.length),
                borderColor: colors.slice(0, labels.length),
                borderWidth: 2
            }]
        });
    };

    const generateLineOrBarChart = (dataResults: any[], datasets: string[], colors: string[], borderColors: string[]) => {
        const allLabels = new Set<string>();
        const chartDatasets: any[] = [];

        datasets.forEach((dataset, index) => {
            const result = dataResults[index];
            if (result && result.length > 0) {
                switch (dataset) {
                    case 'populations':
                        // Grupowanie po latach
                        const yearGroups = result.reduce((acc: any, item: PopulationData) => {
                            if (!acc[item.year]) acc[item.year] = 0;
                            acc[item.year] += item.number;
                            return acc;
                        }, {});

                        Object.keys(yearGroups).forEach(year => allLabels.add(year));

                        chartDatasets.push({
                            label: 'Populacja',
                            data: yearGroups,
                            backgroundColor: colors[index],
                            borderColor: borderColors[index],
                            borderWidth: 2,
                            fill: false
                        });
                        break;

                    case 'interestrates':
                        // Grupowanie po latach
                        const rateYearGroups = result.reduce((acc: any, item: InterestRateData) => {
                            const year = new Date(item.date).getFullYear().toString();
                            if (!acc[year]) acc[year] = [];
                            acc[year].push(item.rate);
                            return acc;
                        }, {});

                        Object.keys(rateYearGroups).forEach(year => allLabels.add(year));

                        const avgRatesByYear = Object.keys(rateYearGroups).reduce((acc: any, year) => {
                            acc[year] = rateYearGroups[year].reduce((sum: number, rate: number) => sum + rate, 0) / rateYearGroups[year].length;
                            return acc;
                        }, {});

                        chartDatasets.push({
                            label: 'Średnie stopy procentowe (%)',
                            data: avgRatesByYear,
                            backgroundColor: colors[index],
                            borderColor: borderColors[index],
                            borderWidth: 2,
                            fill: false
                        });
                        break;

                    case 'meterdata':
                        // Grupowanie po latach
                        const priceYearGroups = result.reduce((acc: any, item: MeterData) => {
                            if (!acc[item.year]) acc[item.year] = [];
                            acc[item.year].push(item.price);
                            return acc;
                        }, {});

                        Object.keys(priceYearGroups).forEach(year => allLabels.add(year.toString()));

                        const avgPricesByYear = Object.keys(priceYearGroups).reduce((acc: any, year) => {
                            acc[year] = priceYearGroups[year].reduce((sum: number, price: number) => sum + price, 0) / priceYearGroups[year].length;
                            return acc;
                        }, {});

                        chartDatasets.push({
                            label: 'Średnie ceny mieszkań (zł/m²)',
                            data: avgPricesByYear,
                            backgroundColor: colors[index],
                            borderColor: borderColors[index],
                            borderWidth: 2,
                            fill: false
                        });
                        break;
                }
            }
        });

        const sortedLabels = Array.from(allLabels).sort();

        setChartData({
            labels: sortedLabels,
            datasets: chartDatasets.map(dataset => ({
                ...dataset,
                data: sortedLabels.map(label => dataset.data[label] || 0)
            }))
        });
    };

    const handleDatasetChange = (dataset: string) => {
        setSelectedDatasets(prev => 
            prev.includes(dataset) 
                ? prev.filter(d => d !== dataset)
                : [...prev, dataset]
        );
    };

    const handleFilterChange = (dataset: string, filterName: string, value: string) => {
        setFilters(prev => ({
            ...prev,
            [dataset]: {
                ...prev[dataset as keyof FilterState],
                [filterName]: value
            }
        }));
    };

    const clearChart = () => {
        setChartData(null);
        setPopulationData([]);
        setInterestRateData([]);
        setMeterDataList([]);
    };

    const clearFilters = () => {
        setFilters({
            populations: {},
            interestrates: {},
            meterdata: {}
        });
    };

    const renderChart = () => {
        if (isLoading) {
            return (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Generowanie wykresu...</p>
                </div>
            );
        }

        if (!chartData) {
            return (
                <div className="chart-placeholder">
                    <p>Wybierz datasety i kliknij "Generuj wykres" aby wyświetlić wykres</p>
                </div>
            );
        }

        const options = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
            plugins: {
                legend: {
                    position: 'top' as const,
                    labels: {
                        color: '#FFFFFF',
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Wykres porównawczy danych',
                    color: '#FFFFFF',
                    font: {
                        size: 16
                    },
                    padding: {
                        top: 10,
                        bottom: 20
                    }
                }
            },
            scales: chartType !== 'pie' ? {
                x: {
                    ticks: {
                        color: '#FFFFFF',
                        maxRotation: 45,
                        font: {
                            size: 11
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y: {
                    ticks: {
                        color: '#FFFFFF',
                        font: {
                            size: 11
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            } : {},
            layout: {
                padding: {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 10
                }
            }
        };

        switch (chartType) {
            case 'line':
                return <Line data={chartData} options={options} />;
            case 'bar':
                return <Bar data={chartData} options={options} />;
            case 'pie':
                return <Pie data={chartData} options={options} />;
            default:
                return <Line data={chartData} options={options} />;
        }
    };

    if (isLoading && !chartData) {
        return (
            <div>
                <Navbar userEmail={userEmail} />
                <div className="loading-spinner" style={{ height: '100vh' }}>
                    <div className="spinner"></div>
                    <p>Ładowanie...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar userEmail={userEmail} />
            <div id="chartsdiv">
                <div id="chartmenutitle">
                    <h1>Wykresy</h1>
                </div>
                
                <div id="charts-main-content">
                    <div id="chartmenu">
                        {/* Wybór datasetów */}
                        <div className="menu-section">
                            <h3>Wybierz źródła danych</h3>
                            <div className="dataset-selection">
                                <div className="dataset-checkboxes">
                                    <div className="dataset-checkbox">
                                        <input
                                            type="checkbox"
                                            id="populations"
                                            checked={selectedDatasets.includes('populations')}
                                            onChange={() => handleDatasetChange('populations')}
                                        />
                                        <label htmlFor="populations">Populacja miast</label>
                                    </div>
                                    <div className="dataset-checkbox">
                                        <input
                                            type="checkbox"
                                            id="interestrates"
                                            checked={selectedDatasets.includes('interestrates')}
                                            onChange={() => handleDatasetChange('interestrates')}
                                        />
                                        <label htmlFor="interestrates">Stopy procentowe</label>
                                    </div>
                                    <div className="dataset-checkbox">
                                        <input
                                            type="checkbox"
                                            id="meterdata"
                                            checked={selectedDatasets.includes('meterdata')}
                                            onChange={() => handleDatasetChange('meterdata')}
                                        />
                                        <label htmlFor="meterdata">Ceny mieszkań</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Typ wykresu */}
                        <div className="menu-section">
                            <h3>Typ wykresu</h3>
                            <div className="chart-type-selector">
                                <select
                                    value={chartType}
                                    onChange={(e) => setChartType(e.target.value as 'line' | 'bar' | 'pie')}
                                >
                                    <option value="line">Liniowy</option>
                                    <option value="bar">Słupkowy</option>
                                    <option value="pie">Kołowy</option>
                                </select>
                            </div>
                        </div>

                        {/* Filtry */}
                        <div className="menu-section">
                            <h3>Filtry</h3>
                            <div className="chart-filters">
                                {selectedDatasets.includes('populations') && (
                                    <div className="filters-per-dataset">
                                        <h4>Populacja</h4>
                                        <div className="filter-row">
                                            <input
                                                type="text"
                                                placeholder="ID"
                                                value={filters.populations.id || ''}
                                                onChange={(e) => handleFilterChange('populations', 'id', e.target.value)}
                                            />
                                        </div>
                                        <div className="filter-row">
                                            <input
                                                type="number"
                                                placeholder="Rok"
                                                value={filters.populations.year || ''}
                                                onChange={(e) => handleFilterChange('populations', 'year', e.target.value)}
                                            />
                                        </div>
                                        <div className="filter-row">
                                            <input
                                                type="text"
                                                placeholder="Miasto"
                                                value={filters.populations.city || ''}
                                                onChange={(e) => handleFilterChange('populations', 'city', e.target.value)}
                                            />
                                        </div>
                                        <div className="filter-row">
                                            <input
                                                type="number"
                                                placeholder="Od roku"
                                                value={filters.populations.yearRange || ''}
                                                onChange={(e) => handleFilterChange('populations', 'yearRange', e.target.value)}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Do roku"
                                                value={filters.populations.yearRange_2 || ''}
                                                onChange={(e) => handleFilterChange('populations', 'yearRange_2', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}

                                {selectedDatasets.includes('interestrates') && (
                                    <div className="filters-per-dataset">
                                        <h4>Stopy procentowe</h4>
                                        <div className="filter-row">
                                            <input
                                                type="text"
                                                placeholder="ID"
                                                value={filters.interestrates.id || ''}
                                                onChange={(e) => handleFilterChange('interestrates', 'id', e.target.value)}
                                            />
                                        </div>
                                        <div className="filter-row">
                                            <input
                                                type="number"
                                                placeholder="Od roku"
                                                value={filters.interestrates.yearRange || ''}
                                                onChange={(e) => handleFilterChange('interestrates', 'yearRange', e.target.value)}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Do roku"
                                                value={filters.interestrates.yearRange_2 || ''}
                                                onChange={(e) => handleFilterChange('interestrates', 'yearRange_2', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}

                                {selectedDatasets.includes('meterdata') && (
                                    <div className="filters-per-dataset">
                                        <h4>Ceny mieszkań</h4>
                                        <div className="filter-row">
                                            <input
                                                type="text"
                                                placeholder="ID"
                                                value={filters.meterdata.id || ''}
                                                onChange={(e) => handleFilterChange('meterdata', 'id', e.target.value)}
                                            />
                                        </div>
                                        <div className="filter-row">
                                            <select
                                                value={filters.meterdata.market || ''}
                                                onChange={(e) => handleFilterChange('meterdata', 'market', e.target.value)}
                                            >
                                                <option value="">Wszystkie rynki</option>
                                                <option value="true">Rynek wtórny</option>
                                                <option value="false">Rynek pierwotny</option>
                                            </select>
                                        </div>
                                        <div className="filter-row">
                                            <select
                                                value={filters.meterdata.sales || ''}
                                                onChange={(e) => handleFilterChange('meterdata', 'sales', e.target.value)}
                                            >
                                                <option value="">Wszystkie ceny</option>
                                                <option value="true">Ceny realistyczne</option>
                                                <option value="false">Ceny oferowane</option>
                                            </select>
                                        </div>
                                        <div className="filter-row">
                                            <input
                                                type="text"
                                                placeholder="Miasto"
                                                value={filters.meterdata.city || ''}
                                                onChange={(e) => handleFilterChange('meterdata', 'city', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Akcje */}
                        <div className="menu-section">
                            <h3>Akcje</h3>
                            <div className="chart-actions">
                                <button
                                    className="chart-btn generate-chart-btn"
                                    onClick={generateChart}
                                    disabled={isLoading || selectedDatasets.length === 0}
                                >
                                    {isLoading ? 'Generowanie...' : 'Generuj wykres'}
                                </button>
                                <button
                                    className="chart-btn clear-chart-btn"
                                    onClick={clearChart}
                                >
                                    Wyczyść wykres
                                </button>
                                <button
                                    className="chart-btn clear-chart-btn"
                                    onClick={clearFilters}
                                >
                                    Wyczyść filtry
                                </button>
                            </div>
                        </div>
                    </div>

                    <div id="chartdisplay">
                        <div className="chart-container">
                            <div className="chart-canvas-container">
                                {renderChart()}
                            </div>
                        </div>

                        {chartData && (
                            <div className="chart-info">
                                <h4>Informacje o wykresie</h4>
                                <p>Wybrane datasety: <strong>{selectedDatasets.join(', ')}</strong></p>
                                <p>Typ wykresu: <strong>{chartType}</strong></p>
                                <p>Liczba serii danych: <strong>{chartData.datasets?.length || 0}</strong></p>
                                {populationData.length > 0 && (
                                    <p>Dane populacji: <strong>{populationData.length} rekordów</strong></p>
                                )}
                                {interestRateData.length > 0 && (
                                    <p>Dane stóp procentowych: <strong>{interestRateData.length} rekordów</strong></p>
                                )}
                                {meterDataList.length > 0 && (
                                    <p>Dane cen mieszkań: <strong>{meterDataList.length} rekordów</strong></p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChartsPage;