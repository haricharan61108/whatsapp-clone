import React,{useEffect, useState} from "react";
import axios from "axios"; 

const Login=({setUser})=> {
    const [username,setUsername]=useState('');
    const [error,setError]=useState('');

    const handleLogin=async()=> {
        try {
            const response=await axios.get(`http://localhost:3000/users/${username}`);
            setUser(response.data);
        } catch (err) {
            setError("user not found,pls try again");
        }
    }
    return (
        <div>
            <h2>Login</h2>
            <input
            type="text"
            placeholder="Enter ur username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {error && <p style={{color:'red'}}>{error}</p>}
        </div>
    )
}
export default Login;