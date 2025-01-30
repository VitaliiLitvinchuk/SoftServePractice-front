import React, { useCallback, useRef } from 'react'
import "./index.css";

interface ISearchProps {
    value: string
    setValue: (filter: string) => void
}

const SearchInput = ({ value, setValue }: ISearchProps) => {
    const filterInput = useRef<HTMLInputElement>(null);
    const filterIcon = useRef<HTMLDivElement>(null);

    const handleKeyPress = (e: React.KeyboardEvent) =>
        e.key === 'Enter' &&
        filterIcon.current?.click();

    const handleFilter = useCallback(() => {
        setValue(filterInput.current?.value || "");
    }, [setValue]);

    return (
        <div className="highlighter d-flex align-items-center bg-white rounded rounded-3">
            <div className="w-100 ps-3" onClick={() => filterInput.current?.focus()}>
                <input
                    ref={filterInput}
                    onKeyDown={handleKeyPress}
                    defaultValue={value}
                    type="text"
                    className="search-input bg-transparent w-100 border-0 p-0 text-dark"
                    placeholder="Filter by title" />
            </div>
            <div
                ref={filterIcon}
                className="search-icon py-1 pe-2"
                onClick={handleFilter}>
                <i className="fa fa-2x fa-search text-primary"></i>
            </div>
        </div>
    )
}

export default SearchInput