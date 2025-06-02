import React, { useState } from "react";

const Search = () => {
    const [searchInput, setSearchInput] = useState("");

    return (
        <>
            <div className="search">
                <div>
                    <img src="search.svg" alt="Search Icon" />
                    <input
                        type="text"
                        placeholder="Search for movies..."
                        value={searchInput}
                        onChange={(e) => {
                            setSearchInput(e.target.value);
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default Search;
