import React from "react";
import { useRedirect, useRoutes, navigate } from "hookrouter";
import PublicNavBar from "../components/Navbars/PublicNavBar";
import Login from "../components/Account/Login";
import Register from "../components/Account/Register";
import HotelContainer from '../components/Browse/HotelContainer';
import ViewRoom from "../components/Room/ViewRoom";
import BrowseRooms from "../components/Browse/BrowseRooms";
import History from "../components/BookingHistory/History";
import AddHotelForm from "../components/Facilitator/AddHotelForm";
import AddRoom from "../components/Facilitator/AddRoom";

const routes = {
  "/login": () => <Login />,
  "/register": () => <Register />,
  // "/room": () => <HotelContainer />,
  "/room/:slug": ({ slug }) => <ViewRoom slug={slug} />,
  "/browse": () => <BrowseRooms />,
  "/facilitator": () => <AddHotelForm />,
  "/add-room":()=> <AddRoom/>,
  "/history": () => <History />
};

const PublicRouter = () => {
    useRedirect("/", "/login");
    const pages = useRoutes(routes)
    !pages && navigate("/");
    return (
        <div>
            {/* public navbar can go here */}
            <PublicNavBar />
            {pages}
            {!pages && (
				<div className='h-screen flex justify-center py-16'>
					Error 404: Page not found
				</div>
			)}
        </div>
    )
}


export default PublicRouter;
