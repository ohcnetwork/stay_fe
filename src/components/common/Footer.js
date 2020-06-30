import React from "react";
import { A } from "hookrouter";

export default function Footer({ signUp }) {
    return (
        <div className="absolute bottom-0 w-full">
            <section className="bg-indigo-700 py-3 w-full">
                <div className="container mx-auto px-8">
                    {/* {signUp && (
                        <A
                            href="facilitator-register"
                            className="block text-gray-400 font-bold text-sm text-center  hover:text-indigo-400">
                            Sign Up as Facilitator
                        </A>
                    )} */}
                    <a
                        href="https://coronasafe.network/"
                        className="block text-gray-400 text-center  font-bold text-sm sm:mb-2 hover:text-indigo-400 ">
                        Powered by Coronasafe Network
                    </a>
                </div>
            </section>
        </div>
    );
}
