import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';

import Navbar from './components/Navbar/Navbar';
import Loading from './components/Loading/Loading';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import User from './pages/User/User';
import Facilitator from './pages/Facilitator/Facilitator';
import Rooms from './pages/Rooms/Rooms';
import NotFound from './pages/NotFound/NotFound';

import { userActions, appStateActions } from './redux/actions';

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
              <Route path="/about" exact component={About} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/user" exact component={User} />
              <Route path="/facilitator" exact component={Facilitator} />
              <Route path="/rooms" exact component={Rooms} />
              <Route component={NotFound} />
            </Switch>
          </main>
      </Router>
    </div>
  );
}

export default App;
