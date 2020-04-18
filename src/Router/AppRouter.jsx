import React from 'react';
import { useRoutes,useRedirect } from 'hookrouter';
import NavBar from '../components/Navbars/NavBar';

const routes = {
	'/': () => <div className='h-screen flex justify-center py-16'>Home</div>,
	// "/hotel/add": () => <AddHotelForm />,
	// "/hotel/:id/room/add":({id})=> <AddRoom id={id}/>,
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
