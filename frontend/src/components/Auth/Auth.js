import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import { setUserSession } from '../../utils/common';
const BACKEND_AUTH_URI = 'http://127.0.0.1:5505/api/auth/';

async function authLogin({email, password, name}, isSignup) {
  const apiEndpoint = isSignup ? 'signup' : 'login';
  const userData = {
    email,
    password,
    ...(isSignup && {name})
  }
    try {
        const { data: { user, token } } = await axios.post(`${BACKEND_AUTH_URI}/${apiEndpoint}`, userData);
        return { user, token };
    }
    catch(error) {
        console.error(error);
    }
};

export default function Auth(props) {
    const [ userDetails, setUserDetails ] = useState({ 
        name: "",
        email: "",
        password: ""
    });
    const [showName, setShowName] = React.useState(false)
    const [ error, setError ] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, email, password } = userDetails;
        const jwtPayload = await authLogin({email, password, name}, showName);
        
        if(jwtPayload) {
           setUserSession(jwtPayload);
           props.history.push('/dashboard');
        }
    };


    const handleSignUpShowClick = (e) => {
      setShowName(!showName);
    };

    return(
      <div className="auth-wrapper">
        <h2>{showName ? 'SignUp' : 'Login' }</h2>
        <form className="form" onSubmit={handleSubmit}>
          { showName ? 
              <div className="input-wrapper">
              <input 
                  placeholder="Name" 
                  type="text" 
                  onChange={e => setUserDetails({...userDetails, name: e.target.value})} value={userDetails.name}
                />
            </div> : null }

          <div className="input-wrapper">
            <input 
              placeholder="Email" 
              type="text" 
              onChange={e => setUserDetails({...userDetails, email: e.target.value})} value={userDetails.email}
            />
          </div>
          <div className="input-wrapper">
            <input 
              placeholder="Password" 
              type="password" 
              onChange={e => setUserDetails({...userDetails, password: e.target.value})} value={userDetails.password} 
            />
          </div>
          <div className="signup-link-wrapper">
            {showName ? 'Already registered?' : 'New?' }
            <span className="signup-link-text" onClick={handleSignUpShowClick}>
              {showName ? 'Signin' : 'Signup' }
            </span>
          </div>
          <div className="btn-wrapper">
            <button type="submit">Submit</button>
          </div>
          <div>
          </div>
        </form>
      </div>
  )
}