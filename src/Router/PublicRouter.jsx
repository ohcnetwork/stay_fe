import React from "react";
import { useRedirect, useRoutes, navigate } from "hookrouter";
import PublicNavBar from "../components/Navbars/PublicNavBar";
import Login from "../components/Account/Login";
// import Hotel from "../components/Browse/Hotel";
import ViewRoom from "../components/Room/ViewRoom";
import BrowseRooms from "../components/Browse/BrowseRooms";
import ForgotPassword from "../components/Account/ForgotPassword";
import ResetPassword from "../components/Account/ResetPassword";
import UserRegister from "../components/Account/UserRegister";
import FacilitatorRegister from "../components/Account/FacilitatorRegister";
import LandingPage from "../components/common/LandingPage";
const routes = {
    "/": () => <LandingPage />,
    "/login": () => <Login />,
    "/facilitator-register": () => <FacilitatorRegister />,
    "/user-register": () => <UserRegister />,
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
    "/forgot-password": () => <ForgotPassword />,
    "/reset-password/:token": ({ token }) => <ResetPassword token={token} />,
};

const PublicRouter = () => {
    // useRedirect("/", "/login");
    const pages = useRoutes(routes);
    !pages && navigate("/");
    return (
        <div>
            {/* public navbar can go here */}
            <PublicNavBar />
            {pages}
            {!pages && (
                <div className="h-screen flex justify-center py-16">
                    Error 404: Page not found
                </div>
            )}
        </div>
    );
};

export default PublicRouter;
