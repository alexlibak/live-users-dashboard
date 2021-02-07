import React, { useState } from 'react';
import { removeUserSession } from '../../utils/common';

const Dashboard = (props) => {

  const handleLogout = () => {
    removeUserSession();
    props.history.push('/auth');
  }

  return(
    <div className="dashboard-wrapper">
      <h2>Dashboard</h2>
        <div className="welcome">
          <h2>Welcome,  <span>[user.name]</span></h2>
          <h2>Status: {props.loggedInStatus}</h2>

          <div className="btn-wrapper">
            <button>Add New Post</button>
            <button onClick={handleLogout}>Logout</button>
          </div>

            {/* posts */}

        </div>
    </div>
  );
}

export default Dashboard;