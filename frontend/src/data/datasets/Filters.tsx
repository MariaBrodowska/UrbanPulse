import { type ReactNode, useState, useEffect } from "react"; // Added useEffect

function RenderOption(props: { value: string }) {
    return <option value={props.value}>{props.value}</option>;
}

function RenderOptions(props: { options: string[] }) {
    return props.options.map((obj) => {
        return <RenderOption value={obj} key={"opt" + obj} />;
    });
}

// Props definition for GetFilters
interface GetFiltersProps {
    filterlist: string[];
    callbacks: (() => ReactNode)[]; // Array of functions that return ReactNode
    // Optional: callback to notify parent when filter type changes,
    // if parent needs to reset its 'value' state.
    // onFilterTypeChange?: () => void;
}

function GetFilters(props: GetFiltersProps) {
    const { filterlist, callbacks /*, onFilterTypeChange */ } = props;

    // Guard clause for loading/empty state
    if (filterlist === undefined || filterlist.length === 0 || callbacks.length === 0 || filterlist.length !== callbacks.length) {
        // Added check for callbacks length and consistency
        return <div><p>Loading filters or filter data is inconsistent...</p></div>;
    }

    // State to store the *label* (or name) of the currently selected filter.
    const [selectedFilterLabel, setSelectedFilterLabel] = useState<string>(filterlist[0]);

    // Effect to ensure selectedFilterLabel is valid if filterlist changes
    useEffect(() => {
        if (!filterlist.includes(selectedFilterLabel) && filterlist.length > 0) {
            setSelectedFilterLabel(filterlist[0]);
        } else if (filterlist.length === 0) {
            setSelectedFilterLabel(""); // Handle empty filter list
        }
    }, [filterlist, selectedFilterLabel]);


    const handleFilterSelectionChange = (newLabel: string) => {
        setSelectedFilterLabel(newLabel);
        // If you had onFilterTypeChange prop:
        // if (onFilterTypeChange) {
        //   onFilterTypeChange(); // Notify parent to potentially reset its shared 'value' state
        // }
    };

    // Component for the select dropdown
    const FilterSelectorDropdown = () => {
        return (
            <select value={selectedFilterLabel} onChange={(event) => { handleFilterSelectionChange(event.target.value); }}>
                <RenderOptions options={filterlist} />
            </select>
        );
    };

    // --- THE KEY CHANGE IS HERE ---
    // On every render, determine the active callback based on the current selectedFilterLabel
    // and the (potentially updated) props.callbacks.

    const currentIndex = filterlist.indexOf(selectedFilterLabel);
    let ActiveFilterFormRenderer: (() => ReactNode) | null = null;

    if (currentIndex !== -1 && callbacks[currentIndex]) {
        ActiveFilterFormRenderer = callbacks[currentIndex];
    } else if (callbacks.length > 0) {
        // Fallback to the first callback if the current selection is somehow invalid
        // (though the useEffect above should prevent this for valid filterlist)
        ActiveFilterFormRenderer = callbacks[0];
        // Optionally, you could also reset selectedFilterLabel here if currentIndex was -1
        // This depends on desired behavior if props become inconsistent.
        // if (currentIndex === -1 && filterlist.length > 0) {
        //    setSelectedFilterLabel(filterlist[0]); // This would trigger another re-render
        // }
    }

    return (
        <div className="filter">
            <div className="pickfilter">
                <FilterSelectorDropdown />
            </div>
            <div className="filterdata">
                {/*
                    Execute the ActiveFilterFormRenderer function.
                    This function, taken fresh from props.callbacks on each render,
                    will have the correct closure over the parent's 'value' state.
                */}
                {ActiveFilterFormRenderer ? ActiveFilterFormRenderer() : <p>Please select a filter.</p>}
            </div>
        </div>
    );
}

export default GetFilters;