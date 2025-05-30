import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import './Charts.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

// --- Data Interfaces ---
interface PopulationRecord {
  id: number;
  year: number;
  number: number;
  cityId: number;
  cityName: string;
}

interface InterestRateRecord {
  id: number;
  date: string;
  rate: number;
  typeOfInterestRateId: number;
  typeOfInterestRateName: string;
}

interface FlatPriceRecord {
  id: number;
  year: number;
  price: number;
  quarter: number;
  isSecondaryMarket: boolean;
  isRealistic: boolean;
  cityId: number;
  cityName: string;
}

// Chart configuration
type ChartType = 'line' | 'bar' | 'pie';

const API_BASE_URL = 'http://localhost:5000/api';

// Helper functions
const getRandomColor = (): string => {
  const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
    '#FF9F40', '#FF6B7D', '#51E5FF', '#FF8A4C', '#A3A1FB'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const DataCharts: React.FC = () => {
  // Stan główny
  const [chartType, setChartType] = useState<ChartType>('line');
  
  // Dane z API
  const [populationData, setPopulationData] = useState<PopulationRecord[]>([]);
  const [interestRateData, setInterestRateData] = useState<InterestRateRecord[]>([]);
  const [flatPriceData, setFlatPriceData] = useState<FlatPriceRecord[]>([]);
  
  // Kontrola wyświetlania danych - możliwość łączenia różnych typów
  const [showPopulation, setShowPopulation] = useState<boolean>(true);
  const [showInterestRates, setShowInterestRates] = useState<boolean>(false);
  const [showFlatPrices, setShowFlatPrices] = useState<boolean>(false);
  
  // Filtry populacji
  const [populationCities, setPopulationCities] = useState<string[]>([]);
  const [populationYearRange, setPopulationYearRange] = useState<{ start: number; end: number }>({ start: 2015, end: 2024 });
  
  // Filtry stóp procentowych
  const [interestRateTypes, setInterestRateTypes] = useState<string[]>([]);
  const [interestDateRange, setInterestDateRange] = useState<{ start: string; end: string }>({ start: '2015-01-01', end: '2024-12-31' });
  
  // Filtry cen mieszkań
  const [flatPriceCities, setFlatPriceCities] = useState<string[]>([]);
  const [flatPriceYearRange, setFlatPriceYearRange] = useState<{ start: number; end: number }>({ start: 2015, end: 2024 });
  const [flatPriceQuarters, setFlatPriceQuarters] = useState<number[]>([1, 2, 3, 4]);
  const [flatPriceSecondaryMarket, setFlatPriceSecondaryMarket] = useState<boolean | null>(null);
  const [flatPriceRealistic, setFlatPriceRealistic] = useState<boolean | null>(null);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pobieranie danych z API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [popRes, interestRes, flatPriceRes] = await Promise.all([
          axios.get<PopulationRecord[]>(`${API_BASE_URL}/population/`, { withCredentials: true }),
          axios.get<InterestRateRecord[]>(`${API_BASE_URL}/interest-rates/`, { withCredentials: true }),
          axios.get<FlatPriceRecord[]>(`${API_BASE_URL}/flat-prices/`, { withCredentials: true })
        ]);

        setPopulationData(popRes.data || []);
        setInterestRateData(interestRes.data || []);
        setFlatPriceData(flatPriceRes.data || []);

      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Nie udało się pobrać danych z API");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Funkcje filtrowania danych
  const getFilteredPopulationData = () => {
    return populationData.filter(item => 
      (populationCities.length === 0 || populationCities.includes(item.cityName)) &&
      item.year >= populationYearRange.start &&
      item.year <= populationYearRange.end
    );
  };

  const getFilteredInterestRateData = () => {
    return interestRateData.filter(item => {
      const itemDate = new Date(item.date);
      const startDate = new Date(interestDateRange.start);
      const endDate = new Date(interestDateRange.end);
      return (interestRateTypes.length === 0 || interestRateTypes.includes(item.typeOfInterestRateName)) &&
        itemDate >= startDate && itemDate <= endDate;
    });
  };

  const getFilteredFlatPriceData = () => {
    return flatPriceData.filter(item => 
      (flatPriceCities.length === 0 || flatPriceCities.includes(item.cityName)) &&
      item.year >= flatPriceYearRange.start &&
      item.year <= flatPriceYearRange.end &&
      flatPriceQuarters.includes(item.quarter) &&
      (flatPriceSecondaryMarket === null || item.isSecondaryMarket === flatPriceSecondaryMarket) &&
      (flatPriceRealistic === null || item.isRealistic === flatPriceRealistic)
    );
  };

  // Przygotowanie danych dla wykresu - łączy wszystkie wybrane źródła
  const prepareChartData = () => {
    const datasets: any[] = [];

    // Dodanie danych populacji
    if (showPopulation && chartType !== 'pie') {
      const filteredData = getFilteredPopulationData();
      const populationByCity: Record<string, Array<{ x: number; y: number }>> = {};
      
      filteredData.forEach((item: PopulationRecord) => {
        if (!populationByCity[item.cityName]) {
          populationByCity[item.cityName] = [];
        }
        populationByCity[item.cityName].push({ x: item.year, y: item.number });
      });

      Object.entries(populationByCity).forEach(([cityName, points]) => {
        datasets.push({
          label: `Populacja - ${cityName}`,
          data: points.sort((a, b) => a.x - b.x),
          borderColor: '#FF6384',
          backgroundColor: chartType === 'bar' ? '#FF6384' : 'transparent',
          tension: 0.1,
          fill: false,
          yAxisID: 'y'
        });
      });
    }

    // Dodanie danych stóp procentowych
    if (showInterestRates && chartType !== 'pie') {
      const filteredData = getFilteredInterestRateData();
      const ratesByType: Record<string, Array<{ x: Date; y: number }>> = {};
      
      filteredData.forEach((item: InterestRateRecord) => {
        if (!ratesByType[item.typeOfInterestRateName]) {
          ratesByType[item.typeOfInterestRateName] = [];
        }
        ratesByType[item.typeOfInterestRateName].push({ x: new Date(item.date), y: item.rate });
      });

      Object.entries(ratesByType).forEach(([typeName, points]) => {
        datasets.push({
          label: `Stopa - ${typeName}`,
          data: points.sort((a, b) => a.x.getTime() - b.x.getTime()),
          borderColor: '#36A2EB',
          backgroundColor: chartType === 'bar' ? '#36A2EB' : 'transparent',
          tension: 0.1,
          fill: false,
          yAxisID: 'y1'
        });
      });
    }

    // Dodanie danych cen mieszkań
    if (showFlatPrices && chartType !== 'pie') {
      const filteredData = getFilteredFlatPriceData();
      const pricesByCity: Record<string, Array<{ x: Date; y: number }>> = {};
      
      filteredData.forEach((item: FlatPriceRecord) => {
        if (!pricesByCity[item.cityName]) {
          pricesByCity[item.cityName] = [];
        }
        const quarterDate = new Date(item.year, (item.quarter - 1) * 3, 1);
        pricesByCity[item.cityName].push({ x: quarterDate, y: item.price });
      });

      Object.entries(pricesByCity).forEach(([cityName, points]) => {
        datasets.push({
          label: `Ceny - ${cityName}`,
          data: points.sort((a, b) => a.x.getTime() - b.x.getTime()),
          borderColor: '#FFCE56',
          backgroundColor: chartType === 'bar' ? '#FFCE56' : 'transparent',
          tension: 0.1,
          fill: false,
          yAxisID: 'y2'
        });
      });
    }

    // Dla wykresów kołowych - wyświetl tylko jeden typ danych
    if (chartType === 'pie') {
      if (showPopulation) {
        return preparePieDataForPopulation();
      } else if (showInterestRates) {
        return preparePieDataForInterestRates();
      } else if (showFlatPrices) {
        return preparePieDataForFlatPrices();
      }
    }

    return { datasets };
  };

  // Przygotowanie danych dla wykresów kołowych - populacja
  const preparePieDataForPopulation = () => {
    const filteredData = getFilteredPopulationData();
    const aggregatedData: Record<string, number> = {};
    
    filteredData.forEach((item: PopulationRecord) => {
      aggregatedData[item.cityName] = (aggregatedData[item.cityName] || 0) + item.number;
    });

    const labels = Object.keys(aggregatedData);
    const values = Object.values(aggregatedData);
    const colors = labels.map(() => getRandomColor());

    return {
      labels,
      datasets: [{
        label: 'Populacja',
        data: values,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1
      }]
    };
  };

  // Przygotowanie danych dla wykresów kołowych - stopy procentowe
  const preparePieDataForInterestRates = () => {
    const filteredData = getFilteredInterestRateData();
    const rateGroups: Record<string, { total: number; count: number }> = {};
    
    filteredData.forEach((item: InterestRateRecord) => {
      if (!rateGroups[item.typeOfInterestRateName]) {
        rateGroups[item.typeOfInterestRateName] = { total: 0, count: 0 };
      }
      rateGroups[item.typeOfInterestRateName].total += item.rate;
      rateGroups[item.typeOfInterestRateName].count += 1;
    });

    const labels = Object.keys(rateGroups);
    const values = labels.map(type => rateGroups[type].total / rateGroups[type].count);
    const colors = labels.map(() => getRandomColor());

    return {
      labels,
      datasets: [{
        label: 'Średnie stopy procentowe',
        data: values,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1
      }]
    };
  };

  // Przygotowanie danych dla wykresów kołowych - ceny mieszkań
  const preparePieDataForFlatPrices = () => {
    const filteredData = getFilteredFlatPriceData();
    const priceGroups: Record<string, { total: number; count: number }> = {};
    
    filteredData.forEach((item: FlatPriceRecord) => {
      if (!priceGroups[item.cityName]) {
        priceGroups[item.cityName] = { total: 0, count: 0 };
      }
      priceGroups[item.cityName].total += item.price;
      priceGroups[item.cityName].count += 1;
    });

    const labels = Object.keys(priceGroups);
    const values = labels.map(city => priceGroups[city].total / priceGroups[city].count);
    const colors = labels.map(() => getRandomColor());

    return {
      labels,
      datasets: [{
        label: 'Średnie ceny mieszkań',
        data: values,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1
      }]
    };
  };

  // Opcje wykresu
  const getChartOptions = () => {
    if (chartType === 'pie') {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Porównanie danych'
          },
          legend: {
            position: 'right' as const
          }
        }
      };
    }

    // Opcje dla wykresów liniowych i słupkowych z wieloma osiami Y
    const baseOptions: any = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Porównanie różnych typów danych'
        },
        legend: {
          position: 'top' as const
        }
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'year',
            displayFormats: {
              year: 'yyyy'
            }
          },
          title: {
            display: true,
            text: 'Czas'
          }
        },
        y: {
          type: 'linear',
          display: showPopulation,
          position: 'left' as const,
          title: {
            display: true,
            text: 'Populacja'
          },
          grid: {
            drawOnChartArea: false,
          },
        },
        y1: {
          type: 'linear',
          display: showInterestRates,
          position: 'right' as const,
          title: {
            display: true,
            text: 'Stopy procentowe (%)'
          },
          grid: {
            drawOnChartArea: false,
          },
        },
        y2: {
          type: 'linear',
          display: showFlatPrices,
          position: 'right' as const,
          title: {
            display: true,
            text: 'Ceny mieszkań (PLN)'
          },
          grid: {
            drawOnChartArea: false,
          },
        }
      }
    };

    return baseOptions;
  };

  // Renderowanie wykresu
  const renderChart = () => {
    const chartData = prepareChartData();
    const options = getChartOptions();

    if (!chartData || (chartData.datasets && chartData.datasets.length === 0)) {
      return <div className="no-data">Wybierz dane do wyświetlenia</div>;
    }

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

  // Funkcje pomocnicze dla opcji filtrów
  const getUniquePopulationCities = () => [...new Set(populationData.map(item => item.cityName))];
  const getUniqueInterestRateTypes = () => [...new Set(interestRateData.map(item => item.typeOfInterestRateName))];
  const getUniqueFlatPriceCities = () => [...new Set(flatPriceData.map(item => item.cityName))];

  if (loading) return <div className="loading">Ładowanie danych...</div>;
  if (error) return <div className="error">Błąd: {error}</div>;

  return (
    <div className="Charts">
      <h1>📊 Porównanie Danych na Jednym Wykresie</h1>
      
      {/* Panel kontrolny */}
      <div className="control-panel">
        
        {/* Wybór typu wykresu */}
        <div className="control-section">
          <h3>🎨 Typ Wykresu</h3>
          <div className="button-group">
            <button 
              className={`chart-button ${chartType === 'line' ? 'active' : ''}`}
              onClick={() => setChartType('line')}
            >
              📈 Liniowy
            </button>
            <button 
              className={`chart-button ${chartType === 'bar' ? 'active' : ''}`}
              onClick={() => setChartType('bar')}
            >
              📊 Słupkowy
            </button>
            <button 
              className={`chart-button ${chartType === 'pie' ? 'active' : ''}`}
              onClick={() => setChartType('pie')}
            >
              🥧 Kołowy
            </button>
          </div>
        </div>

        {/* Wybór źródeł danych */}
        <div className="control-section">
          <h3>📋 Wybierz Dane do Wyświetlenia</h3>
          <div className="data-toggles">
            <label className="data-toggle">
              <input
                type="checkbox"
                checked={showPopulation}
                onChange={(e) => setShowPopulation(e.target.checked)}
              />
              <span className="data-toggle-label">👥 Populacja</span>
            </label>
            <label className="data-toggle">
              <input
                type="checkbox"
                checked={showInterestRates}
                onChange={(e) => setShowInterestRates(e.target.checked)}
              />
              <span className="data-toggle-label">💰 Stopy Procentowe</span>
            </label>
            <label className="data-toggle">
              <input
                type="checkbox"
                checked={showFlatPrices}
                onChange={(e) => setShowFlatPrices(e.target.checked)}
              />
              <span className="data-toggle-label">🏠 Ceny Mieszkań</span>
            </label>
          </div>
        </div>

        {/* Filtry dla populacji */}
        {showPopulation && (
          <div className="control-section">
            <h3>🏙️ Filtry Populacji</h3>
            <div className="filter-grid">
              <div className="filter-item">
                <label>Miasta:</label>
                <select 
                  multiple 
                  value={populationCities}
                  onChange={(e) => setPopulationCities(Array.from(e.target.selectedOptions, option => option.value))}
                >
                  {getUniquePopulationCities().map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div className="filter-item">
                <label>Rok od:</label>
                <input 
                  type="number" 
                  value={populationYearRange.start}
                  onChange={(e) => setPopulationYearRange(prev => ({ ...prev, start: parseInt(e.target.value) || 1990 }))}
                />
              </div>
              <div className="filter-item">
                <label>Rok do:</label>
                <input 
                  type="number" 
                  value={populationYearRange.end}
                  onChange={(e) => setPopulationYearRange(prev => ({ ...prev, end: parseInt(e.target.value) || 2024 }))}
                />
              </div>
            </div>
          </div>
        )}

        {/* Filtry dla stóp procentowych */}
        {showInterestRates && (
          <div className="control-section">
            <h3>💵 Filtry Stóp Procentowych</h3>
            <div className="filter-grid">
              <div className="filter-item">
                <label>Typy stóp:</label>
                <select 
                  multiple 
                  value={interestRateTypes}
                  onChange={(e) => setInterestRateTypes(Array.from(e.target.selectedOptions, option => option.value))}
                >
                  {getUniqueInterestRateTypes().map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="filter-item">
                <label>Data od:</label>
                <input 
                  type="date" 
                  value={interestDateRange.start}
                  onChange={(e) => setInterestDateRange(prev => ({ ...prev, start: e.target.value }))}
                />
              </div>
              <div className="filter-item">
                <label>Data do:</label>
                <input 
                  type="date" 
                  value={interestDateRange.end}
                  onChange={(e) => setInterestDateRange(prev => ({ ...prev, end: e.target.value }))}
                />
              </div>
            </div>
          </div>
        )}

        {/* Filtry dla cen mieszkań */}
        {showFlatPrices && (
          <div className="control-section">
            <h3>🏘️ Filtry Cen Mieszkań</h3>
            <div className="filter-grid">
              <div className="filter-item">
                <label>Miasta:</label>
                <select 
                  multiple 
                  value={flatPriceCities}
                  onChange={(e) => setFlatPriceCities(Array.from(e.target.selectedOptions, option => option.value))}
                >
                  {getUniqueFlatPriceCities().map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div className="filter-item">
                <label>Rok od:</label>
                <input 
                  type="number" 
                  value={flatPriceYearRange.start}
                  onChange={(e) => setFlatPriceYearRange(prev => ({ ...prev, start: parseInt(e.target.value) || 1990 }))}
                />
              </div>
              <div className="filter-item">
                <label>Rok do:</label>
                <input 
                  type="number" 
                  value={flatPriceYearRange.end}
                  onChange={(e) => setFlatPriceYearRange(prev => ({ ...prev, end: parseInt(e.target.value) || 2024 }))}
                />
              </div>
              <div className="filter-item">
                <label>Kwartały:</label>
                <div className="checkbox-group">
                  {[1, 2, 3, 4].map(quarter => (
                    <label key={quarter} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={flatPriceQuarters.includes(quarter)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFlatPriceQuarters(prev => [...prev, quarter]);
                          } else {
                            setFlatPriceQuarters(prev => prev.filter(q => q !== quarter));
                          }
                        }}
                      />
                      Q{quarter}
                    </label>
                  ))}
                </div>
              </div>
              <div className="filter-item">
                <label>Rynek wtórny:</label>
                <select 
                  value={flatPriceSecondaryMarket?.toString() || ''}
                  onChange={(e) => setFlatPriceSecondaryMarket(e.target.value === '' ? null : e.target.value === 'true')}
                >
                  <option value="">Wszystkie</option>
                  <option value="true">Tak</option>
                  <option value="false">Nie</option>
                </select>
              </div>
              <div className="filter-item">
                <label>Realistyczne dane:</label>
                <select 
                  value={flatPriceRealistic?.toString() || ''}
                  onChange={(e) => setFlatPriceRealistic(e.target.value === '' ? null : e.target.value === 'true')}
                >
                  <option value="">Wszystkie</option>
                  <option value="true">Tak</option>
                  <option value="false">Nie</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Szybkie akcje */}
        <div className="control-section">
          <h3>⚡ Szybkie Akcje</h3>
          <div className="button-group">
            <button 
              className="action-button"
              onClick={() => {
                setPopulationCities([]);
                setInterestRateTypes([]);
                setFlatPriceCities([]);
                setPopulationYearRange({ start: 2015, end: 2024 });
                setInterestDateRange({ start: '2015-01-01', end: '2024-12-31' });
                setFlatPriceYearRange({ start: 2015, end: 2024 });
                setFlatPriceQuarters([1, 2, 3, 4]);
                setFlatPriceSecondaryMarket(null);
                setFlatPriceRealistic(null);
              }}
            >
              🔄 Reset Filtrów
            </button>
            <button 
              className="action-button"
              onClick={() => {
                setShowPopulation(true);
                setShowInterestRates(true);
                setShowFlatPrices(false);
              }}
            >
              📊 Populacja + Stopy
            </button>
            <button 
              className="action-button"
              onClick={() => {
                setShowPopulation(false);
                setShowInterestRates(true);
                setShowFlatPrices(true);
              }}
            >
              💰 Stopy + Ceny
            </button>
            <button 
              className="action-button"
              onClick={() => {
                setShowPopulation(true);
                setShowInterestRates(false);
                setShowFlatPrices(true);
              }}
            >
              🏘️ Populacja + Ceny
            </button>
          </div>
        </div>
      </div>

      {/* Wykres */}
      <div className="chart-wrapper">
        <div className="chart-container">
          {renderChart()}
        </div>
      </div>
    </div>
  );
};

export default DataCharts;