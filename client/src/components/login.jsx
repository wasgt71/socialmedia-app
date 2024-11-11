import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function LogIn() {
const [ username, setUsername ] = useState()
const [ password, setPassword ] = useState();
const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault()

    const loginData = {
    username,
    password,
    };

    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),

    });
    const data = await response.json();

    if (response.ok) {
    navigate("/post");
    }

}
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username or Email"></input>
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default LogIn;
