import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Auth.css';
import { setUserSession } from '../../utils/common';

async function authLogin({email, password}) {
    try {
        const { data: { name, token } } = await axios.post('http://localhost:5505/api/auth/login',
            { email, password }
        );
        console.log('userToken- >>>', name, token);
        return { name, token };
    }
    catch(error) {
        console.error(error);
    }
};
   


export default function Auth({ setToken }) {
    const [ userDetails, setUserDetails ] = useState({ 
        name: "",
        email: "",
        password: ""
    });
    
    // const [ error, setError ] = useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, email, password } = userDetails;
        const jwtPayload = await authLogin({email, password});
        
        if(jwtPayload) {
           setUserSession(jwtPayload);
        }
    };

    // const handleChange = async (e) => {
    //     setUserDetails({...userDetails, [e.target.name]: e.target.value})
    // };


  return(
    <div className="auth-wrapper">
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        {/* <label>
          <p>Name</p>
          <input type="text" onChange={e => setUserDetails({...userDetails, name: e.target.value})} value={userDetails.name} />
        </label> */}
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
        <div className="btn-wrapper">
          <button type="submit">Submit</button>
        </div>
        <div>
        </div>
      </form>
    </div>
  )
}

Auth.propTypes = {
    setToken: PropTypes.func.isRequired
  }