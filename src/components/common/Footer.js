import React from "react";
import { A } from "hookrouter";

export default function Footer({ signUp }) {
    return (
        <div className="absolute bottom-0 w-full">
            <section className="bg-indigo-700 py-3 w-full">
                <div className="container mx-auto px-8">
                    {signUp && (
                        <A
                            href="facilitator-register"
                            className="block text-gray-400 font-bold text-m text-center pb-2 hover:text-indigo-400">
                            Sign Up as Facilitator
                        </A>
                    )}
                    {/* <p className="text-gray-400 text-center  text-sm sm:mb-2">
                        Powered by OSS Project
                    </p> */}
                    <a
                        href="https://github.com/coronasafe/"
                        className="block text-gray-400 text-center  font-bold text-sm sm:mb-2 ">
                        Powered by OSS Project :
                        <span className=" underline hover:text-indigo-400">
                            Github-Reference
                        </span>
                    </a>
                </div>
            </section>
        </div>
    );
}
