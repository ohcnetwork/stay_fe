import React from 'react';
import { useRoutes,useRedirect } from 'hookrouter';
import NavBar from '../components/Navbars/NavBar';
import AddHotelForm from "../components/Facilitator/AddHotelForm";
import AddRoom from "../components/Facilitator/AddRoom";
const routes = {
	'/': () => <div className='h-screen flex justify-center py-16'>Home</div>,
	"/add-hotel": () => <AddHotelForm />,
	"/add-room/:id":({id})=> <AddRoom id={id}/>,
};

const AppRouter = () => {
	useRedirect("/login", "/");
	const pages = useRoutes(routes);
	
	return (
		<div className="bg-gray-200">
			<NavBar />
			{pages}
			{!pages && (
				<div className='h-screen flex justify-center py-16'>
					Error 404: Page not found
				</div>
			)}
		</div>
	);
};

export default AppRouter;
