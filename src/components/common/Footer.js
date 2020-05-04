import React from "react";
import { A } from "hookrouter";

export default function Footer({ signUp }) {
    return (
        <div>
            <section className="bg-indigo-700 py-3 w-full ">
                <div className="container mx-auto px-8">
                    <p className="text-gray-400 text-center text-sm sm:mb-2">
                        © 2020 CoronaSafe Network. All rights reserved.
                    </p>
                    {signUp && (
                        <A
                            href="facilitator-register"
                            className="block text-gray-400 font-bold text-sm text-center hover:text-indigo-400">
                            Sign Up as Facilitator
                        </A>
                    )}
                </div>
            </section>
        </div>
    );
}
