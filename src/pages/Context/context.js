import React, { Component } from "react";
import items from "./Room_data";
import Hotel_data from "./Hotel_data";
var globe;

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
    let hotels = this.formatData(Hotel_data);

    let rooms = this.formatData(items);

    let featuredRooms = rooms.filter(room => room.featured === true);
    //
    let maxPrice = Math.max(...rooms.map(item => item.price));
    let maxSize = Math.max(...rooms.map(item => item.size));
 

    
    this.setState({
      rooms,
      hotels,
      featuredRooms,
      sortedRooms: rooms,
      sortedHotels:hotels,
      loading: false,
      pri:0,
      //
      bk:"",
      price: maxPrice,
      maxPrice,
      maxSize,
    });
    for(var i=0;i<hotels.length;i++){
      for(var j=0;j<rooms.length;j++){
        if(hotels[i].id === rooms[j].hid){
            rooms[j].hname = hotels[i].name;
        }
      }
    }
   // rooms[0].rooms.hname="sasi";
    console.log(rooms);
  }
  
  formatData(items) {
    //let hotels = this.formatData(Hotel_data);

    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }
  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    globe=room;
    return room;
  };
  getID = slug => { 
    return globe;
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
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets,
      location,
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
          getID:this.getID,
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
