import React, { useState } from "react";
import { A, navigate } from "hookrouter";

export default function NavBar({ links, logout }) {
  const [shown, setShown] = useState(false);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-indigo-700">
      <div className="flex items-center flex-shrink-0 text-white mr-6 py-6 pl-6">
        {/* <svg
                    className="fill-current h-8 w-8 mr-2"
                    width="54"
                    height="54"
                    viewBox="0 0 54 54"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
                </svg> */}
        {/* <i class="fas fa-house-user"></i> */}
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="house-user"
          class="svg-inline--fa fa-house-user h-8 w-8 mr-2"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            fill="currentColor"
            d="M570.69,236.27,512,184.44V48a16,16,0,0,0-16-16H432a16,16,0,0,0-16,16V99.67L314.78,10.3C308.5,4.61,296.53,0,288,0s-20.46,4.61-26.74,10.3l-256,226A18.27,18.27,0,0,0,0,248.2a18.64,18.64,0,0,0,4.09,10.71L25.5,282.7a21.14,21.14,0,0,0,12,5.3,21.67,21.67,0,0,0,10.69-4.11l15.9-14V480a32,32,0,0,0,32,32H480a32,32,0,0,0,32-32V269.88l15.91,14A21.94,21.94,0,0,0,538.63,288a20.89,20.89,0,0,0,11.87-5.31l21.41-23.81A21.64,21.64,0,0,0,576,248.19,21,21,0,0,0,570.69,236.27ZM288,176a64,64,0,1,1-64,64A64,64,0,0,1,288,176ZM400,448H176a16,16,0,0,1-16-16,96,96,0,0,1,96-96h64a96,96,0,0,1,96,96A16,16,0,0,1,400,448Z"
          ></path>
        </svg>
        <span className="font-semibold text-xl ml-1 tracking-tight">
          Quarantine Stay
        </span>
      </div>
      <div className="block lg:hidden py-6 pr-6">
        <button
          onClick={() => setShown(!shown)}
          className="flex items-center px-3 py-2 border rounded text-indigo-200 border-indigo-400 hover:text-white hover:border-white"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full ${
          shown ? "block" : "hidden"
        } flex-grow lg:flex lg:items-center lg:w-auto lg:justify-center lg:bg-indigo-700 bg-indigo-600 pb-6 lg:p-6`}
      >
        <div className="text-sm lg:flex-grow flex flex-col lg:flex-row">
          {links &&
            links.map((el) => (
              <A
                key={el.title}
                onClick={() => setShown(!shown)}
                className="block lg:inline-block lg:mt-0 text-gray-200 hover:text-white pr-20 lg:px-4 py-2 text-right lg:text-left lg:hover:bg-indigo-700 hover:bg-indigo-500"
                href={el.link}
              >
                {el.title}
              </A>
            ))}
        </div>
        <div className="flex justify-end">
          {logout && (
            <A
              href="#"
              className="mr-16 lg:mr-0 inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              onClick={(e) => {
                e.preventDefault();
                localStorage.setItem("stay_access_token", "");
                navigate("/");
                window.location.reload();
              }}
            >
              Logout
            </A>
          )}
        </div>
      </div>
    </nav>
  );
}
