import React from "react";
import { useRoutes, useRedirect } from "hookrouter";
import FacilitatorNavBar from "../components/Navbars/FacilitatorNavBar";
import UserEdit from "../components/Dashboard/Userdashboard/UserEdit";
import Facilitator from "../components/Facilitator/Facilitator";
import FacilitatorViewHotel from "../components/Facilitator/FacilitatorViewHotel";
import ViewBookings from "../components/Facilitator/ViewBookings";
import AddHotelForm from "../components/Facilitator/AddHotelForm";
import EditHotel from "../components/Facilitator/EditHotel";
import AddRoom from "../components/Facilitator/AddRoom";
import Footer from "../components/common/Footer";

const routes = {
    "/": () => <Facilitator from={""} />,
    "/room/:id/:id": () => <Facilitator from={"booking_page"} />,
    "/hotel/add": () => <AddHotelForm />,
    "/hotel/:id": ({ id }) => <FacilitatorViewHotel id={id} />,
    "/hotel/:id/room/add": ({ id }) => <AddRoom id={id} />,
    "/hotel/:id/edit": ({ id }) => <EditHotel id={id} />,
    "/hotel/:id/bookings": ({ id }) => <ViewBookings id={id} />,
    "/edit": () => <UserEdit />,
};

const FacilitatorRouter = () => {
    useRedirect("/login", "/");
    const pages = useRoutes(routes);

    return (
        <div className="relative bg-gray-200 min-h-screen pb-24">
            <FacilitatorNavBar />
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

export default FacilitatorRouter;
