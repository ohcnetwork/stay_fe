import React from "react";
import { A } from 'hookrouter'
const HotelList = ({ hotels }) => {
    if (hotels.length === 0) {
        return (
            <div>
                <br /><br />
                <div className="relative max-w-7xl mx-auto">
                    <div className="text-center">
                        <h3 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
                            Sorry :)
                        </h3>
                        <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
                            Unfortunately no hotels matched your search parameters
                        </p>
                    </div>
                </div>

            </div>
        );
    }
    return (
        <div className="hotelslist-center">
            <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
                {hotels.map(item => {
                    return <div key={item.hotelId}>
                        <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                            <div className="flex-shrink-0">
                                <img className="h-48 w-full object-cover" src={item.photos} alt={`${item.name} imgage`} />
                            </div>
                            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                <div className="flex-1">
                                    <p className="text-sm leading-5 font-medium text-indigo-600">
                                        <span>
                                            {item.starCategory} Star
                                       </span>
                                    </p>
                                    <A href={`roomlist/${item.hotelId}`} className="block">
                                        <h3 className="mt-2 text-base leading-7 font-semibold text-gray-900">
                                            {item.name}
                                        </h3>
                                        {/* <p className="mt-3 text-xl leading-6 text-gray-500">
                                            Rs. 18,000
                                       </p> */}
                                    </A>
                                </div>
                                <div className="mt-6 flex items-center">
                                    <div className="ml-3">
                                        <p className="text-sm leading-5 font-medium text-gray-900">
                                            <A href={`roomlist/${item.hotelId}`} className="hover:underline">
                                                {item.category}
                                            </A>
                                        </p>
                                        <div className="flex text-sm leading-5 text-gray-500">
                                            {/* <time dateTime="2020-03-16">
                                                Mar 16, 2020
                                            </time> */}
                                            {item.address}<br />
                                            {item.district}
                                            <span className="mx-1">
                                                &middot;
                    </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
};

export default HotelList;
