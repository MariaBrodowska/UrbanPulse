import { useEffect } from 'react';
import type { FilterState, SelectedDatasets } from '../types';
import './ChartFilters.css';

interface ChartFiltersProps {
    selectedDatasets: SelectedDatasets;
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
}

function ChartFilters({
    selectedDatasets,
    filters,
    onFiltersChange
}: ChartFiltersProps) {
    const handleFilterChange = (filterName: string, value: string) => {
        const newFilters = { ...filters }; 
        
        switch(filterName) {
            case "city":
                newFilters.city = value; 
                break;
            case "yearRange":
                newFilters.yearRange = value 
                break;
            case "yearRange_2":
                newFilters.yearRange_2 = value 
                break;
            default:
                break;
        }
        
        onFiltersChange(newFilters);
    };
    
    return (
        <div className="menu-section">
            <h3>Filters</h3>
            <div className="chart-filters">
                    <div className="filters-per-dataset">
                        <h4>Filters</h4>
                        <div className="filter-row">
                            <input
                                type="text"
                                placeholder="City"
                                value={filters.city || ''}
                                onChange={(e) => handleFilterChange('city', e.target.value)}
                                disabled={selectedDatasets.interestRates !== false && selectedDatasets.population ===false && selectedDatasets.meterData ===false}
                            />
                        </div>
                        <div className="filter-row">
                            <input
                                type="number"
                                placeholder="From Year"
                                value={filters.yearRange || ''}
                                onChange={(e) => handleFilterChange('yearRange', e.target.value)}
                            />
                        </div>
                        <div className="filter-row">
                            <input
                                type="number"
                                placeholder="To Year"
                                value={filters.yearRange_2 || ''}
                                onChange={(e) => handleFilterChange( 'yearRange_2', e.target.value)}
                            />
                        </div>
                    </div>
               

                
            </div>
        </div>
    );
}

export default ChartFilters;
