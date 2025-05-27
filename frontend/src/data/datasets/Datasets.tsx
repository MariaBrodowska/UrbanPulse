import { Link } from "react-router-dom"
import "./Datasets.css"
import GetFilters from "./Filters"
import axios from "axios"
import React, { type ReactNode } from "react"

function RenderHeader(props: { nazwa: string }) {
    return (<th>{props.nazwa}</th>)
}
function getTableHeaders(sample: Object) {
    const keys: string[] = Object.keys(sample)
    return keys.map((key) => {
        return <RenderHeader nazwa={key} key={"h" + key} />
    })
}
function RenderCell(props: { nazwa: string }) {
    return (<td>{props.nazwa}</td>)
}
function getTableRow(sample: Object, upperindex: number) {
    // It's generally better to use Object.values if you just need values
    // If the order of values matters and corresponds to keys,
    // you might need to iterate over keys and then access sample[key]
    const values: any[] = Object.values(sample); // Assuming order is fine
    return values.map((val, index) => {
        // Ensure val is a string or number before rendering
        const cellValue = (typeof val === 'object' || val === null) ? JSON.stringify(val) : String(val);
        return <RenderCell nazwa={cellValue} key={"" + upperindex + "" + index} />
    })
}
function RenderRow(props: { sample: Object, upperindex: number }) {
    return <tr>{getTableRow(props.sample, props.upperindex)}</tr>
}
function RenderTable(props: { objects: Object[] }) {
    if (props.objects === undefined || props.objects.length === 0) {
        // Return null or a placeholder instead of invalid <tr><p>
        return <table><tbody><tr><td><p>Loading data or no data available...</p></td></tr></tbody></table>;
    }
    return <table>
        <thead><tr>{getTableHeaders(props.objects[0])}</tr></thead>
        <tbody>{props.objects.map((obj, index) => {
            return <RenderRow sample={obj} upperindex={index} key={"r" + index} />
        })}</tbody>
    </table>
}
function DisplayDatasetsPage() {
    const [isLoading, setLoading] = React.useState(true);
    const s: Object[] = []
    const [data, setData] = React.useState<Object[]>(s); // Explicitly type useState
    const handleData = (url: string) => {
        setLoading(true)
        axios.get(url, {withCredentials:true})
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setData(response.data)
                } else {
                    // Ensure data is always an array, even for single objects
                    setData(response.data ? [response.data] : [])
                }
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false) // Also set loading to false on error
                setData([]) // Clear data or set an error state
            })
    }

    React.useEffect(() => {
        // Initial data fetch
        handleData("http://localhost:5000/api/population/");
    }, []); // Empty dependency array means this runs once on mount

    let filters = new Map<string, string[]>();
    filters.set("populations",
        ["No Filters",
            "ID",
            "By Year",
            "By City",
        ]);
    filters.set("interestrates",
        ["No Filters",
            "ID",
            "By Year",
            "By Year Range",
        ]);
    filters.set("meterdata",
        ["No Filters",
            "ID",
            "By Market",
            "By Sales",
            "By City"
        ]
    )
    const [value, setValue] = React.useState("");
    const [value2, setValue2] = React.useState("");

    let callbackList = new Map<string, (() => ReactNode)[]>();
    callbackList.set("populations", [
        () => {
            return <div>
                <p>No Filter</p>
                <form id="filterform0" onSubmit={(event) => { event.preventDefault(); handleData("http://localhost:5000/api/population/") }}>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        },
        () => {
            return <div>
                <p>Filter By ID</p>
                <form id="filterform1" onSubmit={(event) => { event.preventDefault(); handleData("http://localhost:5000/api/population/" + value) }}>
                    <input type="text" id="filterID" value={value} onChange={(event) => { setValue(event.target.value) }} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        },
        () => {
            return <div>
                <p>Filter By Year</p>
                <form id="filterform2" onSubmit={(event) => { event.preventDefault(); handleData("http://localhost:5000/api/population/by-year/" + value) }}>
                    <input type="number" id="filterYear" value={value} onChange={(event) => { setValue(event.target.value) }} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        },
        () => {
            return <div>
                <p>Filter By City</p>
                <form id="filterform3" onSubmit={(event) => { event.preventDefault(); handleData("http://localhost:5000/api/population/by-city/" + value) }}>
                    <input type="text" id="filterCity" value={value} onChange={(event) => { setValue(event.target.value) }} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        }
    ])
    callbackList.set("interestrates", [
        () => {
            return <div>
                <p>No Filter</p>
                <form id="filterform0" onSubmit={(event) => { event.preventDefault(); handleData("http://localhost:5000/api/interest-rates/") }}>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        },
        () => {
            return <div>
                <p>Filter By ID</p>
                <form id="filterform1" onSubmit={(event) => { event.preventDefault(); handleData("http://localhost:5000/api/interest-rates/" + value) }}>
                    <input type="text" id="filterID" value={value} onChange={(event) => { setValue(event.target.value) }} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        },
        () => {
            return <div>
                <p>Filter By Year</p>
                <form id="filterform2" onSubmit={(event) => { event.preventDefault(); handleData("http://localhost:5000/api/interest-rates/by-year/" + value) }}>
                    <input type="number" id="filterYear" value={value} onChange={(event) => { setValue(event.target.value) }} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        },
        () => {
            return <div>
                <p>Filter By Year Range</p>
                <form id="filterform3" onSubmit={(event) => { event.preventDefault(); handleData("http://localhost:5000/api/interest-rates/by-years/" + value + "/" + value2) }}>
                    <input type="text" id="filterYear1" value={value} onChange={(event) => { setValue(event.target.value) }} />
                    <input type="text" id="filterYear2" value={value2} onChange={(event) => { setValue2(event.target.value) }} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        }
    ])
    callbackList.set("meterdata", [
        () => {
            return <div>
                <p>No Filter</p>
                <form id="filterform0" onSubmit={(event) => { event.preventDefault(); handleData("http://localhost:5000/api/flat-prices/") }}>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        },
        () => {
            return <div>
                <p>Filter By ID</p>
                <form id="filterform1" onSubmit={(event) => { event.preventDefault(); handleData("http://localhost:5000/api/flat-prices/" + value) }}>
                    <input type="text" id="filterID" value={value} onChange={(event) => { setValue(event.target.value) }} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        },
        () => {
            return <div>
                <p>Filter By Market</p>
                <form id="filterform2" onSubmit={(event) => { event.preventDefault(); handleData("http://localhost:5000/api/flat-prices/by-market/" + value) }}>
                    <div>
                        <input type="checkbox" id="filterMarket" checked={value == "true" ? true : false} onChange={(event) => { setValue(value ? "false" : "true") }} />
                        <label htmlFor="filterMarket">Is market secondary?</label>
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        },
        () => {
            return <div>
                <p>Filter By Sales</p>
                <form id="filterform3" onSubmit={(event) => { event.preventDefault(); handleData("http://localhost:5000/api/flat-prices/by-sales/" + value) }}>
                    <div>
                        <input type="checkbox" id="filterSales" checked={value == "true" ? true : false} onChange={(event) => { setValue(value ? "false" : "true") }} />
                        <label htmlFor="filterSales">Are prices realistic?</label>
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        },
        () => {
            return <div>
                <p>Filter By City</p>
                <form id="filterform2" onSubmit={(event) => { event.preventDefault(); handleData("http://localhost:5000/api/flat-prices/by-city/" + value) }}>
                    <input type="text" id="filterCity" value={value} onChange={(event) => { setValue(event.target.value) }} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        },
    ])
    
    const [currentDataset, setCurrentDataset] = React.useState("populations");
    const [fileName, setFileName] = React.useState("data");
    const handleExport = (url: string): string => {
        return url + "?tableName=" + currentDataset + "&fileName=" + fileName;
    }
    if (isLoading) {
        return <div><p>Loading..</p></div>
    } else {
        return (
            <div id="datasetsdiv">
                <div id="datasetmenu">
                    <div id="datasetmenutitle">
                        <h1>Datasets</h1>
                    </div>
                    <div>
                        <h3>Current dataset</h3>
                        <select value={currentDataset} id="datasetselect" onChange={(event) => { setCurrentDataset(event.target.value) }}>
                            <option value="populations">Population</option>
                            <option value="interestrates">Interest Rates</option>
                            <option value="meterdata">Flat Prices</option>
                        </select>
                    </div>
                    <GetFilters filterlist={filters.get(currentDataset)} callbacks={callbackList.get(currentDataset)} />
                    <div id="exports">
                        <h3>Export</h3>
                        <input type="text" value={fileName} onChange={(event) => {setFileName(event.target.value)}} placeholder="filename"></input>
                        <Link to={handleExport("http://localhost:5000/api/export/singleTableFile")} className="exportlink">Export to XML</Link>
                        <Link to={handleExport("http://localhost:5000/api/exportjson/singleTableFile")} className="exportlink">Export to JSON</Link>
                    </div>
                </div>
                <div id="datasetdisplay">
                    <RenderTable objects={data} />
                </div>
            </div>
        )
    }
}
export default DisplayDatasetsPage;