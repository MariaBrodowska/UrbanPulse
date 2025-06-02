import React from 'react';
import './ScatterAxisSelector.css';

interface ScatterAxisSelectorProps {
    xAxisData: 'population' | 'interestRates' | 'meterData';
    yAxisData: 'population' | 'interestRates' | 'meterData';
    onXAxisChange: (axis: 'population' | 'interestRates' | 'meterData') => void;
    onYAxisChange: (axis: 'population' | 'interestRates' | 'meterData') => void;
}

function ScatterAxisSelector({
    xAxisData,
    yAxisData,
    onXAxisChange,
    onYAxisChange
}: ScatterAxisSelectorProps) {
    const axisOptions = [
        { value: 'population' as const, label: 'Population' },
        { value: 'interestRates' as const, label: 'Interest Rates' },
        { value: 'meterData' as const, label: 'Meter Data' }
    ];

    return (
        <div className="menu-section">
            <h3>Osie Wykresu Punktowego</h3>
            <div className="scatter-axis-selector">
                <div className="axis-group">
                    <label>Oś X (pozioma):</label>
                    <select 
                        value={xAxisData} 
                        onChange={(e) => onXAxisChange(e.target.value as 'population' | 'interestRates' | 'meterData')}
                        className="axis-select"
                    >
                        {axisOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="axis-group">
                    <label>Oś Y (pionowa):</label>
                    <select 
                        value={yAxisData} 
                        onChange={(e) => onYAxisChange(e.target.value as 'population' | 'interestRates' | 'meterData')}
                        className="axis-select"
                    >
                        {axisOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                
                {xAxisData === yAxisData && (
                    <div className="warning">
                        ⚠️ Take diffrent datasets for X and Y axis
                    </div>
                )}
            </div>
        </div>
    );
}

export default ScatterAxisSelector;
