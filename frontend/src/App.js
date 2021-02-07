import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Auth from './components/Auth/Auth';
import useToken from './useToken';
import { getToken, removeUserSession, setUserSession } from './utils/common';


// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   // return userToken?.token
//   return userToken
// }

function App() {
  // const { token, setToken } = useToken();
  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
  }, []);

  //if no token redirect to auth login
  // if(!token) {
  //   return <Auth setToken={setToken} />
  // }

  return (
    <div className="wrapper">
      <h1>Live User Dashboard</h1>
      <Router>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/auth" component={Auth} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
