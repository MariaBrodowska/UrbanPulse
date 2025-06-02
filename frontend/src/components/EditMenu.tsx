
import { useState, useEffect } from 'react';
import './EditMenu.css';
import axios from "axios";
interface EditMenuProps {
    data: Object;
    datasetType: string;
    onClose?: () => void;
    isCreating : boolean;
    onSucess? :()=>void;
}
interface ValidationErrors {
    [key:string] : string;
}

const EditMenu = ({ data, datasetType, onClose,isCreating = false,onSucess }: EditMenuProps) => {
    const [formData, setFormData] = useState(data);
    const [url,setUrl] = useState("");
    const baseUrl = "http://localhost:5000/api";
    const [errors, setErrors] = useState<ValidationErrors>({});

    useEffect(() => {
        if (isCreating) {
            switch (datasetType) {
                case "populations": 
                    setUrl(baseUrl + "/population");
                    break;
                case "interestrates": 
                    setUrl(baseUrl + "/interest-rates");
                    break;
                case "meterdata": 
                    setUrl(baseUrl + "/flat-prices");
                    break;
                default: 
                    setUrl("");
                    break;
            }
        } else {
            const dataWithId = data as any;
            switch (datasetType) {
                case "populations": 
                    setUrl(baseUrl + `/population/${dataWithId.id}`);
                    break;
                case "interestrates": 
                    setUrl(baseUrl + `/interest-rates/${dataWithId.id}`);
                    break;
                case "meterdata": 
                    setUrl(baseUrl + `/flat-prices/${dataWithId.id}`);
                    break;
                default: 
                    setUrl("");
                    break;
            }
        }
    }, [datasetType, isCreating, data, baseUrl]);
    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        clearFieldError(field);
    };

    const handleEdit = async () => {
        console.log('Zapisywanie danych:', formData);
          if (!validateForm()) {
        return;
    }

        try{
          const resp =  await axios.put(url,formData,{withCredentials:true});
          onSucess?.();
          onClose?.();
        }
       catch(error){
        console.log(error);
       }
    };
    const handleSave = async () => {
          if (!validateForm()) {
        return;
    }

        try{
            const resp = await axios.post(url,formData, {withCredentials:true});
            onSucess?.();
            onClose?.();  
        }
        catch(error){

            console.log(error);
        }
    }
    const getDatasetTitle = () => {
        if (isCreating) {
            switch (datasetType) {
                case "populations": 
                    return "Add Population Data";
                case "interestrates": 
                    return "Add Interest Rates";
                case "meterdata": 
                    return "Add Housing Data";
                default: 
                    return "Add Data";
            }
        } else {
            switch (datasetType) {
                case "populations": 
                    return "Edit Population Data";
                case "interestrates": 
                    return "Edit Interest Rates";
                case "meterdata": 
                    return "Edit Housing Data";
                default: 
                    return "Edit Data";
            }
        }
    };
    const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    const data = formData as any;

    switch (datasetType) {
        case "populations":

            if (!data.year) {
                newErrors.year = "Year is required";
            } else if (data.year < 1900 || data.year > new Date().getFullYear() + 10) {
                newErrors.year = "Year must be between 1900 and " + (new Date().getFullYear() + 10);
            }

            if (!data.number) {
                newErrors.number = "Population number is required";
            } else if (data.number < 0) {
                newErrors.number = "Population number cannot be negative";
            } else if (data.number > 50000000) {
                newErrors.number = "Population number seems too large";
            }

            // Walidacja nazwy miasta
            if (!data.cityName || data.cityName.trim() === '') {
                newErrors.cityName = "City name is required";
            } else if (data.cityName.length < 2) {
                newErrors.cityName = "City name must have at least 2 characters";
            } else if (data.cityName.length > 100) {
                newErrors.cityName = "City name cannot exceed 100 characters";
            }
            break;

        case "interestrates":
            // Walidacja daty
            if (!data.date) {
                newErrors.date = "Date is required";
            } else {
                const selectedDate = new Date(data.date);
                const currentDate = new Date();
                const minDate = new Date('1990-01-01');
                
                if (selectedDate > currentDate) {
                    newErrors.date = "Date cannot be in the future";
                } else if (selectedDate < minDate) {
                    newErrors.date = "Date cannot be earlier than 1990";
                }
            }

            // Walidacja stopy procentowej
            if (data.rate === undefined || data.rate === null || data.rate === '') {
                newErrors.rate = "Interest rate is required";
            } else if (data.rate < 0) {
                newErrors.rate = "Interest rate cannot be negative";
            } else if (data.rate > 100) {
                newErrors.rate = "Interest rate cannot exceed 100%";
            }

            // Walidacja typu stopy procentowej
            if (!data.typeOfInterestRateName) {
                newErrors.typeOfInterestRateName = "Interest rate type is required";
            }
            break;

        case "meterdata":
            // Walidacja roku
            if (!data.year) {
                newErrors.year = "Year is required";
            } else if (data.year < 1990 || data.year > new Date().getFullYear() + 5) {
                newErrors.year = "Year must be between 1990 and " + (new Date().getFullYear() + 5);
            }

            // Walidacja ceny
            if (data.number === undefined || data.number === null || data.number === '') {
                newErrors.number = "Price is required";
            } else if (data.number <= 0) {
                newErrors.number = "Price must be greater than 0";
            } else if (data.number > 100000) {
                newErrors.number = "Price seems too high (max 100,000 PLN/m²)";
            }

            // Walidacja kwartału
            if (!data.quarter) {
                newErrors.quarter = "Quarter is required";
            } else if (data.quarter < 1 || data.quarter > 4) {
                newErrors.quarter = "Quarter must be between 1 and 4";
            }

            // Walidacja nazwy miasta
            if (!data.cityName || data.cityName.trim() === '') {
                newErrors.cityName = "City name is required";
            } else if (data.cityName.length < 2) {
                newErrors.cityName = "City name must have at least 2 characters";
            }
            break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

const clearFieldError = (field: string) => {
    if (errors[field]) {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
    }
};
    const renderForm = () => {
        switch (datasetType) {
            case "populations":
                return (
                    <div className="edit-form">
                        <div className="form-group">
                            <label className="form-label">Year:</label>
                            <input 
                                type="number" 
                                className="form-input"
                                value={(formData as any).year || ''}
                                onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                                placeholder="Enter year"
                            />
                        {errors.year && <span className="error-message">{errors.year}</span>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Population:</label>
                            <input 
                                type="number" 
                                className="form-input"
                                value={(formData as any).number || ''}
                                onChange={(e) => handleInputChange('number', parseInt(e.target.value))}
                                placeholder="Enter population number"
                            />
                        {errors.number && <span className="error-message">{errors.number}</span>}

                        </div>
                        <div className="form-group">
                            <label className="form-label">City:</label>
                            <input 
                                type="text" 
                                className="form-input"
                                value={(formData as any).cityName || ''}
                                onChange={(e) => handleInputChange('cityName', e.target.value)}
                                placeholder="City name"
                            />
                        {errors.cityName && <span className="error-message">{errors.cityName}</span>}

                        </div>
                    </div>
                );

            case "interestrates":
                return (
                    <div className="edit-form">
                        <div className="form-group">
                            <label className="form-label">Date:</label>
                            <input 
                                type="date" 
                                className="form-input"
                                value={(formData as any).date ? new Date((formData as any).date).toISOString().split('T')[0] : ''}
                                onChange={(e) => handleInputChange('date', e.target.value ? new Date(e.target.value).toISOString() : '')}
                            />
                                                    {errors.date && <span className="error-message">{errors.date}</span>}

                        </div>
                        <div className="form-group">
                            <label className="form-label">Interest Rate (%):</label>
                            <input 
                                type="number" 
                                step="0.01"
                                className="form-input"
                                value={(formData as any).rate || ''}
                                onChange={(e) => handleInputChange('rate', parseFloat(e.target.value))}
                                placeholder="e.g. 5.25"
                            />
                            {errors.rate && <span className="error-message">{errors.rate}</span>}

                        </div>
                        <div className="form-group">
                            <label className="form-label">Interest Rate Type:</label>
                            <select 
                                className="form-select"
                                value={(formData as any).typeOfInterestRateName || 'ref'}
                                onChange={(e) => handleInputChange('typeOfInterestRateName', e.target.value)}
                            >
                                <option value="ref">REF</option>
                                <option value="lom">LOM</option>
                                <option value="red">RED</option>
                            </select>
                                {errors.typeOfInterestRateName && <span className="error-message">{errors.typeOfInterestRateName}</span>}

                        </div>
                    </div>
                );

            case "meterdata":
                return (
                    <div className="edit-form">
                        <div className="form-group">
                            <label className="form-label">Year:</label>
                            <input 
                                type="number" 
                                className="form-input"
                                value={(formData as any).year || ''}
                                onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                                placeholder="Enter year"
                            />
                                                    {errors.year && <span className="error-message">{errors.year}</span>}

                        </div>
                        <div className="form-group">
                            <label className="form-label">Price (PLN/m²):</label>
                            <input 
                                type="number" 
                                step="0.01"
                                className="form-input"
                                value={(formData as any).number || ''}
                                onChange={(e) => handleInputChange('number', parseFloat(e.target.value))}
                                placeholder="e.g. 8500.00"
                            />
                                             {errors.number && <span className="error-message">{errors.number}</span>}
       
                        </div>
                        <div className="form-group">
                            <label className="form-label">Quarter:</label>
                            <input 
                                type="number" 
                                min="1" 
                                max="4"
                                className="form-input"
                                value={(formData as any).quarter || ''}
                                onChange={(e) => handleInputChange('quarter', parseInt(e.target.value))}
                                placeholder="1-4"
                            />
                                                    {errors.quarter && <span className="error-message">{errors.quarter}</span>}

                        </div>
                        <div className="form-group">
                            <div className="checkbox-group">
                                <input 
                                    type="checkbox" 
                                    className="checkbox-input"
                                    id="secondaryMarket"
                                    checked={(formData as any).isSecondaryMarket || false}
                                    onChange={(e) => handleInputChange('isSecondaryMarket', e.target.checked)}
                                />
                                <label htmlFor="secondaryMarket" className="checkbox-label">
                                    Secondary Market
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="checkbox-group">
                                <input 
                                    type="checkbox" 
                                    className="checkbox-input"
                                    id="realistic"
                                    checked={(formData as any).isRealistic || false}
                                    onChange={(e) => handleInputChange('isRealistic', e.target.checked)}
                                />
                                <label htmlFor="realistic" className="checkbox-label">
                                    Realistic Data
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">City:</label>
                            <input 
                                type="text" 
                                className="form-input"
                                value={(formData as any).cityName || ''}
                                onChange={(e) => handleInputChange('cityName', e.target.value)}
                                placeholder="City name"
                            />
                                                    {errors.cityName && <span className="error-message">{errors.cityName}</span>}

                        </div>
                    </div>
                );

            default:
                return <div>Unknown data type</div>;
        }
    };

    return (
        <div className="edit-menu-overlay" onClick={onClose}>
            <div className="editMenu" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>×</button>
                
                <div className="edit-menu-header">
                    <h2 className="edit-menu-title">{getDatasetTitle()}</h2>
                </div>

                {renderForm()}

                <div className="action-buttons">
                    <button className="btn btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="btn btn-primary" onClick={isCreating ? handleSave : handleEdit}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditMenu;