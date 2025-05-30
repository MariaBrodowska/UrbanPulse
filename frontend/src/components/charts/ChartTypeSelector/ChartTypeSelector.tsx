import type { ChartType } from '../types'; // Upewnij się, że ChartType zawiera 'scatter'
import './ChartTypeSelector.css';

interface ChartTypeSelectorProps {
    chartType: ChartType;
    onChartTypeChange: (type: ChartType) => void;
    // Możesz dodać opcjonalną prop, aby kontrolować, które typy wykresów są dostępne
    // np. availableChartTypes?: ChartType[];
}

function ChartTypeSelector({
    chartType,
    onChartTypeChange
}: ChartTypeSelectorProps) {
    // Upewnij się, że typ ChartType w types.ts zawiera 'scatter'
    // export type ChartType = 'line' | 'bar' | 'pie' | 'scatter';

    const chartTypes: Array<{ value: ChartType; label: string }> = [
        { value: 'line', label: 'Wykres Liniowy' },
        { value: 'bar', label: 'Wykres Słupkowy' },
        { value: 'pie', label: 'Wykres Kołowy' },
        { value: 'multiAxis', label: 'Wykres Wieloosiowy' },
        { value: 'scatter', label: 'Wykres Punktowy (Korelacji)' }
    ];

    // Jeśli używasz availableChartTypes:
    // const availableTypes = availableChartTypes ? chartTypes.filter(ct => availableChartTypes.includes(ct.value)) : chartTypes;

    return (
        <div className="menu-section">
            <h3>Typ Wykresu</h3> {/* Zmienione na polski */}
            <div className="chart-type-selector">
                <select
                    id="chartTypeSelect" // Dobra praktyka dodać id dla label/testów
                    value={chartType}
                    onChange={(e) => onChartTypeChange(e.target.value as ChartType)}
                    aria-label="Wybierz typ wykresu"
                >
                    {/* Jeśli używasz availableTypes:
                    {availableTypes.map(type => (
                        <option key={type.value} value={type.value}>
                            {type.label}
                        </option>
                    ))}
                    */}
                    {chartTypes.map(type => (
                        <option key={type.value} value={type.value}>
                            {type.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default ChartTypeSelector;