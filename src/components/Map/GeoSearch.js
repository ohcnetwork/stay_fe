import React, { useState } from "react";
import Axios from "axios";
import { Loading } from "../common/Loader";

export default function GeoSearch({ onChange = () => null }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function search() {
        setLoading(true);
        setResults([]);
        setError("");
        const baseURL = "https://nominatim.openstreetmap.org/search";
        const params = `q=${query}&countrycodes=IN&format=json&limit=5`;

        try {
            const results = await Axios.get(`${baseURL}?${params}`);
            if (results.data && results.data.length > 0) {
                setResults(results.data);
            } else {
                setError("No results found");
            }
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
        setLoading(false);
    }

    function changeHandler(val) {
        const { lat, lon, display_name } = val;
        setResults([]);
        setQuery(display_name);
        onChange({ lat: parseFloat(lat), lng: parseFloat(lon) });
    }

    function showResults() {
        if (results.length > 0) {
            return (
                <div className="shadow-xl rounded rounded-t-none bg-gray-100 absolute w-full">
                    {results.map((result) => (
                        <div
                            key={result.place_id}
                            className="text-gray-700 px-2 py-2 break-word transition ease-in duration-200 hover:bg-gray-300 cursor-pointer text-sm"
                            onClick={() => changeHandler(result)}>
                            {result.display_name}
                        </div>
                    ))}
                </div>
            );
        }

        if (loading) {
            return (
                <div className="shadow-xl rounded rounded-t-none bg-gray-100 absolute w-full">
                    <Loading />
                </div>
            );
        }

        if (error) {
            return <div className="text-sm text-red-700">{error}</div>;
        }
    }

    return (
        <div className="">
            <div className="flex h-12">
                <input
                    name="location"
                    type="text"
                    value={query}
                    onChange={(el) => setQuery(el.target.value)}
                    className={`flex-grow appearance-none rounded h-full rounded-r-none ${
                        error ? "border-red-700" : ""
                    } py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border focus:bg-gray-100`}
                    placeholder="Search for a location"
                />
                <button
                    onClick={search}
                    disabled={loading}
                    className={`flex items-center ${
                        loading
                            ? "bg-gray-600 cursor-default"
                            : "bg-indigo-700 hover:bg-indigo-800"
                    } text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline rounded-l-none`}>
                    Search
                </button>
            </div>
            {showResults()}
        </div>
    );
}
