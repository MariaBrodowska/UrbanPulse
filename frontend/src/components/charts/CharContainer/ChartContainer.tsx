import { Line, Bar, Pie, Scatter } from 'react-chartjs-2';
import type { ChartType } from '../types';
import './ChartContainer.css';

interface ChartContainerProps {
    chartType: ChartType;
    chartData: any;
    error: string | null;
}

function ChartContainer({
    chartType,
    chartData,
    error
}: ChartContainerProps) {
    // Funkcja do generowania opcji wykresu na podstawie typu
    const getChartOptions = () => {
        const baseOptions = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
            plugins: {
                legend: {
                    position: 'top' as const,
                    labels: {
                        color: 'white',
                        font: {
                            size: 12
                        }
                    }
                },
                title: {
                    display: true,
                    text: getChartTitle(),
                    color: 'white',
                    font: {
                        size: 16,
                        weight: 'bold' as const
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: '#4a90e2',
                    borderWidth: 1
                }
            }
        };

        // Opcje dla wykresów ze skalami
        if (chartType !== 'pie') {
            const scalesConfig: any = {
                x: {
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            };

            if (chartType === 'multiAxis' && chartData?.yAxes) {
                // Konfiguracja dla wykresów wieloosiowych
                Object.keys(chartData.yAxes).forEach((axisId) => {
                    const axisConfig = chartData.yAxes[axisId];
                    scalesConfig[axisId] = {
                        type: 'linear',
                        position: axisConfig.position,
                        ticks: {
                            color: axisConfig.color
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        title: {
                            display: true,
                            text: axisConfig.label,
                            color: axisConfig.color
                        }
                    };
                });
            } else if (chartType === 'timeSeriesInterestRates' && chartData?.xAxisConfig && chartData?.yAxisConfig) {
                // Konfiguracja dla wykresu czasowego stóp procentowych
                scalesConfig.x = {
                    ...chartData.xAxisConfig,
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    title: {
                        ...chartData.xAxisConfig.title,
                        color: 'white'
                    }
                };
                scalesConfig.y = {
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    title: {
                        ...chartData.yAxisConfig.title,
                        color: 'white'
                    }
                };
            } else if (chartType === 'scatter' && chartData?.xAxisLabel && chartData?.yAxisLabel) {
                // Konfiguracja dla wykresu punktowego
                scalesConfig.x.title = {
                    display: true,
                    text: chartData.xAxisLabel,
                    color: 'white'
                };
                scalesConfig.y = {
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    title: {
                        display: true,
                        text: chartData.yAxisLabel,
                        color: 'white'
                    }
                };
            } else {
                // Standardowa konfiguracja osi Y
                scalesConfig.y = {
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                };
            }

            return { ...baseOptions, scales: scalesConfig };
        }

        return baseOptions;
    };

    const getChartTitle = () => {
        switch (chartType) {
            case 'line':
                return 'Wykres Liniowy';
            case 'bar':
                return 'Wykres Słupkowy';
            case 'pie':
                return 'Wykres Kołowy';
            case 'multiAxis':
                return 'Wykres Wieloosiowy';
            case 'scatter':
                return 'Wykres Punktowy (Korelacja)';
            case 'timeSeriesInterestRates':
                return 'Stopy Procentowe w Czasie';
            default:
                return 'Data Visualization';
        }
    };

    const chartOptions = getChartOptions();

    if (error) {
        return (
            <div className="chart-error">
                <p>Error: {error}</p>
            </div>
        );
    }

    if (!chartData || !chartData.datasets || chartData.datasets.length === 0) {
        return (
            <div className="chart-placeholder">
                <p>Select datasets and click "Generate Chart" to visualize data</p>
            </div>
        );
    }

    return (
        <div className="chart-container">
            {chartType === 'line' && <Line data={chartData} options={chartOptions} />}
            {chartType === 'bar' && <Bar data={chartData} options={chartOptions} />}
            {chartType === 'pie' && <Pie data={chartData} options={chartOptions} />}
            {chartType === 'multiAxis' && <Line data={chartData} options={chartOptions} />}
            {chartType === 'scatter' && <Scatter data={chartData} options={chartOptions} />}
            {chartType === 'timeSeriesInterestRates' && <Line data={chartData} options={chartOptions} />}
        </div>
    );
}

export default ChartContainer;
