import { useState } from 'react';

function SignUpForm() {
const [ email, setEmail ] = useState();
const [ username, setUsername ] = useState();
const [ password, setPassword ] = useState();

const handleSubmit = (e) => {
    e.preventDefault()

    const signUpData = {
    email,
    username,
    password,
    };
    
    const response = fetch('http://localhost:3000/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signUpData),
    });
    
    navigate("/");
    console.log(response);
    
}
return(
    <>
    <div>
    <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"></input>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"></input>
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
    </form>
    </div>
    </>
)
}

export default SignUpForm;