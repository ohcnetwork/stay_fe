import React, { useState, useEffect } from 'react'
import { getHotelList, getOptionlist, getDistricts } from "../../Redux/actions";
import { useDispatch } from 'react-redux';
import HotelList from "./HotelList";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);


function Hotel() {

    const dispatch = useDispatch()
    const [price, setprice] = useState([0, 1000])
    const [form, setform] = useState({
        category: "All",
        location: "All"
    })
    const [optionlist, setoptionlist] = useState({
        category: ["All"],
        location: ["ALL"],
        minPrice: 0,
        maxPrice: 1000
    })
    const [hotels, sethotels] = useState([])


    useEffect(() => {
        getOptions()
        const formdata = {
            search: "AVAILABLE"
        }
        dispatch(getHotelList(formdata))
            .then(res => {
                console.log("dispatch hotels", res)
                sethotels(res.data)
            })

    }, [])

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const onSubmit = () => {
        var category = form.category;
        var location = form.location;
        if (category === "All") {
            category = ""
        }
        if (location === "All") {
            location = ""
        }
        const formdata = {
            search: "AVAILABLE",
            category: category,
            district: location,
            // price
            minimum: price[0],
            maximum: price[1]
        }
        console.log(formdata)
        dispatch(getHotelList(formdata))
            .then(res => {
                console.log("dispatch", res)
                sethotels(res.data)
            })
    }
    const getOptions = () => {
        dispatch(getOptionlist()).then(res => {

            const category = []
            for (var i = 0; i < res.data[0].length; i++) {
                category[i] = res.data[0][i].category
            }
            setoptionlist({

                // category: ["All", ...res.data.category],
                // guest: res.data.guest,
                // minPrice: res.data.minPrice,
                // maxPrice: res.data.maxPrice
                category: ["All", ...category],
                minPrice: 0,
                maxPrice: 1000,
                location: ["All", "Hello"]
            })
        })

        dispatch(getDistricts()).then(res => {
            console.log(res)
            const array = []
            for (var i = 0; i < res.data.length; i++) {
                array[i] = res.data[i].district
            }
            console.log(array)
            setoptionlist({ ...optionlist, location: ["All", ...array] })

        })

    }
    const onSliderChange = (value) => {
        console.log(value);
        setprice(value);
    }
    return (
        <>
            <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8 max-w-6xl mx-auto">
                <div className="absolute inset-0">
                    <div className="bg-white h-1/3 sm:h-2/3"></div>
                </div>
                <div className="relative max-w-7xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
                            Accomodation
                        </h2>
                        <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
                            Select an accomodation that fits your needs and your budget
                        </p>
                    </div>
                </div>
                <br />
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="type">
                                Category
                            </label>
                            <div className="relative">
                                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="category"
                                    id="category"
                                    onChange={handleChange}
                                    value={form.category}
                                >
                                    {optionlist.category.map((item, index) => (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="location">
                                Location
                            </label>
                            <div className="relative">
                                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="location"
                                    id="location"
                                    onChange={handleChange}
                                    value={form.location}
                                >
                                    {optionlist.location.map((item, index) => (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>


                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Price Rs. {price[0]}-{price[1]}
                            </label>
                            <div className="relative">
                                <Range min={optionlist.minPrice} max={optionlist.maxPrice} allowCross={false} value={price} onChange={onSliderChange} step={50} />
                            </div>
                        </div>

                        <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                            <div style={{ paddingTop: "30px" }} className="relative">
                                <button onClick={onSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    Apply
                            </button>
                            </div>
                        </div>
                    </div>
                </div>


                <HotelList hotels={hotels} />
            </div>
        </>
    )
}

export default Hotel
