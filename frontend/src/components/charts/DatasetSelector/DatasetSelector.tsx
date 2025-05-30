
import type { SelectedDatasets } from '../types';
import './DatasetSelector.css';

interface DatasetSelectorProps {
    selectedDatasets: SelectedDatasets;
    onDatasetChange: (selectedDatasets: SelectedDatasets) => void;
}

function DatasetSelector({
    selectedDatasets,
    onDatasetChange
}: DatasetSelectorProps) {
    const datasets = [
        { id: 'population', label: 'Population Data', key: 'population' as keyof SelectedDatasets },
        { id: 'interestRates', label: 'Interest Rates', key: 'interestRates' as keyof SelectedDatasets },
        { id: 'meterData', label: 'Meter Data', key: 'meterData' as keyof SelectedDatasets }
    ];

    const handleDatasetChange = (datasetKey: keyof SelectedDatasets) => {
        const newSelectedDatasets = {
            ...selectedDatasets,
            [datasetKey]: !selectedDatasets[datasetKey]
        };
        onDatasetChange(newSelectedDatasets);
    };

    return (
        <div className="menu-section">
            <h3>Select Data Sources</h3>
            <div className="dataset-selection">
                <div className="dataset-checkboxes">
                    {datasets.map(dataset => (
                        <div key={dataset.id} className="dataset-checkbox">
                            <input
                                type="checkbox"
                                id={dataset.id}
                                checked={selectedDatasets[dataset.key]}
                                onChange={() => handleDatasetChange(dataset.key)}
                            />
                            <label htmlFor={dataset.id}>{dataset.label}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DatasetSelector;
