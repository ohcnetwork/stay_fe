import React from "react";
import "../styles/Loader.css";
const img = "https://coronasafe.network/break-chain.png";
export const Loading = () => {
    return (
        <div className="flex justify-center items-center m-10">
            <div className=" text-center ">
                <img src={img} className="App-logo" alt="logo" />
            </div>
        </div>
    );
};
