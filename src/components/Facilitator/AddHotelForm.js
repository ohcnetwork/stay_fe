import React from 'react'

export default function AddHotelForm() {
    return (
        <div className="h-screen overflow-hidden flex items-center justify-center bg-gray-400 ">
        <div className="leading-loose">
  <form className="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
    <p className="text-gray-800 font-medium text-center">Hotel information</p>
    <div className="mt-2">
      <label className="block text-sm text-gray-600" for="cus_name">Hotel Name</label>
      <input className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" required="" placeholder="Enter Hotel Name" aria-label="Name"/>
    </div>
    <div className="mt-2">
      <label className="block text-sm text-gray-600" for="cus_name">Address</label>
      <textarea className="form-textarea w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" required="" placeholder="Enter Hotel Address" aria-label="Name"/>
    </div>
    <div className="inline-block mt-2 w-1/2 pr-1">
      <label className="block text-sm text-gray-600 " for="cus_name">Panchayat</label>
      <input className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" required="" placeholder="Enter Panchayat" aria-label="Name"/>
    </div>
    <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
      <label className="block text-sm text-gray-600 " for="cus_name">District</label>
      <input className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" required="" placeholder="Enter District" aria-label="Name"/>
    </div>
    
    <div className="mt-2">
  <label className="block text-sm text-gray-600 " for="cus_name">Star Category</label>

  <div className="flex mb-4 bg-gray-200">
    <label className="inline-flex px-5 items-center">
      <input type="radio" className="form-radio" name="accountType" value="personal"/>
      <span className="ml-2 text-gray-600">1 star</span>
    </label>
    <label className="inline-flex items-center ml-6">
      <input type="radio" className="form-radio" name="accountType" value="busines"/>
      <span className="ml-2  text-gray-600">2 star</span>
    </label>
    <label className="inline-flex items-center ml-6">
      <input type="radio" className="form-radio" name="accountType" value="busines"/>
      <span className="ml-2  text-gray-600">3 star</span>
    </label>
    <label className="inline-flex items-center ml-6">
      <input type="radio" className="form-radio" name="accountType" value="busines"/>
      <span className="ml-2  text-gray-600">4 star</span>
    </label>
    <label className="inline-flex items-center ml-6">
      <input type="radio" className="form-radio" name="accountType" value="busines"/>
      <span className="ml-2  text-gray-600">5 star</span>
    </label>
  </div>
</div>


    <div className="mt-2  ">
    <label className="block text-sm text-gray-600 " for="cus_name">Facilities</label>
    <div className="flex mb-4 bg-gray-200">
            <div className="w-1/4 px-5 py-1 flex items-center">
              <input id="remember_me" type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
              <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-700">
                AC
             </label>
        </div>
        <div className="w-1/4 px-5 flex items-center">
              <input id="remember_me" type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
              <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-700">
                Wifi
             </label>
        </div>
        <div className="w-1/4 px-5 flex items-center">
              <input id="remember_me" type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
              <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-700">
                CCTV
             </label>
        </div>
        <div className="w-1/4 px-5 flex items-center">
              <input id="remember_me" type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
              <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-700">
                Geyser
             </label>
        </div>
    </div>
        
</div>

        {/* File upload */}
    <div className="mt-2">
    <label className="block text-sm text-gray-600 " for="cus_name">Upload photos</label>

    <div class="flex w-full items-center px-5 bg-grey-lighter">
    <label class="w-20 flex flex-col items-center px-1 py-1 bg-white text-blue rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-white">
        <svg class="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <span class="mt-2 text-xs leading-normal">Select a file</span>
        <input type='file' class="hidden" />
    </label>
</div>

    </div>
    <div className="mt-2">
      <label className="block text-sm text-gray-600" for="cus_name">Contact Number</label>
      <input className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" required="" placeholder="Enter Contact Number" aria-label="Name"/>
    </div>

    <div className="mt-2">
      <label className="block text-sm text-gray-600" for="cus_name">Policy</label>
      <textarea className="form-textarea w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" required="" placeholder="Enter Hotel Policies" aria-label="Name"/>
    </div>
   

    
    <div className="mt-4 ">
      <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" type="submit">Submit</button>
    </div>
  </form>
</div>
</div>
    )
}
