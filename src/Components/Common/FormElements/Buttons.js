import React from "react";

export const ThemeButton = ({ type, text, loading }) => {
    return (
        <button className={`button theme-button ${loading ? "loading" : ""}`} type={type}>{text}</button>
    );
};
