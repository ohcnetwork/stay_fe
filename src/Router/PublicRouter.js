import React from "react";
import { useRoutes } from "hookrouter";

import Home from "../Components/Home/Home";
import Login from "../Components/Auth/Login/Login";
import Register from "../Components/Auth/Register/Register";
import Rooms from "../Components/Rooms/Rooms";
import NotFound from "../Components/NotFound/NotFound";

import Navbar from "../Components/Common/Navbar/Navbar";

const routes = {
  "/": () => <Home />,
  "/register": () => <Register />,
  "/login": () => <Login />,
  "/rooms": () => <Rooms />,
  "*": () => <NotFound />
};
const PublicRouter = () => {
  const page = useRoutes(routes) || <Home />;
  return (
      <div>
        <Navbar type="public" />
        <main>
          {page}
        </main>
      </div>
    );
};

export default PublicRouter;
