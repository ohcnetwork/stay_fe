import React, { useState, useEffect, useRef } from "react";
import { BOOKING_TERMS, GENDER } from "../../Common/constants";
import { phonePreg, isNumber } from "../../util/validation";
import { useDispatch } from "react-redux";
import { dopostBook } from "../../Redux/actions";
import { navigate } from "hookrouter";
import { Loading } from "../common/Loader";
import * as Notficiation from "../../util/Notifications";
import {
    stringFromDate,
    setRoomDetails,
    setAppliedFilters,
} from "../../util/helperFunctions";

export default function BookingConfirmation({ shown, toggle, data }) {
    const dispatch = useDispatch();
    var checkin = stringFromDate(data.startdate);
    var checkout = stringFromDate(data.enddate);

    const myInput = useRef();
    useEffect(() => {
        myInput.current && myInput.current.focus();
    }, [shown]);

    const initPerson = {
        name: "",
        age: "",
        gender: GENDER[0].type,
        number: "",
    };
    const initErr = { ...initPerson, gender: "" };
    const optional = ["number"];

    const [previousPersons, setPreviousPersons] = useState([]);
    const [person, setPerson] = useState(initPerson);
    const [personErr, setPersonErr] = useState(initErr);

    const [loading, setLoading] = useState(false);

    function validPerson() {
        let err = Object.assign({}, initErr);
        let isValid = true;
        setPersonErr(initErr);

        Object.keys(person).forEach((key) => {
            if (person[key] === "" && !optional.includes(key)) {
                err[key] = true;
                isValid = false;
            }
        });

        if (person["number"] !== "" && !phonePreg(person["number"])) {
            err["number"] = true;
            isValid = false;
        }

        if (!isNumber(person["age"])) {
            err["age"] = true;
            isValid = false;
        } else {
            if (person["age"] > 125 || person["age"] < 0) {
                err["age"] = true;
                isValid = false;
            }
        }

        setPersonErr(err);
        return isValid;
    }

    function addPerson(e) {
        e.preventDefault();

        if (validPerson()) {
            const number = person.number || null;
            setPreviousPersons([...previousPersons, { ...person, number }]);
            setPerson(initPerson);
        }
    }

    function deletePerson(i) {
        setPreviousPersons(previousPersons.filter((el, ind) => i !== ind));
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setPerson({ ...person, [name]: value });
    }

    function confirmBooking() {
        setLoading(true);
        const bookingData = {
            roomid: data.id,
            checkin: checkin,
            checkout: checkout,
            guestdetails: previousPersons,
        };

        if (previousPersons.length > 0) {
            dispatch(dopostBook(bookingData)).then((resp) => {
                const { data: res } = resp;
                const { status: statusCode } = resp;
                if (res && statusCode === 201) {
                    Notficiation.Success({
                        msg: "Booking Successfull",
                    });
                    setAppliedFilters("", true);
                    setRoomDetails("", true);
                    navigate("/history");
                } else {
                    setLoading(false);
                    Notficiation.Error({
                        msg:
                            "Sorry! some error encountered... Please reload the page to continue.",
                    });
                }
            });
        }
    }

    return (
        <div
            className={`${
                shown ? "flex" : "hidden"
            } fixed top-0 left-0 bg-gray-200 h-screen w-full items-center justify-center z-10`}>
            {loading ? (
                <Loading />
            ) : (
                <div className="pb-8 px-0 md:w-1/2 bg-white shadow-lg mx-5 rounded max-h-screen overflow-y-auto">
                    <div className="uppercase bg-indigo-700 pt-3 px-5 pb-2 text-lg text-white font-bold tracking-wide rounded-t">
                        Confirm Booking
                    </div>

                    <div className="px-5">
                        <div className="pb-8 pt-3 px-0 text-gray-800">
                            <div className="">
                                You are booking{" "}
                                <span className="font-medium">
                                    {data.category}
                                </span>{" "}
                                room for{" "}
                                <span className="font-medium">{data.beds}</span>{" "}
                                person(s) from{" "}
                                <span className="font-medium">{checkin}</span>{" "}
                                to{" "}
                                <span className="font-medium">{checkout}</span>
                            </div>
                            <div className="mt-4">{BOOKING_TERMS}</div>
                            {previousPersons.length < data.beds && (
                                <div className="mt-4">
                                    <div className="font-bold">
                                        Occupant Details
                                    </div>
                                    <form onSubmit={addPerson}>
                                        <div className="">
                                            <div className="flex py-1">
                                                <input
                                                    ref={myInput}
                                                    type="text"
                                                    name="name"
                                                    className={`w-3/4 mr-1 border appearance-none bg-gray-200 focus:bg-gray-300 ${
                                                        personErr.name
                                                            ? "border-red-500"
                                                            : ""
                                                    } rounded py-2 px-3 text-gray-700 leading-tight focus:border-indigo-700 focus:outline-none`}
                                                    placeholder="Name"
                                                    value={person.name}
                                                    onChange={handleChange}
                                                />
                                                <input
                                                    type="number"
                                                    name="age"
                                                    min="0"
                                                    step="1"
                                                    className={`w-1/4 border appearance-none bg-gray-200 focus:bg-gray-300 ${
                                                        personErr.age
                                                            ? "border-red-500"
                                                            : ""
                                                    } rounded py-2 px-3 text-gray-700 leading-tight focus:border-indigo-700 focus:outline-none`}
                                                    placeholder="Age"
                                                    value={person.age}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="flex">
                                                <div className="relative w-1/2 mr-1">
                                                    <select
                                                        className={`appearance-none w-full py-2 px-3 ${
                                                            personErr.number
                                                                ? "border-red-500"
                                                                : ""
                                                        } bg-gray-200 focus:bg-gray-300 text-gray-700 rounded`}
                                                        name="gender"
                                                        value={person.gender}
                                                        onChange={handleChange}>
                                                        {GENDER.map((el) => (
                                                            <option
                                                                value={el.type}
                                                                key={el.type}>
                                                                {el.text}
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
                                                <input
                                                    type="tel"
                                                    name="number"
                                                    className={`w-1/2 border appearance-none bg-gray-200 focus:bg-gray-300 ${
                                                        personErr.number
                                                            ? "border-red-500"
                                                            : ""
                                                    } rounded py-2 px-3 text-gray-700 leading-tight focus:border-indigo-700 focus:outline-none`}
                                                    placeholder="Phone"
                                                    value={person.number}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className=""></div>
                                        </div>
                                        <div className="flex justify-between py-1">
                                            <div className="text-red-500 text-xs italic bold">
                                                {Object.values(
                                                    personErr
                                                ).reduce(
                                                    (acc, el) => acc || el,
                                                    false
                                                ) && "Form contains errors"}
                                            </div>
                                            <button
                                                type="submit"
                                                className="bg-indigo-700 hover:bg-indigo-800 px-4 py-2 text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline">
                                                Add person
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                            <div className="flex flex-wrap">
                                {previousPersons.map((prevPerson, i) => (
                                    <div
                                        className="mt-4 bg-gray-100 flex flex-col items-center justify-between border p-2 mr-2 text-sm rounded"
                                        key={i.toString()}>
                                        <div className="pb-1 font-bold uppercase">
                                            Occupant {i + 1}
                                        </div>
                                        <div className="">
                                            <div className="">
                                                {prevPerson.name}(
                                                {prevPerson.age}
                                                {prevPerson.gender[0]})
                                            </div>
                                            <div className="">
                                                {prevPerson.number}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => deletePerson(i)}
                                            className="mt-2 py-1 px-2 bg-red-700 hover:bg-red-800 font-bold text-white text-sm rounded">
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-between font-bold tracking-wide">
                            <div className="flex" onClick={toggle}>
                                <div className="flex items-center justify-center p-2 px-3 md:px-6 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer">
                                    Back
                                </div>
                            </div>
                            <div className="flex text-white">
                                <button
                                    onClick={confirmBooking}
                                    className={`flex items-center justify-center rounded p-2 px-3 md:px-6 font-bold ${
                                        previousPersons.length > 0
                                            ? "bg-indigo-700 hover:bg-indigo-800"
                                            : "bg-gray-200 cursor-default text-gray-500"
                                    }`}>
                                    Confirm Booking
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
