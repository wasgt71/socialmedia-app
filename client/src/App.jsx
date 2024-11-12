import { useState } from 'react'
import PostForm from './components/post.jsx';
import DisplayPosts from './components/displayposts.jsx';
import SignUpForm from './components/signup';
import LogIn from './components/login';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
 <div>
  <LogIn></LogIn>
  <Link to="signup">Dont have an account? Sign up here.</Link>
 </div>

    </>
  )
}

export default App
