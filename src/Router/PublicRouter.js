import React from "react";
import { useRedirect, useRoutes, navigate } from "hookrouter";

import Home from "../Components/Home/Home";
import Login from "../Components/Auth/Login/Login";
import Register from "../Components/Auth/Register/Register";
import Facilitator from "../Components/Facilitator/Facilitator";
import Rooms from "../Components/Rooms/Rooms";
import NotFound from "../Components/NotFound/NotFound";
import User from "../Components/User/User";
const routes = {
  "/": () => <Home />,
  "/rooms": () => <Rooms />,
  "/register": () => <Register />,
  "/user": () => <User />,
  "/login": () => <Login />,
  "/facilitator": () => <Facilitator />,
  "": () => <NotFound />,
};
const PublicRouter = () => {
  const pages = useRoutes(routes);
  return <div>{pages}</div>;
};

export default PublicRouter;
