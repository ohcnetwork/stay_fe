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

    "/room/:category/:id": ({ category, id }) => (
        <ViewRoom category={category} id={id} />
    ),
    "/roomlist/:id": ({ id }) => <BrowseRooms id={id} />,
};

const AppRouter = () => {
    useRedirect("/login", "/");
    const pages = useRoutes(routes);

    return (
        <div className="relative bg-gray-200 min-h-screen pb-24">
            <UserNavBar />
            {pages}
            {!pages && (
                <div className="flex justify-center py-16">
                    Error 404: Page not found
                </div>
            )}
            <Footer />
        </div>
    );
};

export default AppRouter;
