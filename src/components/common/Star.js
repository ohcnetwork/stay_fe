import React from "react";

export default function Start({ num, dim = 6 }) {
    return Array.apply(null, {
        length: 5,
    }).map((el, i) => (
        <svg
            key={i.toString()}
            className={`w-${dim} h-${dim} mr-1`}
            viewBox="0 0 300 275"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1">
            <polygon
                fill={`${i < num ? "#2D3748" : "#CBD5E0"}`}
                stroke={`${i < num ? "#2D3748" : "#CBD5E0"}`}
                strokeWidth="15"
                points="150,25  179,111 269,111 197,165 223,251  150,200 77,251  103,165 31,111 121,111"
            />
        </svg>
    ));
}
