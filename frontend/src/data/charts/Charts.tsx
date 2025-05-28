import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale, // Import TimeScale for date axes
  type ChartOptions, // Type for chart options
  // ChartData // Type for chart data structure (can be used for state)
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns'; // Adapter for date handling
// Optional: if you use date-fns for date manipulation elsewhere
// import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale // Register TimeScale
);

// --- API Data Interfaces ---
interface PopulationRecord {
  id: number;
  year: number;
  number: number;
  cityId: number;
  cityName: string;
}

interface InterestRateRecord {
  id: number;
  date: string; // ISO date string
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

// --- Chart.js Data Structures ---
interface ChartPoint {
  x: number | Date; // Year (number) or Date object
  y: number;
}

interface ChartJsDataset {
  label: string;
  data: ChartPoint[];
  borderColor: string;
  tension: number;
  fill: boolean;
  // pointRadius?: number; // Optional: for customizing points
  // pointHoverRadius?: number;
}

interface FormattedChartData {
  datasets: ChartJsDataset[];
}

// Base URL for your API
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to generate random colors for chart lines
const getRandomColor = (): string => {
  const r = Math.floor(Math.random() * 200);
  const g = Math.floor(Math.random() * 200);
  const b = Math.floor(Math.random() * 200);
  return `rgb(${r}, ${g}, ${b})`;
};

// Valid time units for Chart.js time scale
type TimeUnit = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';


const DataCharts: React.FC = () => {
  const [populationChartData, setPopulationChartData] = useState<FormattedChartData | null>(null);
  const [interestRateChartData, setInterestRateChartData] = useState<FormattedChartData | null>(null);
  const [flatPriceChartData, setFlatPriceChartData] = useState<FormattedChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [popRes, interestRes, flatPriceRes] = await Promise.all([
          axios.get<PopulationRecord[]>(`${API_BASE_URL}/population/`, {withCredentials:true}),
          axios.get<InterestRateRecord[]>(`${API_BASE_URL}/interest-rates/`, {withCredentials:true}),
          axios.get<FlatPriceRecord[]>(`${API_BASE_URL}/flat-prices/`, {withCredentials:true})
        ]);

        // 1. Process Population Data
        if (popRes.data && popRes.data.length > 0) {
          const rawPopulationData = popRes.data;
          const populationByCity = rawPopulationData.reduce((acc, item) => {
            acc[item.cityName] = acc[item.cityName] || [];
            acc[item.cityName].push({ x: item.year, y: item.number });
            return acc;
          }, {} as Record<string, ChartPoint[]>);

          const populationDatasets: ChartJsDataset[] = Object.entries(populationByCity).map(([cityName, data]) => ({
            label: cityName,
            data: data.sort((a, b) => (a.x as number) - (b.x as number)), // Sort by year
            borderColor: getRandomColor(),
            tension: 0.1,
            fill: false,
          }));
          setPopulationChartData({ datasets: populationDatasets });
        } else {
          setPopulationChartData({ datasets: [] });
        }

        // 2. Process Interest Rate Data
        if (interestRes.data && interestRes.data.length > 0) {
          const rawInterestData = interestRes.data;
          const ratesByType = rawInterestData.reduce((acc, item) => {
            acc[item.typeOfInterestRateName] = acc[item.typeOfInterestRateName] || [];
            acc[item.typeOfInterestRateName].push({ x: new Date(item.date), y: item.rate });
            return acc;
          }, {} as Record<string, ChartPoint[]>);

          const interestDatasets: ChartJsDataset[] = Object.entries(ratesByType).map(([typeName, data]) => ({
            label: typeName,
            data: data.sort((a, b) => (a.x as Date).getTime() - (b.x as Date).getTime()), // Sort by date
            borderColor: getRandomColor(),
            tension: 0.1,
            fill: false,
          }));
          setInterestRateChartData({ datasets: interestDatasets });
        } else {
          setInterestRateChartData({ datasets: [] });
        }

        // 3. Process Flat Price Data
        if (flatPriceRes.data && flatPriceRes.data.length > 0) {
          const rawFlatPriceData = flatPriceRes.data;
          const pricesByCity = rawFlatPriceData.reduce((acc, item) => {
            acc[item.cityName] = acc[item.cityName] || [];
            const quarterStartDate = new Date(item.year, (item.quarter - 1) * 3, 1); // Month is 0-indexed
            acc[item.cityName].push({ x: quarterStartDate, y: item.price });
            return acc;
          }, {} as Record<string, ChartPoint[]>);

          const flatPriceDatasets: ChartJsDataset[] = Object.entries(pricesByCity).map(([cityName, data]) => ({
            label: cityName,
            data: data.sort((a, b) => (a.x as Date).getTime() - (b.x as Date).getTime()), // Sort by date
            borderColor: getRandomColor(),
            tension: 0.1,
            fill: false,
          }));
          setFlatPriceChartData({ datasets: flatPriceDatasets });
        } else {
          setFlatPriceChartData({ datasets: [] });
        }

      } catch (err) {
        console.error("Failed to fetch data:", err);
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message || "Failed to load data from API.");
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const commonOptions = (
    titleText: string,
    xAxisLabel: string,
    yAxisLabel: string,
    timeUnit: TimeUnit | null = null // Allow null for non-time scales
  ): ChartOptions<'line'> => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: titleText,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        type: timeUnit ? 'time' : 'linear', // 'linear' for population year, 'time' for others
        title: {
          display: true,
          text: xAxisLabel,
        },
        ...(timeUnit && {
          time: {
            unit: timeUnit,
            tooltipFormat: timeUnit === 'quarter' ? 'QQQ yyyy' : (timeUnit === 'year' ? 'yyyy' : 'MMM yyyy'),
            displayFormats: { // Ensure displayFormats match the unit
              quarter: 'QQQ yyyy',
              month: 'MMM yyyy',
              year: 'yyyy',
            }
          },
        }),
        ...(!timeUnit && { // Specific for population chart (linear scale with year numbers)
            ticks: {
                stepSize: 1,
                callback: function(value: string | number) { // value can be string or number from Chart.js
                    // Ensure we only show integer years if the scale generates fractional ticks
                    return Number.isInteger(Number(value)) ? value : null;
                }
            }
        })
      },
      y: {
        title: {
          display: true,
          text: yAxisLabel,
        },
        beginAtZero: false, // Consider true for population if it makes sense
      },
    },
  });

  if (loading) return <p className="status">Loading data...</p>;
  if (error) return <p className="status error">Error: {error}</p>;

  return (
    <div className="Charts">
      <h1>Data Visualizations (TypeScript)</h1>

      <div className="chart-container">
        <h2>Population Over Years</h2>
        {populationChartData && populationChartData.datasets.length > 0 ? (
          <Line
            options={commonOptions('City Population', 'Year', 'Population', null)} // 'year' as timeUnit if preferred
            data={populationChartData}
          />
        ) : <p>No population data available or an error occurred.</p>}
      </div>

      <div className="chart-container">
        <h2>Interest Rates Over Time</h2>
        {interestRateChartData && interestRateChartData.datasets.length > 0 ? (
          <Line
            options={commonOptions('Interest Rates', 'Date', 'Rate', 'month')}
            data={interestRateChartData}
          />
        ) : <p>No interest rate data available or an error occurred.</p>}
      </div>

      <div className="chart-container">
        <h2>Flat Prices Over Time (by Quarter)</h2>
        {flatPriceChartData && flatPriceChartData.datasets.length > 0 ? (
          <Line
            options={commonOptions('Flat Prices', 'Time (Year-Quarter)', 'Price (PLN)', 'quarter')}
            data={flatPriceChartData}
          />
        ) : <p>No flat price data available or an error occurred.</p>}
      </div>
    </div>
  );
};


export default DataCharts;