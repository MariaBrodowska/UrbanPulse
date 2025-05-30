import type { PopulationData, InterestRateData, MeterData } from '../types';
import './ChartInfo.css';

interface ChartInfoProps {
    populationData: PopulationData[];
    interestRateData: InterestRateData[];
    meterData: MeterData[];
    selectedDatasets: {
        population: boolean;
        interestRates: boolean;
        meterData: boolean;
    };
}

function ChartInfo({
    populationData,
    interestRateData,
    meterData,
    selectedDatasets
}: ChartInfoProps) {
    const getDatasetInfo = () => {
        const info = [];
        
        if (selectedDatasets.population && populationData.length > 0) {
            info.push({
                name: 'Population Data',
                count: populationData.length,
                years: `${Math.min(...populationData.map(d => d.year))} - ${Math.max(...populationData.map(d => d.year))}`,
                cities: [...new Set(populationData.map(d => d.cityName))].length
            });
        }

        if (selectedDatasets.interestRates && interestRateData.length > 0) {
            info.push({
                name: 'Interest Rates',
                count: interestRateData.length,
                dateRange: `${new Date(Math.min(...interestRateData.map(d => new Date(d.date).getTime()))).toLocaleDateString()} - ${new Date(Math.max(...interestRateData.map(d => new Date(d.date).getTime()))).toLocaleDateString()}`,
                types: [...new Set(interestRateData.map(d => d.typeOfInterestRateName))].length
            });
        }

        if (selectedDatasets.meterData && meterData.length > 0) {
            info.push({
                name: 'Meter Data',
                count: meterData.length,
                years: `${Math.min(...meterData.map(d => d.year))} - ${Math.max(...meterData.map(d => d.year))}`,
                cities: [...new Set(meterData.map(d => d.cityName))].length
            });
        }

        return info;
    };

    const datasetInfo = getDatasetInfo();

    if (datasetInfo.length === 0) {
        return null;
    }

    return (
        <div className="chart-info">
            <h3>Dataset Information</h3>
            <div className="info-grid">
                {datasetInfo.map((info, index) => (
                    <div key={index} className="info-card">
                        <h4>{info.name}</h4>
                        <div className="info-details">
                            <p><strong>Records:</strong> {info.count}</p>
                            {info.years && <p><strong>Years:</strong> {info.years}</p>}
                            {info.dateRange && <p><strong>Date Range:</strong> {info.dateRange}</p>}
                            {info.cities && <p><strong>Cities:</strong> {info.cities}</p>}
                            {info.types && <p><strong>Types:</strong> {info.types}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChartInfo;
