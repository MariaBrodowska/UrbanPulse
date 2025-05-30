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
    const handleFilterChange = (dataset: keyof FilterState, filterName: string, value: string) => {
        const newFilters = {
            ...filters,
            [dataset]: {
                ...filters[dataset],
                [filterName]: value
            }
        };
        onFiltersChange(newFilters);
    };

    return (
        <div className="menu-section">
            <h3>Filters</h3>
            <div className="chart-filters">
                {selectedDatasets.population && (
                    <div className="filters-per-dataset">
                        <h4>Population</h4>
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
                                placeholder="Year"
                                value={filters.populations.year || ''}
                                onChange={(e) => handleFilterChange('populations', 'year', e.target.value)}
                            />
                        </div>
                        <div className="filter-row">
                            <input
                                type="text"
                                placeholder="City"
                                value={filters.populations.city || ''}
                                onChange={(e) => handleFilterChange('populations', 'city', e.target.value)}
                            />
                        </div>
                        <div className="filter-row">
                            <input
                                type="number"
                                placeholder="From Year"
                                value={filters.populations.yearRange || ''}
                                onChange={(e) => handleFilterChange('populations', 'yearRange', e.target.value)}
                            />
                        </div>
                        <div className="filter-row">
                            <input
                                type="number"
                                placeholder="To Year"
                                value={filters.populations.yearRange_2 || ''}
                                onChange={(e) => handleFilterChange('populations', 'yearRange_2', e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {selectedDatasets.interestRates && (
                    <div className="filters-per-dataset">
                        <h4>Interest Rates</h4>
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
                                placeholder="From Year"
                                value={filters.interestrates.yearRange || ''}
                                onChange={(e) => handleFilterChange('interestrates', 'yearRange', e.target.value)}
                            />
                        </div>
                        <div className="filter-row">
                            <input
                                type="number"
                                placeholder="To Year"
                                value={filters.interestrates.yearRange_2 || ''}
                                onChange={(e) => handleFilterChange('interestrates', 'yearRange_2', e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {selectedDatasets.meterData && (
                    <div className="filters-per-dataset">
                        <h4>Meter Data</h4>
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
                                <option value="">Market Type</option>
                                <option value="primary">Primary Market</option>
                                <option value="secondary">Secondary Market</option>
                            </select>
                        </div>
                        <div className="filter-row">
                            <select
                                value={filters.meterdata.sales || ''}
                                onChange={(e) => handleFilterChange('meterdata', 'sales', e.target.value)}
                            >
                                <option value="">Sales Type</option>
                                <option value="realistic">Realistic</option>
                                <option value="unrealistic">Unrealistic</option>
                            </select>
                        </div>
                        <div className="filter-row">
                            <input
                                type="text"
                                placeholder="City"
                                value={filters.meterdata.city || ''}
                                onChange={(e) => handleFilterChange('meterdata', 'city', e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChartFilters;
