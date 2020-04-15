import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import './Index.css';
import PublicRouter from "./Router/PublicRouter";
import AppRouter from "./Router/AppRouter";
import { userActions, appStateActions } from "./redux/actions";
import Loading from "./Components/Common/Loading/Loading";
import "./App.css";
import { BASE_URL } from "./Common/constants";
import api from "./Common/api";

function App() {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.appState.isLoading);
    const loggedInUser = useSelector(state => state.user);

    console.log(`app.js: loading(${isLoading})`);

    useEffect(() => {
        const access_token = localStorage.getItem("stay_access_token");
        if (access_token && !loggedInUser) {
            console.log("app.js: access_token found");
            let apiObj = api.getCurrentUser;
            let config = { headers: { Authorization: `Bearer ${access_token}` } };
            axios[apiObj.method.toLowerCase()](`${BASE_URL}${apiObj.path}`, config)
                .then(res => {
                    localStorage.setItem("stay_access_token", access_token);
                    if (res.data && res.data.data) {
                        let { id, name, email, type } = res.data.data;
                        dispatch(userActions.login({ id, name, email, type }));
                        console.log("app.js: a user had already logged in", loggedInUser);
                    } else {
                        console.log("app.js:", res);
                        localStorage.removeItem("stay_access_token");
                    }
                })
                .catch(err => {
                    console.log(err);
                    localStorage.removeItem("stay_access_token");
                })
                .finally(() => dispatch(appStateActions.setLoading(false)));
        } else {
            console.log("app.js: not logged in");
            dispatch(appStateActions.setLoading(false));
        }
    }, [dispatch, loggedInUser]);

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
