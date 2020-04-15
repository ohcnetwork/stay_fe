import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import './Index.css';

import Navbar from './Components/Common/Navbar/Navbar';
import Loading from './Components/Common/Loading/Loading';

import Home from './Components/Home/Home';
import Login from './Components/Auth/Login/Login';
import Register from './Components/Auth/Register/Register'; 
import User from './Components/User/User';
import Facilitator from './Components/Facilitator/Facilitator';
import Rooms from './Components/Rooms/Rooms';
import NotFound from './Components/NotFound/NotFound';
import SingleRoom from "./Components/Rooms/SingleRoom";
import Book from "./Components/Book/Book";

import { userActions, appStateActions } from './Redux/actions';

function App() {
  
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.appState.isLoading);
  console.log(`app.js: loading(${isLoading})`)
  
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      console.log('app.js: a user had already logged in', loggedInUser);
      dispatch(userActions.login(loggedInUser));
    } else {
      console.log('app.js: not logged in');
    }
    dispatch(appStateActions.setLoading(false));
  }, [dispatch])

  return (
    <div className="app">
      <Loading />
      <Router>
          <Navbar />
          <main>
            <Switch>  
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/user" exact component={User} />
              <Route path="/facilitator" exact component={Facilitator} />
              <Route path="/rooms" exact component={Rooms} />
              <Route path="/rooms/:slug" component={SingleRoom} /> 
              <Route path="/:slug/book" component={Book} /> 
              <Route component={NotFound} />
            </Switch>
          </main>
      </Router>
    </div>
  );
}

export default App;
