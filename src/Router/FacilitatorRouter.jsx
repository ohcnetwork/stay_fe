import React from "react";
import { useRoutes, useRedirect } from "hookrouter";
import FacilitatorNavBar from "../components/Navbars/FacilitatorNavBar";

import Facilitator from "../components/Facilitator/Facilitator";
import FacilitatorViewHotel from "../components/Facilitator/FacilitatorViewHotel";
import ViewBookings from "../components/Facilitator/ViewBookings";
import AddHotelForm from "../components/Facilitator/AddHotelForm";
import EditHotel from "../components/Facilitator/EditHotel";
import AddRoom from "../components/Facilitator/AddRoom";

const routes = {
	"/": () => <Facilitator />,
	"/hotel/add": () => <AddHotelForm />,
	"/hotel/:id": ({ id }) => <FacilitatorViewHotel id={id} />,
	"/hotel/:id/room/add": ({ id }) => <AddRoom id={id} />,
	"/hotel/:id/edit": ({ id }) => <EditHotel id={id} />,
	"/hotel/:id/bookings": ({ id }) => <ViewBookings id={id} />,
};

const FacilitatorRouter = () => {
	useRedirect("/login", "/");
	const pages = useRoutes(routes);
	
	return (
		<div className="bg-gray-200">
			<FacilitatorNavBar />
			{pages}
			{!pages && (
				<div className="h-screen flex justify-center py-16">
					Error 404: Page not found
				</div>
			)}
		</div>
	);
};

export default FacilitatorRouter;
