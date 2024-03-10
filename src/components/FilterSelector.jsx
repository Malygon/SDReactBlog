import { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import PropTypes from "prop-types";
import "../css/FilterSelector.css";

FilterSelector.propTypes = {
    setFilter: PropTypes.func.isRequired
}

export default function FilterSelector({ setFilter }) {
    const { data: filters, error, isPending } = useFetch("data/filters.json");
    const [filtersVisible, setFiltersvisible] = useState(false);
    const menu = useRef(null);

    useEffect(() => {
        function listener(e) {
            if (filtersVisible && menu.current && !menu.current.contains(e.target)) {
                setFiltersvisible(false);
            }
        }
        if (filtersVisible) {
            document.addEventListener("mousedown", listener);
        }
        else {
            document.removeEventListener("mousedown", listener);
        }
    })

    return <div className="filter-selector">
        <button className="show-filters" onClick={() => setFiltersvisible(true)}>Show Filters</button>
        {filtersVisible && <div ref={menu} className="filter-picker">
            {filters && filters.map((filter, index) => {
                let filterString = filter.filter;
                let style = {
                    filter: filterString
                }
                return <button key={index} style={style} onClick={() => setFilter(filterString)} className={filter.buttonClass}>{filter.name}</button>
            })}
            {isPending && <p>Loading filters....</p>}
            {error && <p>Error loading filters: {error}</p>}
        </div>}
    </div>
}