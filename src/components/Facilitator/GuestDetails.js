import React from "react";


function GuestDetails({ user_details, id }) {
    var item = [];
    var i;
    var j = 0;
    for (i = 0; i < user_details.length; i++) {
        if (user_details[i].book_id === id) {
            for (j = 0; j < user_details[i].guestdetail.length; j++) {
                item = item.concat(user_details[i].guestdetail[j]);
            }
            break;
        }
    }
    return (
        <div className=" m-0 mt-5 m-auto">
            <div className="m-0 text-center text-4xl lg:w-1/4 w-full m-auto">
                <h1 className="m-0 m-auto">GUEST DETAILS</h1>
            </div>
            <div className="m-0 m-auto w-3/4   relative  content-center lg:grid-cols-2 grid ">
                {item.map((value, index) => {
                    return (
                        <div className="max-w-sm m-0 m-auto w-full bg-white shadow-lg rounded-lg overflow-hidden my-4">
                            <div className="flex items-center px-6 py-3 bg-indigo-600">
                                <h1 className="mx-3 text-white font-semibold text-lg">
                                    Guest {index + 1}
                                </h1>
                            </div>
                            <div className="py-4 px-6">
                                <h1 className="text-l font-semibold text-gray-800">
                                    Name : {value.name}
                                </h1>
                                <div className="flex items-center mt-4 text-gray-900">
                                    <svg
                                        class="icon icon-phone"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24">
                                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                    </svg>
                                    <h1 className="px-2 text-sm">
                                        {value.number}
                                    </h1>
                                </div>
                                <div className="flex items-center mt-4 text-gray-900">
                                    <h1 className="px-2 text-sm">
                                        Age : {value.age}
                                    </h1>
                                </div>
                                <div className="flex items-center mt-4 text-gray-900">
                                    <h1 className="px-2 text-sm">
                                        Gender : {value.gender}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default GuestDetails;
