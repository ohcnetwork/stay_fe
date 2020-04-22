import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getHotelList } from "../../Redux/actions";
import { A, navigate } from "hookrouter";
import { DEFAULT_IMAGE } from "../../Common/constants";

function BrowseRooms({ id, startdate, enddate }) {
  // for dates
  const [dates, setdates] = useState({
    checkin: startdate,
    checkout: enddate,
  });
  const [sortedrooms, setsortedrooms] = useState(false);
  // const [hname, sethname] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isNaN(new Date(startdate).getTime()) || isNaN(new Date(enddate).getTime()) || isNaN(id)) {
      navigate('/browse')
    }
    else {
      const body = {
        hotelid: id,
        checkin: dates.checkin,
        checkout: dates.checkout,
        type: "room"
      };
      dispatch(getHotelList(body)).then(res => {
        // sethname(res.data);
        let sortedlist = Array.from(
          new Set(res.data.map((details) => details.category))
        ).map((category) => {
          return res.data.find((details) => details.category === category);
        });
        setsortedrooms(sortedlist);
        console.log(sortedlist);
      });
    }

  }, []);

  if (sortedrooms && { sortedrooms } === null) {
    return (
      <div className="empty-search">
        <h3>unfortunately no rooms available in this hotel...!</h3>
      </div>
    );
  }
  console.log("new data:", sortedrooms);
  return (
    <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8 max-w-6xl mx-auto">
      {/* dates */}
      {/* Checkin date: {dates.checkin} */}
      <br />
      {/* Checkout date: {dates.checkout} */}
      <div className="absolute inset-0">
        <div className="bg-white h-1/3 sm:h-2/3"></div>
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            Rooms
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
            Select a room that fits your needs and your budget
          </p>
        </div>
        <div className="p-5 flex flex-wrap justify-center md:justify-start">
          {sortedrooms &&
            sortedrooms.map((r) => {
              return (
                <div key={r.id} className="md:w-1/2 lg:w-1/3">
                  <div key={r.title} className="mx-5 my-5 flex flex-col shadow-lg rounded">
                    <A
                      href={`/room/${id}/${r.category}/${dates.checkin}/${dates.checkout}`}
                      className="block"
                    >
                      <div className="">
                        <img alt={r.title} className="w-full rounded" src={DEFAULT_IMAGE.ROOM} />
                      </div>
                      <div className="py-3 px-3">
                        <div className="flex flex-wrap items-center justify-between">
                          <div className="text-gray-800 text-lg uppercase font-medium">
                            {r.title}
                          </div>
                          <div className="flex items-center">
                            <div className="text-xs px-2 bg-black text-white rounded font-bold uppercase tracking-wide text-center">
                              {r.category}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap pb-3">
                          {
                            r.features.split(",").map(el => (
                              <div key={el} className="text-xs text-gray-900 mr-2 bg-gray-400 px-2 rounded tracking-wide">{el.replace("_", " ")}</div>
                            ))
                          }
                        </div>
                        <div className="text-gray-600 pb">
                          {r.description}
                        </div>
                        <div className="flex flex-wrap items-center justify-between border-b pb-3">
                          <div className="text-gray-800">
                            Beds: {r.beds}
                          </div>
                          <div className="flex items-center ml-2">
                            <div className="text-2xl text-gray-900 font-bold tracking-wide flex">
                              <svg className="w-4 h-4 mt-2 fill-current" viewBox="39.5 -0.5 169.756 250">
                                <path d="M152.511,23.119h41.031L209.256-0.5H55.214L39.5,23.119h26.739c27.086,0,52.084,2.092,62.081,24.743H55.214 L39.5,71.482h91.769c-0.002,0.053-0.002,0.102-0.002,0.155c0,16.974-14.106,43.01-60.685,43.01l-22.537-0.026l0.025,22.068 L138.329,249.5h40.195l-93.42-116.709c38.456-2.074,74.523-23.563,79.722-61.309h28.716l15.714-23.62h-44.84 C162.606,38.761,158.674,29.958,152.511,23.119z" />
                              </svg>
                              {r.cost}
                            </div>
                          </div>
                        </div>

                      </div>
                    </A>
                  </div>
                </div>

              );
            })}
        </div>
      </div>
    </div>
  );
}
export default BrowseRooms;
