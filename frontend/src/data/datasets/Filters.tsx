import { useState } from "react";

interface GetFiltersProps {
    currentDataset: string;
    onApplyFilters: (url: string) => void;
}

function GetFilters({ currentDataset, onApplyFilters }: GetFiltersProps) {
    const [inputValues, setInputValues] = useState<{[key: string]: string}>({});

    const getAvailableFilters = (dataset: string) => {
        switch (dataset) {
            case "populations":
                return [
                    { type: "id", label: "Filtruj po ID", inputType: "text", placeholder: "Wpisz ID" },
                    { type: "year", label: "Filtruj po roku", inputType: "number", placeholder: "np. 2023" },
                    { type: "city", label: "Filtruj po mieście", inputType: "text", placeholder: "Nazwa miasta" }
                ];
            case "interestrates":
                return [
                    { type: "id", label: "Filtruj po ID", inputType: "text", placeholder: "Wpisz ID" },
                    { type: "yearRange", label: "Filtruj po zakresie lat", inputType: "range", placeholder: "Od roku" }
                ];
            case "meterdata":
                return [
                    { type: "id", label: "Filtruj po ID", inputType: "text", placeholder: "Wpisz ID" },
                    { type: "market", label: "Rynek wtórny", inputType: "toggle" },
                    { type: "sales", label: "Ceny realistyczne", inputType: "toggle" },
                    { type: "city", label: "Filtruj po mieście", inputType: "text", placeholder: "Nazwa miasta" }
                ];
            default:
                return [];
        }
    };

    const availableFilters = getAvailableFilters(currentDataset);

    const handleInputChange = (filterType: string, value: string, isSecondValue = false) => {
        const key = isSecondValue ? `${filterType}_2` : filterType;
        setInputValues(prev => ({ ...prev, [key]: value }));
    };

    const buildCombinedFilterUrl = () => {
        const baseUrls = {
            populations: "http://localhost:5000/api/population/combined",
            interestrates: "http://localhost:5000/api/interest-rates/combined", 
            meterdata: "http://localhost:5000/api/flat-prices/combined"
        };

        const baseUrl = baseUrls[currentDataset as keyof typeof baseUrls];
        const params = new URLSearchParams();

        Object.entries(inputValues).forEach(([key, value]) => {
            if (value && value.trim() !== "" && value !== "false") {
                if (value === "true") {
                    params.append(key, "true");
                } else {
                    params.append(key, value.trim());
                }
            }
        });

        return params.toString() ? `${baseUrl}?${params.toString()}` : `${baseUrl.replace('/combined', '/')}/`;
    };

    const handleApplyAllFilters = () => {
        const activeFilters = Object.entries(inputValues).filter(([, value]) => 
            value && value.trim() !== "" && value !== "false"
        );
        
        if (activeFilters.length === 0) {
            handleClearFilters();
            return;
        }

        const url = buildCombinedFilterUrl();
        console.log(url);
        onApplyFilters(url);
    };

    const handleClearFilters = () => {
        setInputValues({});
        onApplyFilters(`http://localhost:5000/api/${currentDataset === "populations" ? "population" : currentDataset === "interestrates" ? "interest-rates" : "flat-prices"}/`);
    };

    const renderFilterInput = (filter: any) => {
        switch (filter.inputType) {
            case "checkbox":
                return (
                    <div className="filter-item">
                        <div className="filter-header">
                            <span className="filter-label">{filter.label}</span>
                        </div>
                        <div className="filter-content">
                            <div className="checkbox-container">
                                <input 
                                    type="checkbox" 
                                    checked={inputValues[filter.type] === "true"}
                                    onChange={(e) => {
                                        const newValue = e.target.checked ? "true" : "false";
                                        handleInputChange(filter.type, newValue);
                                    }}
                                />
                                <span>{filter.label}</span>
                            </div>
                        </div>
                    </div>
                );
            case "toggle":
                return (
                    <div className="filter-item">
                        <div className="filter-header">
                            <span className="filter-label">{filter.label}</span>
                        </div>
                        <div className="filter-content">
                            <div className="toggle-container">
                                <label className="toggle-switch">
                                    <input 
                                        type="checkbox" 
                                        checked={inputValues[filter.type] === "true"}
                                        onChange={(e) => {
                                            const newValue = e.target.checked ? "true" : "false";
                                            handleInputChange(filter.type, newValue);
                                        }}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                                <span className="toggle-label">
                                    {inputValues[filter.type] === "true" ? "Tak" : "Nie"}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            case "range":
                return (
                    <div className="filter-item">
                        <div className="filter-header">
                            <span className="filter-label">{filter.label}</span>
                        </div>
                        <div className="filter-content">
                            <div className="range-inputs">
                                <input
                                    type="number"
                                    placeholder="Od roku"
                                    value={inputValues[filter.type] || ""}
                                    onChange={(e) => handleInputChange(filter.type, e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleApplyAllFilters();
                                        }
                                    }}
                                />
                                <input
                                    type="number"
                                    placeholder="Do roku"
                                    value={inputValues[`${filter.type}_2`] || ""}
                                    onChange={(e) => handleInputChange(filter.type, e.target.value, true)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleApplyAllFilters();
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="filter-item">
                        <div className="filter-header">
                            <span className="filter-label">{filter.label}</span>
                        </div>
                        <div className="filter-content">
                            <div className="filter-input">
                                <input
                                    type={filter.inputType}
                                    placeholder={filter.placeholder}
                                    value={inputValues[filter.type] || ""}
                                    onChange={(e) => handleInputChange(filter.type, e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleApplyAllFilters();
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="filters-container">
            <h3>Dostępne filtry</h3>
            <div className="filters-grid">
                {availableFilters.map((filter) => (
                    <div key={filter.type}>
                        {renderFilterInput(filter)}
                    </div>
                ))}
            </div>
            <div className="filter-actions">
                <button className="apply-filters-btn" onClick={handleApplyAllFilters}>
                    Zastosuj filtry
                </button>
                <button className="clear-filters-btn" onClick={handleClearFilters}>
                    Wyczyść wszystkie filtry
                </button>
            </div>
        </div>
    );
}

export default GetFilters;