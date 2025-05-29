'use client'

import { MouseEventHandler, useEffect, useState } from "react";

export default function SearchBar({handleSearch}: {handleSearch: (searchInput: string) => void}) {
    const [searchInput, setSearchInput] = useState("");
    const handleInputChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!searchInput.trim()) {
            return handleSearch("");;
        }
        handleSearch(searchInput);
    }

return (
    <div className="w-full mx-2 flex justify-center lg:justify-end pb-4 lg:pb-10">
        <form className="text-xs">
            <div className="flex items-center rounded overflow-hidden shadow-sm focus-within:shadow-lg">
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search for product..."
                    className="flex-grow py-1.5 px-2 outline-none bg-white"
                />
                <button
                    type="submit"
                    onClick={handleInputChange}
                    className="bg-teal-800 text-xs text-background py-1.5 px-6 hover:bg-teal-900 hover:cursor-pointer shadow-sm focus-within:shadow-md"
                    >
                        Search
                </button>
            </div>
        </form>
    </div>
)
}