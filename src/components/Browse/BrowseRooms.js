import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRoomByHotelid } from "../../Redux/actions";
import { A } from "hookrouter";

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
    dispatch(getRoomByHotelid(id)).then((res) => {
      // sethname(res.data);
      let sortedlist = Array.from(
        new Set(res.data.data.map((details) => details.category))
      ).map((category) => {
        return res.data.data.find((details) => details.category === category);
      });
      setsortedrooms(sortedlist);
      console.log(sortedlist);
    });
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
                      src="data:image/jpeg;base64,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"
                      alt=""
                    />
                  </div>
                  <A
                    href={`/room/${item.category}/${dates.checkin}/${dates.checkout}`}
                    className="block"
                  >
                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <p className="text-sm leading-5 font-medium text-indigo-600">
                          <span>
                            {item.category}
                            {item.id}
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
