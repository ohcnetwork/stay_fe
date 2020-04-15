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
    <article className="room">
      <div className="img-container">
        <img src={images[0] || defaultImg} alt="single room" />
        <div className="price-top">
          <h6>Rs {price}</h6>
          <p>per night</p>
        </div>
        <A href={`/rooms/${slug}`} className="btn-primary room-link">
          features
        </A>
      </div>
      <p className="room-info">{hname} {name}</p>
    </article>
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
