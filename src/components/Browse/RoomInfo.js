import React from "react";
import { A } from "hookrouter";
import defaultImg from "../../Common/dataImages/room-1.jpeg";
import PropTypes from "prop-types";
import { memo } from "react";
const Room = memo(({ room }) => {
  const { name, slug, images, price, hname } = room;
  //const { hn } = hotname;
  console.log(hname);
  return (
    // <article className="room">
    //   <div className="img-container">
    //     <img src={images[0] || defaultImg} alt="single room" />
    //     <div className="price-top">
    //       <h6>Rs {price}</h6>
    //       <p>per night</p>
    //     </div>
    //     <A href={`/rooms/${slug}`} className="btn-primary room-link">
    //       features
    //     </A>
    //   </div>
    //   <p className="room-info">{hname} {name}</p>
    // </article>
    <div>
      <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
        <div className="flex-shrink-0">
          <img className="h-48 w-full object-cover" src={images[0] || defaultImg} alt="" />
        </div>
        <div className="flex-1 bg-white p-6 flex flex-col justify-between">
          <div className="flex-1">
            <p className="text-sm leading-5 font-medium text-indigo-600">
              <span>
                One Star
                  </span>
            </p>
            <A href={`/room/${slug}`} className="block">
              <h3 className="mt-2 text-base leading-7 font-semibold text-gray-900">
                Basic Lodge
                  </h3>
              <p className="mt-3 text-xl leading-6 text-gray-500">
                Rs.  {price}
              </p>
            </A>
          </div>
          <div className="mt-6 flex items-center">
            <div className="ml-3">
              <p className="text-sm leading-5 font-medium text-gray-900">
                <A href={`/room/${slug}`} className="hover:underline">
                  {hname}
                </A>
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
  );
});

Room.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    hname: PropTypes.string.isRequired
  })
};
export default Room;
