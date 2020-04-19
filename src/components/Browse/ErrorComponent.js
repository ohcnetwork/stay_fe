import React from 'react'


const ErrorComponent = () => {
    return (
        <div>
            <br /> <br />
            <div className="relative max-w-7xl mx-auto">
                <div className="text-center">
                    <h3 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
                        Connection Error :)
                        </h3>
                    <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
                        We seem to be having some problem in fetching the list of hotels
                        Please check your connection and reload the page
                        </p>
                </div>
            </div>
        </div>
    )
}

export default ErrorComponent
