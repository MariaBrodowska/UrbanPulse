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
        { value: 'population' as const, label: 'Populacja' },
        { value: 'interestRates' as const, label: 'Stopy Procentowe' },
        { value: 'meterData' as const, label: 'Ceny Mieszkań' }
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
                        ⚠️ Wybierz różne zmienne dla osi X i Y, aby zobaczyć korelację
                    </div>
                )}
            </div>
        </div>
    );
}

export default ScatterAxisSelector;
