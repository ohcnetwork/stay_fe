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

export const FullLoading = ({ color = "gray-200" }) => {
    return (
        <div
            className={`h-screen w-full items-center flex flex-col justify-center overflow-hidden bg-${color}`}>
            <Loading />
        </div>
    );
};
