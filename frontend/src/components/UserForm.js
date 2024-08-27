import React,{useState} from "react";
import axios from "axios";

const UserForm=({setUser})=> {
    const [username,setUsername]=useState('');

    const createUser=async()=> {
        const response=await axios.post('http://localhost:3000/create/user',{username});
        setUser(response.data);
    }

    return (
        <div>
            <h2>Create User</h2>
            <input
               type="text"
               placeholder="Enter username"
               value={username}
               onChange={(e)=>setUsername(e.target.value)}
               />
               <button onClick={createUser}>Create User</button>
        </div>
    )
}

export default UserForm;