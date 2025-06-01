
import { useState, useEffect } from 'react';
import './EditMenu.css';
import axios from "axios";
interface EditMenuProps {
    data: Object;
    datasetType: string;
    onClose?: () => void;
    isCreating : boolean;
}

const EditMenu = ({ data, datasetType, onClose,isCreating = false }: EditMenuProps) => {
    const [formData, setFormData] = useState(data);
    const [url,setUrl] = useState("");
    const baseUrl = "http://localhost:5000/api";

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
    };

    const handleEdit = async () => {
        console.log('Zapisywanie danych:', formData);
        try{
          const resp =  await axios.put(url,formData,{withCredentials:true});
          onClose?.();
        }
       catch(error){
        console.log(error);
       }
    };
    const handleSave = async () => {
        try{
            const resp = await axios.post(url,formData, {withCredentials:true});
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
                    return "Dodaj dane populacji";
                case "interestrates": 
                    return "Dodaj stopy procentowe";
                case "meterdata": 
                    return "Dodaj dane mieszkaniowe";
                default: 
                    return "Edytuj dane";
            }
        } else {
            switch (datasetType) {
                case "populations": 
                    return "Edytuj dane populacji";
                case "interestrates": 
                    return "Edytuj stopy procentowe";
                case "meterdata": 
                    return "Edytuj dane mieszkaniowe";
                default: 
                    return "Edytuj dane";
            }
        }
    };

    const renderForm = () => {
        switch (datasetType) {
            case "populations":
                return (
                    <div className="edit-form">
                        <div className="form-group">
                            <label className="form-label">Rok:</label>
                            <input 
                                type="number" 
                                className="form-input"
                                value={(formData as any).year || ''}
                                onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                                placeholder="Wprowadź rok"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Liczba mieszkańców:</label>
                            <input 
                                type="number" 
                                className="form-input"
                                value={(formData as any).number || ''}
                                onChange={(e) => handleInputChange('number', parseInt(e.target.value))}
                                placeholder="Wprowadź liczbę mieszkańców"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Miasto:</label>
                            <input 
                                type="text" 
                                className="form-input"
                                value={(formData as any).cityName || ''}
                                onChange={(e) => handleInputChange('cityName', e.target.value)}
                                placeholder="Nazwa miasta"
                            />
                        </div>
                    </div>
                );

            case "interestrates":
                return (
                    <div className="edit-form">
                        <div className="form-group">
                            <label className="form-label">Data:</label>
                            <input 
                                type="date" 
                                className="form-input"
                                value={(formData as any).date ? new Date((formData as any).date).toISOString().split('T')[0] : ''}
                                onChange={(e) => handleInputChange('date', e.target.value ? new Date(e.target.value).toISOString() : '')}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Stopa procentowa (%):</label>
                            <input 
                                type="number" 
                                step="0.01"
                                className="form-input"
                                value={(formData as any).rate || ''}
                                onChange={(e) => handleInputChange('rate', parseFloat(e.target.value))}
                                placeholder="np. 5.25"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Typ stopy procentowej:</label>
                            <select 
                                className="form-select"
                                value={(formData as any).typeOfInterestRateName || 'ref'}
                                onChange={(e) => handleInputChange('typeOfInterestRateName', e.target.value)}
                            >
                                <option value="ref">REF</option>
                                <option value="lom">LOM</option>
                                <option value="red">RED</option>
                            </select>
                        </div>
                    </div>
                );

            case "meterdata":
                return (
                    <div className="edit-form">
                        <div className="form-group">
                            <label className="form-label">Rok:</label>
                            <input 
                                type="number" 
                                className="form-input"
                                value={(formData as any).year || ''}
                                onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                                placeholder="Wprowadź rok"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Cena (PLN/m²):</label>
                            <input 
                                type="number" 
                                step="0.01"
                                className="form-input"
                                value={(formData as any).number || ''}
                                onChange={(e) => handleInputChange('number', parseFloat(e.target.value))}
                                placeholder="np. 8500.00"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Kwartał:</label>
                            <input 
                                type="number" 
                                min="1" 
                                max="4"
                                className="form-input"
                                value={(formData as any).quarter || ''}
                                onChange={(e) => handleInputChange('quarter', parseInt(e.target.value))}
                                placeholder="1-4"
                            />
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
                                    Rynek wtórny
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
                                    Realistyczne dane
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Miasto:</label>
                            <input 
                                type="text" 
                                className="form-input"
                                value={(formData as any).cityName || ''}
                                onChange={(e) => handleInputChange('cityName', e.target.value)}
                                placeholder="Nazwa miasta"
                            />
                        </div>
                    </div>
                );

            default:
                return <div>Nieznany typ danych</div>;
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
                        Anuluj
                    </button>
                    <button className="btn btn-primary" onClick={isCreating ? handleSave : handleEdit}>
                        Zapisz zmiany
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditMenu;