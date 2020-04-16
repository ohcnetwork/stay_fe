import React from "react";
import { useRedirect, useRoutes, navigate } from "hookrouter";
import PublicNavBar from "../components/Navbars/PublicNavBar";
import Login from "../components/Account/Login";
import Register from "../components/Account/Register";
import ViewRoom from "../components/Room/ViewRoom";
import BrowseRooms from "../components/Browse/BrowseRooms";
import AddHotelForm from "../components/Facilitator/AddHotelForm";

const routes = {
  "/login": () => <Login />,
  "/register": () => <Register />,
  "/room": () => <ViewRoom />,
  "/browse": () => <BrowseRooms />,
  "/facilitator": () => <AddHotelForm />,
};

const PublicRouter = () => {
  useRedirect("/", "/login");
  const pages = useRoutes(routes);
  !pages && navigate("/");
  return (
    <div>
      {/* public navbar can go here */}
      <PublicNavBar />
      {pages}
    </div>
  );
};

export default PublicRouter;
