import { Link } from "react-router-dom"
import "./Datasets.css"
import GetFilters from "./Filters"
import axios from "axios"
import React, { use, useState } from "react"
import Pagination from "../../components/Pagination"
import { RenderTable } from "./renderTableFunctions"
import Navbar from "../../components/Navbar"
import EditMenu from "../../components/EditMenu"


function DisplayDatasetsPage() {
    const [isLoading, setLoading] = React.useState(true);
    const s: Object[] = []
    const [data, setData] = React.useState<Object[]>(s);
    const [allData, setAllData] = React.useState<Object[]>([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 23;
    const [currentDataset, setCurrentDataset] = React.useState("populations");
    const [fileName, setFileName] = React.useState("data");
    const [userEmail, setUserEmail] = React.useState<string | undefined>(undefined);
    const [showEditMenu, setShowEditMenu] = useState(false);
    const [dataToEdit,setDataToEdit] = useState<Object>({})
    const [isCreating, setIsCreating] = useState(false);
    React.useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/me', {
                    withCredentials: true
                });
                setUserEmail(response.data.email);
            } catch (error) {
                console.error('Błąd podczas pobierania danych użytkownika:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleData = (url: string) => {
        setLoading(true)
        setCurrentPage(1)
        axios.get(url, {withCredentials:true})
            .then((response) => {
                let responseData: Object[] = [];
                if (Array.isArray(response.data)) {
                    responseData = response.data;
                } else {
                    responseData = response.data ? [response.data] : [];
                }
                setAllData(responseData);
                const startIndex = 0;
                const endIndex = itemsPerPage;
                setData(responseData.slice(startIndex, endIndex));
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
                setAllData([]);
                setData([])
            })
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setData(allData.slice(startIndex, endIndex));
    };

    const totalPages = Math.ceil(allData.length / itemsPerPage);

    const handleDatasetChange = (newDataset: string) => {
        setCurrentDataset(newDataset);
        const defaultUrls = {
            populations: "http://localhost:5000/api/population/",
            interestrates: "http://localhost:5000/api/interest-rates/",
            meterdata: "http://localhost:5000/api/flat-prices/"
        };
        handleData(defaultUrls[newDataset as keyof typeof defaultUrls]);
    };

    const handleExport = (url: string): string => {
        return url + "?tableName=" + currentDataset + "&fileName=" + fileName;
    }

    React.useEffect(() => {
        handleData("http://localhost:5000/api/population/");
    }, []);
    const createData = () => {
        setShowEditMenu(true);
        setIsCreating(true)
    }
    const editData = (data: Object) => {
        setShowEditMenu(true);
        setDataToEdit(data);
    };

    const closeEditMenu = () => {
        setShowEditMenu(false);
        setDataToEdit({});
        setIsCreating(false)
    };
                        
    
    if (isLoading) {
        return <div><p>Loading..</p></div>
    } else {
        return (
            <>
            <Navbar userEmail={userEmail} />
            <div id="datasetsdiv">
                <div id="datasetmenutitle">
                    <h1>Datasets</h1>
                </div>
                <div id="datasets-main-content">
                    <div id="datasetmenu">
                        <div className="menu-section">
                            <div className="dataset-selector">
                                <h3 id="dataset-text">Wybierz dataset</h3>
                                <select 
                                    value={currentDataset} 
                                    id="datasetselect" 
                                    onChange={(event) => handleDatasetChange(event.target.value)}
                                >
                                    <option value="populations">Population</option>
                                    <option value="interestrates">Interest Rates</option>
                                    <option value="meterdata">Flat Prices</option>
                                </select>
                            </div>
                            
                            <GetFilters 
                                currentDataset={currentDataset}
                                onApplyFilters={handleData}
                            />
                            
                            <div id="exports">
                                <h3>Export</h3>
                                <input 
                                    type="text" 
                                    value={fileName} 
                                    onChange={(event) => setFileName(event.target.value)} 
                                    placeholder="filename"
                                />
                                <Link to={handleExport("http://localhost:5000/api/export/file")} className="exportlink">
                                    Export to XML
                                </Link>
                                <Link to={handleExport("http://localhost:5000/api/exportjson/file")} className="exportlink">
                                    Export to JSON
                                </Link>
                            </div>
                            
                            <div className="dataset-info">
                                <h3>Informacje o datasecie</h3>
                                <p>Aktualny dataset: <strong>{currentDataset}</strong></p>
                                <p>Liczba rekordów: <strong>{allData.length}</strong></p>
                                <p>Aktualna strona: <strong>{currentPage}</strong> z <strong>{totalPages}</strong></p>
                            </div>
                        </div>
                        <button className="apply-filters-btn" onClick={() => {editData(dataToEdit); setIsCreating(true)}}>
                            <h4>Dodaj nowy rekord</h4>
                        </button>
                    </div>
                    <div id="datasetdisplay">
                        <RenderTable objects={data} onClick={(data) =>{
                            setShowEditMenu(true);
                            editData(data)
                        }} />
                        <Pagination 
                            currentPage={currentPage} 
                            totalPages={totalPages} 
                            onPageChange={handlePageChange} 
                        />
                    </div>
                </div>
            </div>
           {showEditMenu && (
            <EditMenu 
                data={dataToEdit} 
                datasetType={currentDataset} 
                onClose={closeEditMenu}
                isCreating={isCreating}
            />
           )}
            </>
        )
    }
}
export default DisplayDatasetsPage;