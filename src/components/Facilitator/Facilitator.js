import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Facilitator() {
    return (
        <div className="font-sans bg-gray-lighter flex flex-col w-full min-h-screen">
                <div className="flex-col flex-grow container mx-auto sm:px-4 pt-6 pb-8">
                    <div className="bg-white border-t border-b sm:rounded shadow mb-6 md:mx-0 mx-2">
                        <div className="border-b px-6 py-2">
                            <div className="flex md:justify-between justify-around -mb-px py-1 flex-col md:flex-row">
                                <div className="flex flex-col">
                                    <div className="uppercase text-3xl text-center text-gray-800">Nikhil Nath R</div>
                                    <div className="text-center md:text-left text-gray-600">owner@nikhilnathr.com</div>
                                </div>
                                <div className="flex items-center justify-center md:pt-0 pt-5">
                                    <div className="flex items-center ">
                                        <div className="items-center text-sm py-1 px-2 bg-green-600 text-white rounded font-bold uppercase tracking-wide">facilitator</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex md:flex-row flex-col">
                            <div className="md:w-1/3 text-center py-8">
                                <div className="border-r">
                                    <div className="text-gray-800 mb-2">
                                        <span className="text-5xl">2</span>
                                    </div>
                                    <div className="text-sm uppercase text-gray-600 tracking-wide">
                                        Hotels
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-1/3 text-center py-8">
                                <div className="border-r">
                                    <div className="text-gray-800 mb-2">
                                        <span className="text-5xl">300</span>
                                    </div>
                                    <div className="text-sm uppercase text-gray-600 tracking-wide">
                                        Rooms
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-1/3 text-center py-8">
                                <div className="border-r">
                                    <div className="text-gray-800 mb-2">
                                        <span className="text-5xl">100</span>
                                    </div>
                                    <div className="text-sm uppercase text-gray-600 tracking-wide">
                                        Not Booked
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full mb-6 px-4 flex flex-col">
                            <div className="flex-grow flex flex-col bg-white md:mx-0 mx-2 rounded shadow overflow-x-hidden overflow-y-auto">
                                <div className="border-b">
                                    <div className="flex justify-between px-6 -mb-px">
                                        <h3 className="text-indigo-900 py-4 font-normal text-lg">
                                            Your Hotels
                                            <span className="ml-2 text-sm text-gray-500">Click one to see more</span>
                                        </h3>
                                    </div>
                                </div>
                                <div className="flex px-6 py-6 text-gray-800 items-center border-b -mx-4 hover:bg-gray-200 cursor-pointer">
                                    <div className="w-1/2 lg:w-2/5 px-2 capitalize text-left font-semibold">
                                        <span className="text-md md:text-lg">Hotel Regal Regency</span>
                                    </div>
                                    <div className="w-1/4 lg:w-1/5 text-left text-gray-600 truncate">
                                        Pathanamthitta
                                    </div>
                                    <div className="hidden lg:flex w-1/5 px-1 text-left text-gray-600">
                                        <div className="w-1/2 text-left truncate">
                                            Panthalom
                                        </div>
                                        <div className="w-1/2 text-left truncate">
                                            5 Star
                                        </div>
                                    </div>
                                    <div className="w-1/4 px-1 flex flex-col justify-around items-center">
                                        <div className="flex">
                                            <div className="text-sm py-1 px-2 bg-green-600 text-white rounded font-bold uppercase tracking-wide text-center">Active</div>
                                        </div>
                                    </div>
                                </div>
                                
                              
                            </div>
                        </div>

                        {/* <div className="w-full lg:w-1/2 px-4">
                            <div className="bg-white rounded sm:border shadow md:mx-0 mx-2">
                                <div className="border-b">
                                    <div className="flex justify-between px-6 -mb-px">
                                        <h3 className="text-blue-dark py-4 font-normal text-lg">Recent Activity</h3>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-center px-6 py-4">
                                        <div className="py-8">
                                            <div className="mb-4">
                                                <svg className="inline-block fill-current text-grey h-16 w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11.933 13.069s7.059-5.094 6.276-10.924a.465.465 0 0 0-.112-.268.436.436 0 0 0-.263-.115C12.137.961 7.16 8.184 7.16 8.184c-4.318-.517-4.004.344-5.974 5.076-.377.902.234 1.213.904.959l2.148-.811 2.59 2.648-.793 2.199c-.248.686.055 1.311.938.926 4.624-2.016 5.466-1.694 4.96-6.112zm1.009-5.916a1.594 1.594 0 0 1 0-2.217 1.509 1.509 0 0 1 2.166 0 1.594 1.594 0 0 1 0 2.217 1.509 1.509 0 0 1-2.166 0z" /></svg>
                                            </div>
                                            <p className="text-2xl text-grey-darker font-medium mb-4">No buys or sells yet</p>
                                            <p className="text-grey max-w-xs mx-auto mb-6">You've successfully linked a payment method and can start buying digital currency.</p>
                                            <div>
                                                <button type="button" className="bg-blue hover:bg-blue-dark text-white border border-blue-dark rounded px-6 py-4">Buy now</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            );
}