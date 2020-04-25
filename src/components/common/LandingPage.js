import React from 'react'
import { A } from "hookrouter"
import { useSelector } from "react-redux"
import Hotel from "../Browse/Hotel";
function LandingPage() {
    const state = useSelector((state) => state);
    const { currentUser } = state;
    console.log("Current User", currentUser)

    return (
        <div>
            <div class="w-full ">
                <div class="flex bg-white" style={{ height: "350px" }}>
                    <div class="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-2/3">
                        <div>
                            <h2 class="text-3xl font-semibold text-gray-800 md:text-4xl">Stay <span class="text-indigo-600">Home</span>, Fight <span class="text-indigo-600">Corona</span></h2>
                            <p class="mt-2 text-sm text-gray-500 md:text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis commodi cum cupiditate ducimus, fugit harum id necessitatibus odio quam quasi, quibusdam rem tempora voluptates. Cumque debitis dignissimos id quam vel!</p>
                            {!currentUser && <div class="flex justify-center lg:justify-start mt-6">
                                <A class="px-4 py-3 bg-gray-900 text-gray-200 text-xs font-semibold rounded hover:bg-gray-800" href="/login">SignIn</A>
                                <A class="mx-4 px-4 py-3 bg-gray-300 text-gray-900 text-xs font-semibold rounded hover:bg-gray-400" href="/register">SignUp as User</A>
                                <A class="mx-4 px-4 py-3 bg-gray-300 text-gray-900 text-xs font-semibold rounded hover:bg-gray-400" href="register">SignUp as Facilitator</A>
                            </div>}
                        </div>
                    </div>
                    <div class="hidden lg:block lg:w-1/3" >
                        <div class="h-full object-cover" >
                            <div class="h-full bg-gray-100"></div>
                        </div>
                    </div>
                </div>
            </div>
            <Hotel />
        </div>
    )
}

export default LandingPage
