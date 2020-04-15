import React from "react";
import { useRoutes } from "hookrouter";

import Home from "../Components/Home/Home";
import Login from "../Components/Auth/Login/Login";
import Register from "../Components/Auth/Register/Register";
import Rooms from "../Components/Rooms/Rooms";
import NotFound from "../Components/NotFound/NotFound";
import SingleRoom from "../Components/Rooms/SingleRoom";
import Book from '../Components/Booking/Booking'
import Navbar from "../Components/Common/Navbar/Navbar";

const routes = {
  "/": () => <Home />,
  "/register": () => <Register />,
  "/login": () => <Login />,
  "/rooms": () => <Rooms />,
  "/rooms/:slug": ({ slug }) => <SingleRoom slug={slug} />,
  "/rooms/book/:id": ({ id }) => <Book id={id} />,
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
