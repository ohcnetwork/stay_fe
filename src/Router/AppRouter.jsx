
import React from 'react';
import { useRoutes,useRedirect } from 'hookrouter';
import NavBar from '../components/Navbars/NavBar';

import UserDashboard from "../components/Dashboard/Userdashboard/UserDashboard";
import UserEdit from "../components/Dashboard/Userdashboard/UserEdit";
import History from "../components/BookingHistory/History";
import Hotel from "../components/Browse/Hotel";
import ViewRoom from "../components/Room/ViewRoom";
import BrowseRooms from "../components/Browse/BrowseRooms";

const routes = {

  "/": () => <UserDashboard />,
  "/edit": () => <UserEdit />,
  "/history": () => <History />,
  "/room/:id": ({ id }) => <ViewRoom id={id} />,
  "/roomlist/:id": ({ id }) => <BrowseRooms id={id} />,
  "/browse": () => <Hotel />,

};

const AppRouter = () => {
  useRedirect("/login", "/");
  const pages = useRoutes(routes);

  return (
    <div className="bg-white">
      <NavBar />
      {pages}
      {!pages && (
        <div className="h-screen flex justify-center py-16">
          Error 404: Page not found
        </div>
      )}
    </div>
  );
};

export default AppRouter;
