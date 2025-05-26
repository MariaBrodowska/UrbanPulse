import "./Datasets.css"
import GetFilters from "./Filters"
import axios from "axios"
import React from "react"

function RenderHeader(props: { nazwa: string }) {
    return (<th>{props.nazwa}</th>)
}
function getTableHeaders(sample: Object) {
    const keys: string[] = Object.keys(sample)
    return keys.map((key) => {
        return <RenderHeader nazwa={key} key={"h" + key}/>
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
function RenderRow(props: { sample: Object, upperindex: number}) {
    return <tr>{getTableRow(props.sample, props.upperindex)}</tr>
}
function RenderTable(props: { objects: Object[] }) {
    if(props.objects === undefined || props.objects.length === 0) {
        // Return null or a placeholder instead of invalid <tr><p>
        return <tbody><tr><td><p>Loading data or no data available...</p></td></tr></tbody>;
    }
    return <table>
        <thead><tr>{getTableHeaders(props.objects[0])}</tr></thead>
        <tbody>{props.objects.map((obj, index) => {
            return <RenderRow sample={obj} upperindex={index} key={"r" + index}/>
        })}</tbody>
    </table>
}

function DisplayDatasetsPage() {
    const [isLoading, setLoading] = React.useState(true);
    const s: Object[] = []
    const [data, setData] = React.useState<Object[]>(s); // Explicitly type useState

    const handleData = (url: string) => {
        setLoading(true)
        axios.get(url, {})
        .then((response) => {
            if(Array.isArray(response.data)) {
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
    },[]); // Empty dependency array means this runs once on mount

    const [filters] = React.useState([ // filters probably don't need to be state if they don't change
        "No Filters",
        "ID",
        "By Year",
        "By City",
    ]);

    const [value, setValue] = React.useState(""); // Initialize with empty or a sensible default
    // const [value2, setValue2] = React.useState(""); // value2 is unused, remove if not needed

    // Define callbacks directly in the component body
    // They will be re-created on each render, capturing the current 'value'
    const currentCallbacks = [
        () => {
            // console.log(value); // This will now log the current 'value'
            return <div>
                <p>No Filter</p>
                <form id="filterform0" onSubmit={(event) => {event.preventDefault(); handleData("http://localhost:5000/api/population/")}}>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        },
        () => {
            return <div>
                <p>Filter By ID</p>
                <form id="filterform1" onSubmit={(event) => {event.preventDefault(); handleData("http://localhost:5000/api/population/" + value)}}>
                    <input type="text" id="filterID" value={value} onChange={(event) => { setValue(event.target.value) }} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        },
        () => {
            return <div>
                <p>Filter By Year</p>
                <form id="filterform2" onSubmit={(event) => {event.preventDefault(); handleData("http://localhost:5000/api/population/by-year/" + value)}}>
                    <input type="number" id="filterYear" value={value} onChange={(event) => {setValue(event.target.value)}} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        },
        () => {
            // Typo: was by-year, should be by-city if the label is "Filter By City"
            // Also, the API endpoint might differ for city. Assuming it's /by-city/ for this example
            return <div>
                <p>Filter By City</p>
                <form id="filterform3" onSubmit={(event) => {event.preventDefault(); handleData("http://localhost:5000/api/population/by-city/" + value)}}>
                    <input type="text" id="filterCity" value={value} onChange={(event) => {setValue(event.target.value)}} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        }
    ];

    if(isLoading) {
        return <div><p>Loading..</p></div>
    } else {
        return (
        <div id="datasetsdiv">
            <div id="datasetmenu">
                {/* Pass the dynamically created callbacks */}
                <GetFilters filterlist={filters} callbacks={currentCallbacks} />
            </div>
            <div id="datasetdisplay">
                <RenderTable objects={data} />
            </div>
        </div>
        )
    }
}
export default DisplayDatasetsPage;