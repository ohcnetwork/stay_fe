import React, { Component } from "react";
import defaultBcg from "../../Common/images/room-1.jpeg";
import { Link } from "react-router-dom";
import { RoomContext } from "../Context/context";
import Form from './Form';

export default class SingleRoom extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg: defaultBcg
    };
  }
  static contextType = RoomContext;

  // componentDidMount() {
  //   console.log(this.props);
  // }
  render() {
    const { getID } = this.context;
    const k = getID(this.state.slug);
    console.log(k);


    const room1 = getID(this.state.slug);
    //var room1=this.state.slug;

    if (!room1) {
      return (
        <div className="error">
          <h3> no such Book could be found...</h3>
          <Link to="/rooms" className="btn-primary">
            back to rooms
          </Link>
        </div>
      );
    }
    const {
        name,
        description,
        capacity,
        size,
        price,
        extras,
        breakfast,
        pets,
        images
      } = room1;

    return (
      <>
        <div className="x1">
        <h2>{name}</h2>
        <h3>Rs {price}</h3>
        </div>
        <Form/>
      </>
    );
  }
}
