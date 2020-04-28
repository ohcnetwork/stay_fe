import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import { useDispatch, connectAdvanced } from "react-redux";
import Slider from "rc-slider";
import { Loading } from "../common/Loader";

import { getHotelList, getOptionlist, getDistricts } from "../../Redux/actions";
import HotelList from "./HotelList";
import ErrorComponent from "./ErrorComponent";
import "rc-slider/assets/index.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

function Hotel() {
    const dispatch = useDispatch();

    // for bad response
    const [errFlag, seterrFlag] = useState(false);
    // for catch error
    const [errFlagCatch, seterrFlagCatch] = useState(false);
    // for loading
    const [loading, setloading] = useState(true);

    var today = new Date();
    today.setDate(today.getDate() + 15);
    const [startdate, setstartdate] = useState({
        date: new Date(),
    });
    const [enddate, setenddate] = useState({
        date: today,
    });
    const [price, setprice] = useState([]);
    const [form, setform] = useState({
        category: "All",
        location: "All",
        beds: 1,
    });
    const [optionlist, setoptionlist] = useState({
        category: ["All"],
        location: ["ALL"],
        minPrice: 0,
        maxPrice: 1000,
    });
    const [hotels, sethotels] = useState([]);

    useEffect(() => {
        seterrFlagCatch(false);
        seterrFlag(false);
        setloading(true);
        var startdates = startdate.date.getTimezoneOffset() * 60000; //offset in milliseconds
        var checkins = new Date(startdate.date - startdates)
            .toISOString()
            .slice(0, -14);

        var enddates = enddate.date.getTimezoneOffset() * 60000; //offset in milliseconds
        var checkouts = new Date(enddate.date - enddates)
            .toISOString()
            .slice(0, -14);

        getOptions();
        const formdata = {
            checkin: checkins,
            checkout: checkouts,
            type: "hotel",
            beds: form.beds,
        };
        dispatch(getHotelList(formdata))
            .then((res) => {
                if (res) {
                    res.data = res.data.filter((e) => e);
                    sethotels(res.data);
                    setloading(false);
                } else {
                    seterrFlag(true);
                    setloading(false);
                }
                // console.log("dispatch hotels", res)
            })
            .catch((err) => {
                seterrFlagCatch(true);
                setloading(false);
            });
    }, []);

    var startdates = startdate.date.getTimezoneOffset() * 60000; //offset in milliseconds
    var checkin = new Date(startdate.date - startdates)
        .toISOString()
        .slice(0, -14);

    var enddates = enddate.date.getTimezoneOffset() * 60000; //offset in milliseconds
    var checkout = new Date(enddate.date - enddates)
        .toISOString()
        .slice(0, -14);

    const [submitdate, setsubmitdate] = useState({
        checkin: checkin,
        checkout: checkout,
    });
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };
    const onSubmit = () => {
        seterrFlagCatch(false);
        seterrFlag(false);
        setloading(true);
        var category = form.category;
        var location = form.location;
        if (category === "All") {
            category = "";
        }
        if (location === "All") {
            location = "";
        }

        var tempstartdate = startdate.date.getTimezoneOffset() * 60000; //offset in milliseconds
        var checkinsubmit = new Date(startdate.date - tempstartdate)
            .toISOString()
            .slice(0, -14);

        var tempenddate = enddate.date.getTimezoneOffset() * 60000; //offset in milliseconds
        var checkoutsubmit = new Date(enddate.date - tempenddate)
            .toISOString()
            .slice(0, -14);
        const formdata = {
            category: category,
            district: location,
            // price
            minimum: price[0],
            maximum: price[1],
            checkin: checkinsubmit,
            checkout: checkoutsubmit,
            type: "hotel",
            beds: form.beds,
        };
        setsubmitdate({
            checkin: checkinsubmit,
            checkout: checkoutsubmit,
        });
        dispatch(getHotelList(formdata))
            .then((res) => {
                if (res) {
                    console.log("dispatch", res);
                    res.data = res.data.filter((e) => e);
                    sethotels(res.data);
                    setloading(false);
                } else {
                    seterrFlag(true);
                    setloading(false);
                }
            })
            .catch((err) => {
                seterrFlagCatch(true);
                setloading(false);
            });
    };
    const getOptions = () => {
        dispatch(getOptionlist())
            .then((res) => {
                if (res) {
                    const category = [];
                    for (var i = 0; i < res.data[0].length; i++) {
                        category[i] = res.data[0][i].category;
                    }
                    const minimum = Math.max(
                        0,
                        parseInt(res.data[1][0].minimum) -
                            (parseInt(res.data[1][0].minimum) % 100)
                    );
                    const maximum = Math.max(
                        0,
                        parseInt(res.data[1][0].maximum) +
                            (100 - (parseInt(res.data[1][0].maximum) % 100))
                    );

                    dispatch(getDistricts())
                        .then((res) => {
                            if (res.data) {
                                console.log(res);
                                const array = [];
                                for (var i = 0; i < res.data.length; i++) {
                                    array[i] = res.data[i].district;
                                }
                                console.log(array);
                                setoptionlist({
                                    ...optionlist,
                                    location: ["All", ...array],
                                    category: ["All", ...category],
                                    minPrice: minimum,
                                    maxPrice: maximum,
                                });
                                setprice([minimum, maximum]);
                            } else {
                                seterrFlag(true);
                            }
                        })
                        .catch((err) => seterrFlagCatch(true));
                } else {
                    seterrFlag(true);
                }
            })

            .catch((err) => seterrFlagCatch(true));
    };
    const onSliderChange = (value) => {
        console.log(value);
        setprice(value);
    };
    const onstartDateChange = (newdate) => {
        setstartdate({ date: newdate });
    };
    const onendDateChange = (newdate) => {
        setenddate({ date: newdate });
    };
    const bed_decrement = () => {
        if (form.beds > 1) {
            setform({
                ...form,
                beds: form.beds - 1,
            });
        }
    };
    const bed_increment = () => {
        if (form.beds < 20) {
            setform({
                ...form,
                beds: form.beds + 1,
            });
        }
    };
    return (
        <div>
            <div className="relative bg-gray-50 pb-20 px-4 sm:px-6 lg:pb-28 lg:px-8 mx-auto ">
                <div className="relative max-w-7xl mx-auto">
                    <div className="">
                        {/* <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
                            Accomodation
                        </h2> */}
                        <p className="mt-3  text-xl leading-7 text-indigo-500 sm:mt-4">
                            Select an accomodation that fits your needs and your
                            budget
                        </p>
                    </div>
                </div>
                <br />
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="type">
                                Category
                            </label>
                            <div className="relative">
                                <select
                                    className="block appearance-none w-full bg-gray-300 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="category"
                                    id="category"
                                    onChange={handleChange}
                                    value={form.category}>
                                    {optionlist.category.map((item, index) => (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg
                                        className="fill-current h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="location">
                                Location
                            </label>
                            <div className="relative">
                                <select
                                    className="block appearance-none w-full bg-gray-300 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="location"
                                    id="location"
                                    onChange={handleChange}
                                    value={form.location}>
                                    {optionlist.location.map((item, index) => (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg
                                        className="fill-current h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="type">
                                No. of Beds
                            </label>
                            <div className="relative">
                                <div
                                    style={{ maxWidth: "10rem" }}
                                    className="custom-number-input h-10">
                                    <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1 hover:text-black text-gray-700">
                                        <button
                                            onClick={bed_decrement}
                                            className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                                            <span className="m-auto text-2xl font-thin">
                                                −
                                            </span>
                                        </button>
                                        <input
                                            readOnly
                                            type="number"
                                            className="beds-count outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md focus:text-black  md:text-basecursor-default flex items-center   outline-none"
                                            name="custom-input-number"
                                            value={form.beds}></input>
                                        <button
                                            onClick={bed_increment}
                                            className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer outline-none">
                                            <span className="m-auto text-2xl font-thin">
                                                +
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Price Rs. {price[0]}-{price[1]}
                            </label>
                            <div className="relative">
                                <Range
                                    style={{ paddingTop: "20px" }}
                                    min={optionlist.minPrice}
                                    max={optionlist.maxPrice}
                                    allowCross={false}
                                    value={price}
                                    onChange={onSliderChange}
                                    step={50}
                                />
                            </div>
                        </div>

                        <div
                            style={{ paddingTop: "20px" }}
                            className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Start Date
                            </label>
                            <div className="relative">
                                <DatePicker
                                    value={startdate.date}
                                    onChange={(newdate) =>
                                        onstartDateChange(newdate)
                                    }
                                    minDate={new Date()}
                                    clearIcon={null}
                                    format="y-MM-dd"
                                />
                            </div>
                        </div>
                        <div
                            style={{ paddingTop: "20px" }}
                            className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                End Date
                            </label>
                            <div className="relative">
                                <DatePicker
                                    value={enddate.date}
                                    onChange={(newdate) =>
                                        onendDateChange(newdate)
                                    }
                                    minDate={new Date()}
                                    clearIcon={null}
                                    format="y-MM-dd"
                                />
                            </div>
                        </div>

                        <div
                            style={{ paddingTop: "20px" }}
                            className="w-full md:w-1/3  px-3 mb-6 md:mb-0">
                            <div
                                style={{ paddingTop: "30px" }}
                                className="relative">
                                <button
                                    onClick={onSubmit}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:outline-none"
                                    type="button">
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <Loading />
                ) : errFlagCatch ? (
                    <ErrorComponent />
                ) : errFlag ? (
                    <ErrorComponent />
                ) : (
                    <HotelList
                        hotels={hotels}
                        startdate={submitdate.checkin}
                        enddate={submitdate.checkout}
                    />
                )}
            </div>
        </div>
    );
}

export default Hotel;
