import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";

import Loading from "./Components/Common/Loading/Loading";

// import Home from "./Components/Home/Home";
// import Login from "./Components/Auth/Login/Login";
// import Register from "./Components/Auth/Register/Register";
// import User from "./Components/User/User";
// import Facilitator from "./Components/Facilitator/Facilitator";
// import Rooms from "./Components/Rooms/Rooms";
// import NotFound from "./Components/NotFound/NotFound";

import { userActions, appStateActions } from "./redux/actions";
import PublicRouter from "./Router/PublicRouter";
import AppRouter from "./Router/AppRouter";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.appState.isLoading);
  const loggedInUser = useSelector(state => state.user);
  console.log(`app.js: loading(${isLoading})`);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      console.log("app.js: a user had already logged in", loggedInUser);
      dispatch(userActions.login(loggedInUser));
    } else {
      console.log("app.js: not logged in");
    }
    dispatch(appStateActions.setLoading(false));
  }, [dispatch]);

  return (
    <div className="app">
      <Loading />
        {
          loggedInUser
          ?
            <AppRouter />
          :
            <PublicRouter />
        }
    </div>
  );
}

export default App;
