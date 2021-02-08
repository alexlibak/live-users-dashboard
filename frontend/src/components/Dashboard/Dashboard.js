import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

import { removeUserSession, getUser } from '../../utils/common';
const BACKEND_AUTH_URI = 'http://127.0.0.1:5505/posts';

async function getPostsByUserId(userId) {
    try {
        const { data: posts } = await axios.get(`${BACKEND_AUTH_URI}/${userId}`);
        console.log('posts- >>>', posts);
        return posts;
    }
    catch(error) {
        console.error(error);
    }
};
   
const Dashboard = (props) => {
  const user = getUser();
  const [posts, setPosts] = useState([]);
  
  useEffect(async () => {
    if(user) {
      const posts = await getPostsByUserId(user?._id);
      setPosts(posts);
    }
  }, []);

  const handleLogout = () => {
    removeUserSession();
    props.history.push('/auth');
  }

  const handleAddNewPost = () => {
    props.history.push('/createpost');
  }

  return(
    <div className="dashboard-wrapper">
      <h2 >Dashboard</h2>
        <div className="welcome">
          <h2 className="title">Welcome, <span>{ user.name }</span></h2>

          <div className="btn-wrapper">
            <button className="btn-dashboard" onClick={handleAddNewPost}>Add New Post</button>
            <button className="btn-dashboard" onClick={handleLogout}>Logout</button>
          </div>

          <div className="posts-wrapper">
            { posts?.map(post => `${post.title}, ${post.text}`).join(', ') }
          </div>

        </div>
    </div>
  );
}

export default Dashboard;