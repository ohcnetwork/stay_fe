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
        <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          {sortedrooms &&
            sortedrooms.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="h-48 w-full object-cover"
                      src={DEFAULT_IMAGE.ROOM}
                      alt={item.title}
                    />
                  </div>
                  <A
                    href={`/room/${id}/${item.category}/${dates.checkin}/${dates.checkout}`}
                    className="block"
                  >
                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <p className="text-sm leading-5 font-medium text-indigo-600">
                          <span>
                            {item.category}
                            {/* {item.id} */}
                          </span>
                        </p>

                        <h3 className="mt-2 text-base leading-7 font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-xl leading-6 text-gray-500">
                          Rs. {item.cost}
                        </p>
                      </div>
                    </div>
                  </A>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
export default BrowseRooms;
