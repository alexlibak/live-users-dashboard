import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Auth from './components/Auth/Auth';
import Post from './components/Post/Post';
import { getToken, removeUserSession, setUserSession } from './utils/common';


function App() {

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
      // return <Auth setToken={setToken} />
    }
  }, []);


  return (
    <div className="wrapper">
      <Router>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/auth" component={Auth} />
          <Route path="/createpost" component={Post} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
