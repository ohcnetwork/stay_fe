import React from 'react';
import { useRoutes,useRedirect } from 'hookrouter';
import NavBar from '../components/Navbars/NavBar';
import UserDashboard from "../components/Dashboard/Userdashboard/UserDashboard";
import UserEdit from '../components/Dashboard/Userdashboard/UserEdit';
import History from "../components/BookingHistory/History";




const routes = {
	"/" :() => <UserDashboard/>,
	"/edit" :() => <UserEdit/>,
	"/history": () => <History/>,
};

const AppRouter = () => {
	useRedirect("/login", "/");
	const pages = useRoutes(routes);
	
	return (
		<div className="bg-white">
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
