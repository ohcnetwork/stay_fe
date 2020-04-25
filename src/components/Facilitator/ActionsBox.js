import React from "react";
import { A } from "hookrouter";

export default function ActionsBox({ buttons, labels = [] }) {
    return (
        <div className="bg-white rounded sm:border shadow md:mx-0 mx-2 pb-1">
            <div className="border-b">
                <div className="flex px-6 -mb-px items-center">
                    <h3 className="text-blue-dark py-4 font-normal text-lg">
                        Actions
                    </h3>
                    {labels.map((label) => (
                        <div key={label} className="flex items-center ml-2">
                            <div className="text-sm py-1 px-2 bg-green-600 text-white font-bold uppercase tracking-wide text-center">
                                {label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-wrap justify-evenly">
                {buttons.map((btn) =>
                    btn.link ? (
                        <A
                            key={btn.text}
                            href={btn.link}
                            className="flex items-center text-lg m-5 py-3 px-8 bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline">
                            {btn.text}
                        </A>
                    ) : (
                        <div
                            key={btn.text}
                            onClick={btn.action}
                            className="cursor-pointer flex items-center text-lg m-5 py-3 px-8 bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline">
                            {btn.text}
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
