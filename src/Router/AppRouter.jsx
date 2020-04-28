import React from "react";
import { useRoutes, useRedirect } from "hookrouter";
import UserNavBar from "../components/Navbars/UserNavBar";

import LandingPage from "../components/common/LandingPage";
import UserDashboard from "../components/Dashboard/Userdashboard/UserDashboard";
import UserEdit from "../components/Dashboard/Userdashboard/UserEdit";
import History from "../components/BookingHistory/History";
import ViewRoom from "../components/Room/ViewRoom";
import BrowseRooms from "../components/Browse/BrowseRooms";
import Footer from "../components/common/Footer";

const routes = {
    "/": () => <LandingPage />,
    "/profile": () => <UserDashboard />,
    "/edit": () => <UserEdit />,
    "/history": () => <History />,

    "/room/:category/:id/:startdate/:enddate": ({
        category,
        id,
        startdate,
        enddate,
    }) => (
        <ViewRoom
            category={category}
            id={id}
            startdate={startdate}
            enddate={enddate}
        />
    ),
    "/roomlist/:id/:startdate/:enddate": ({ id, startdate, enddate }) => (
        <BrowseRooms id={id} startdate={startdate} enddate={enddate} />
    ),
};

const AppRouter = () => {
    useRedirect("/login", "/");
    const pages = useRoutes(routes);

    return (
        <div className="bg-white">
            <UserNavBar />
            {pages}
            {!pages && (
                <div className="h-screen flex justify-center py-16">
                    Error 404: Page not found
                </div>
            )}
            <Footer />
        </div>
    );
};

export default AppRouter;
