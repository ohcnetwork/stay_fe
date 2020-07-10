import React, { useEffect } from "react";
import { A } from "hookrouter";
import { useSelector } from "react-redux";
import Hotel from "../Browse/Hotel";
const landingPageImage =
    "https://cdn.coronasafe.network/stay/landingpageimage.png";
function LandingPage() {
    const state = useSelector((reduxState) => reduxState);
    const { currentUser } = state;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="">
            <div className="w-full">
                <div className="flex py-6">
                    <div className="flex items-center text-left sm:text-center md:text-left px-8 md:pl-12 lg:w-2/3">
                        <div>
                            <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl">
                                Stay{" "}
                                <span className="text-indigo-600">
                                    Quarantined
                                </span>
                                , Fight{" "}
                                <span className="text-indigo-600">Corona</span>
                            </h2>
                            <p className="mt-2 text-sm text-black-300 md:text-base">
                                A platform to list and book quarantined hotels
                                and corona care centers in Kerala with all
                                required facilities provided to you. Choose from
                                the best of the facilities we provide and make
                                your quarantine stay better and safe!{" "}
                                <b>Together lets Fight Corona!</b>
                            </p>
                            {!currentUser && (
                                <div className="flex justify-center lg:justify-start mt-6">
                                    <A
                                        className="px-4 py-3 bg-gray-900 text-gray-200 text-xs font-semibold rounded hover:bg-gray-800"
                                        href="/login">
                                        Sign In
                                    </A>
                                    <A
                                        className="ml-4 px-4 py-3 bg-gray-300 text-gray-900 text-xs font-semibold rounded hover:bg-gray-400"
                                        href="/user-register">
                                        Sign Up
                                    </A>
                                    {/* <A
                                        className="ml-4 px-4 py-3 bg-gray-300 text-gray-900 text-xs font-semibold rounded hover:bg-gray-400"
                                        href="facilitator-register">
                                        SignUp as Facilitator
                                    </A> */}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="hidden md:block lg:w-1/3 pr-8">
                        <div className="h-full object-cover">
                            <div className="h-full">
                                <img
                                    src={landingPageImage}
                                    alt="Coronasafe Stay"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Hotel />
        </div>
    );
}

export default LandingPage;
