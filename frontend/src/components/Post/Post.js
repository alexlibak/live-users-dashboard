import React, { useState } from 'react';

import axios from 'axios';
import './Post.css';
import { getUser, getToken } from '../../utils/common';
const BACKEND_AUTH_URI = 'http://127.0.0.1:5505/posts';

async function createPost(postData) {
    try {
        const { data: { user, token } } = await axios.post(BACKEND_AUTH_URI, postData);
        return { user, token };
    }
    catch(error) {
        console.error(error);
    }
};

export default function Auth(props) {
    const user = getUser();
    const token = getToken();
    const [ postDetails, setPostDetails ] = useState({ 
        title: "",
        text: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { title, text } = postDetails;
        const postData = {
            title,
            text,
            userId: user._id,
            token: token
        }
        const response = await createPost(postData);
        
        if(response) {
        //    setUserSession(jwtPayload);
           props.history.push('/dashboard');
        }
    };

    return(
      <div className="auth-wrapper">
        <h2>Create New Post</h2>
        <form className="form" onSubmit={handleSubmit}>

          <div className="input-wrapper">
            <input 
              placeholder="Title" 
              type="text" 
              onChange={e => setPostDetails({...postDetails, title: e.target.value})} value={postDetails.title}
            />
          </div>
          <div className="input-wrapper">
            <input 
              placeholder="Text" 
              type="text" 
              onChange={e => setPostDetails({...postDetails, text: e.target.value})} value={postDetails.text} 
            />
          </div>
          <div className="btn-wrapper">
            <button type="submit">Create Post</button>
          </div>
          <div>
          </div>
        </form>
      </div>
  )
}