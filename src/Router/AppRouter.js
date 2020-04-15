import React from "react";
import { useRoutes, useRedirect } from "hookrouter";

import User from "../Components/User/User";
import Rooms from "../Components/Rooms/Rooms";
import Facilitator from "../Components/Facilitator/Facilitator";
import NotFound from "../Components/NotFound/NotFound";
import SingleRoom from "../Components/Rooms/SingleRoom";
import Book from '../Components/Booking/Booking'
import Navbar from "../Components/Common/Navbar/Navbar";

const routes = {
  "/user": () => <User />,
  "/rooms": () => <Rooms />,
  "/rooms/:slug": ({ slug }) => <SingleRoom slug={slug} />,
  "/rooms/book/:id": ({ id }) => <Book id={id} />,
  "/facilitator": () => <Facilitator />,
  "*": () => <NotFound />
};
const AppRouter = () => {
  useRedirect("/", "/user");
  const page = useRoutes(routes);
  return (
    <div>
      <Navbar type="private" />
      <main>
        {page}
      </main>
    </div>
  );
};

export default AppRouter;