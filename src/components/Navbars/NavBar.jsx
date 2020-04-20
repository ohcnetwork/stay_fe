import React, { useState } from "react";
import { A, navigate } from "hookrouter";

export default function NavBar({ links, logout }) {
    const [ shown, setShown ] = useState(false);

    return (
        <nav className="flex items-center justify-between flex-wrap bg-indigo-700">
            <div className="flex items-center flex-shrink-0 text-white mr-6 py-6 pl-6">
                <svg
                    className="fill-current h-8 w-8 mr-2"
                    width="54"
                    height="54"
                    viewBox="0 0 54 54"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
                </svg>
                <span className="font-semibold text-xl tracking-tight">Quarantine Stay</span>
            </div>
            <div className="block lg:hidden py-6 pr-6">
                <button
                    onClick={() => setShown(!shown)} 
                    className="flex items-center px-3 py-2 border rounded text-indigo-200 border-indigo-400 hover:text-white hover:border-white"
                    >
                    <svg
                        className="fill-current h-3 w-3"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div className={`w-full ${shown? "block": "hidden"} flex-grow lg:flex lg:items-center lg:w-auto lg:justify-center lg:bg-indigo-700 bg-indigo-600 pb-6 lg:p-6`}>
                <div className="text-sm lg:flex-grow flex flex-col lg:flex-row">
                    {   
                        links &&
                        links.map(el => (
                            <A
                                key={el.title}
                                onClick={() => setShown(!shown)}
                                className="block lg:inline-block lg:mt-0 text-gray-200 hover:text-white pr-20 lg:px-4 py-2 text-right lg:text-left lg:hover:bg-indigo-700 hover:bg-indigo-500" 
                                href={el.link}
                            >
                                {el.title}
                            </A>
                        ))
                    }
                </div>
                <div className="flex justify-end">
                    {   
                        logout &&
                        <A
                            href="#"
                            className="mr-16 lg:mr-0 inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                            onClick={(e) => {
                                e.preventDefault();
                                localStorage.setItem("stay_access_token", "");
                                navigate("/");
                                window.location.reload();
                            }}
                            >
                            Logout
                        </A>
                    }
                </div>
            </div>
        </nav>
    );
}