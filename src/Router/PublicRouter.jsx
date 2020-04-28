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
import Footer from "../components/common/Footer";
const routes = {
    "/": () => <LandingPage />,
    "/login": () => <Login />,
    "/facilitator-register": () => <FacilitatorRegister />,
    "/user-register": () => <UserRegister />,
    "/room/:category/:id": ({ category, id }) => (
        <ViewRoom category={category} id={id} />
    ),
    "/roomlist/:id": ({ id }) => <BrowseRooms id={id} />,
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
            <Footer signUp={true} />
        </div>
    );
};

export default PublicRouter;
