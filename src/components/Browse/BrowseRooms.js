import React from "react";

export default function ViewRoom() {
  return(
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
        <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div className="flex-shrink-0">
              <img className="h-48 w-full object-cover" src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80" alt="" />
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
              <div className="flex-1">
                <p className="text-sm leading-5 font-medium text-indigo-600">
                  <span>
                    One Star
                  </span>
                </p>
                <a href="#" className="block">
                  <h3 className="mt-2 text-base leading-7 font-semibold text-gray-900">
                    Basic Lodge
                  </h3>
                  <p className="mt-3 text-xl leading-6 text-gray-500">
                    Rs. 18,000
                  </p>
                </a>
              </div>
              <div className="mt-6 flex items-center">
                <div className="ml-3">
                  <p className="text-sm leading-5 font-medium text-gray-900">
                    <a href="#" className="hover:underline">
                      Roel Aufderhar
                    </a>
                  </p>
                  <div className="flex text-sm leading-5 text-gray-500">
                    <time datetime="2020-03-16">
                      Mar 16, 2020
                    </time>
                    <span className="mx-1">
                      &middot;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div className="flex-shrink-0">
              <img className="h-48 w-full object-cover" src="https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80" alt="" />
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
              <div className="flex-1">
                <p className="text-sm leading-5 font-medium text-indigo-600">
                  <span>
                    Video
                  </span>
                </p>
                <a href="#" className="block">
                  <h3 className="mt-2 text-basel leading-7 font-semibold text-gray-900">
                    Some Random Hotel
                  </h3>
                  <h2 className="mt-3 text-xl leading-6 text-gray-500">
                    Rs. 48,000
                  </h2>
                </a>
              </div>
              <div className="mt-6 flex items-center">
                <div className="ml-3">
                  <p className="text-sm leading-5 font-medium text-gray-900">
                    <a href="#" className="hover:underline">
                      Brenna Goyette
                    </a>
                  </p>
                  <div className="flex text-sm leading-5 text-gray-500">
                    <time datetime="2020-03-16">
                      Mar 16, 2020
                    </time>
                    <span className="mx-1">
                      &middot;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div className="flex-shrink-0">
              <img className="h-48 w-full object-cover" src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80" alt="" />
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
              <div className="flex-1">
                <p className="text-sm leading-5 font-medium text-indigo-600">
                  <span> 7 Star</span>
                </p>
                <a href="#" className="block">
                  <h3 className="mt-2 text-base leading-7 font-semibold text-gray-900">
                    Le Meridien Hotel
                  </h3>
                  <h2 className="mt-3 text-xl leading-6 text-gray-500">
                    Rs. 48,000
                  </h2>
                </a>
              </div>
              <div className="mt-6 flex items-center">
                <div className="ml-3">
                  <p className="text-sm leading-5 font-medium text-gray-900">
                    <a href="#" className="hover:underline">
                      Daniela Metz
                    </a>
                  </p>
                  <div className="flex text-sm leading-5 text-gray-500">
                    <time datetime="2020-03-16">
                      Mar 16, 2020
                    </time>
                    <span className="mx-1">
                      &middot;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
