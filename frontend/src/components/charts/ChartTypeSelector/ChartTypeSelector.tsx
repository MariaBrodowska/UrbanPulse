import type { ChartType } from '../types'; 
import './ChartTypeSelector.css';

interface ChartTypeSelectorProps {
    chartType: ChartType;
    onChartTypeChange: (type: ChartType) => void;
   
}

function ChartTypeSelector({
    chartType,
    onChartTypeChange
}: ChartTypeSelectorProps) {
  

    const chartTypes: Array<{ value: ChartType; label: string }> = [
        { value: 'line', label: 'Linear Chart' },
        { value: 'bar', label: 'Bar Chart' },
        { value: 'pie', label: 'Pie Chart' },
        { value: 'multiAxis', label: 'MultiAxis Chart' },
        { value: 'scatter', label: 'Point Chart (Comparing two datasets)' },
        { value: 'timeSeriesInterestRates', label: 'Interest rates Chart' }
    ];

    
    return (
        <div className="menu-section">
            <h3>Chart Type</h3> 
            <div className="chart-type-selector">
                <select
                    id="chartTypeSelect" 
                    value={chartType}
                    onChange={(e) => onChartTypeChange(e.target.value as ChartType)}
                    aria-label="Wybierz typ wykresu"
                >
                   
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