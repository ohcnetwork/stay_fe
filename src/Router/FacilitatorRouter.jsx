import React from "react";
import { useRoutes, navigate, useRedirect } from "hookrouter";
import NavBar from "../components/Navbars/NavBar";

import Facilitator from "../components/Facilitator/Facilitator";

const routes = {
	"/": () => <Facilitator />,
};

const FacilitatorRouter = () => {
	useRedirect("/login", "/");
	const pages = useRoutes(routes);
	
	return (
		<div className="bg-gray-200">
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

export default FacilitatorRouter;
