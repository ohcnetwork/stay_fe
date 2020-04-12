import React, { Component } from "react";
import items from "./data";
import custom from "./custom";

const RoomContext = React.createContext();
export default class RoomProvider extends Component {
  state = {
    rooms: [],
    hotels:[],
    sortedRooms: [],
    sortedHotels:[],
    featuredRooms: [],
    loading: true,
    
    location:"all",
    type: "all",
    capacity: 1,
    price: 0,
    hid:"po",
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  };


  componentDidMount() {
    // this.getData();
    let rooms = this.formatData(items);
    let hotels = this.formatData(custom);

    let featuredRooms = rooms.filter(room => room.featured === true);
    //
    let maxPrice = Math.max(...rooms.map(item => item.price));
    let maxSize = Math.max(...rooms.map(item => item.size));
    let location = Math.max(...rooms.map(item => item.location));
    let hotelid = Math.max(...rooms.map(item => item.hid));
    
    this.setState({
      rooms,
      hotels,
      featuredRooms,
      sortedRooms: rooms,
      sortedHotels:hotels,
      loading: false,
      hotelid1:hotelid,
      //
      price: maxPrice,
      maxPrice,
      maxSize,
    });
  }
  

  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;
    //  console.log(id);
      let images = item.fields.images.map(image => image.fields.file.url);

      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }
  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    return room;
  };
  getHotel = slugh => {
    let tempHotels = [...this.state.hotels];
    const cus = tempHotels.find(cus => cus.slugh === slugh);
    return cus;
  };
  
  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    
    console.log(name, value );

    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };
  filterRooms = () => {
    let {
      rooms,
      hotels,
      slugh,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets,
      location,
      slug,
      hid
    } = this.state;


    let tempRooms = [...rooms];
    let tempHotels=[...hotels];
    // transform values
    // get capacity
    capacity = parseInt(capacity);
    price = parseInt(price);
    // filter by type
 
    if (type !== "all") {
    
      tempRooms = tempRooms.filter(room => room.type === type);
    
    }
    if(type !== "all"){
      hid="h2";
     tempRooms=tempRooms.filter(hotels => hotels.hid === hid);
    }

    if(location !== "all"){
      tempRooms = tempRooms.filter(room => room.location === location);

    }
    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }
    // filter by price
    tempRooms = tempRooms.filter(room => room.price <= price);
    //filter by size
    tempRooms = tempRooms.filter(
      room => room.size >= minSize && room.size <= maxSize
    );
    //filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }
    //filter by pets
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true);
    }
    this.setState({
      sortedRooms: tempRooms,
      sortedHotels:tempHotels
    });
  };
  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom ,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}
const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}
