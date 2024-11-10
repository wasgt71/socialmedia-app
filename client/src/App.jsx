import { useState } from 'react'
import PostForm from './components/post.jsx';
import DisplayPosts from './components/displayposts.jsx';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
 <div>
  <Link to="post">Post</Link>
 </div>
 <div>
 <DisplayPosts>
</DisplayPosts>
</div>
    </>
  )
}

export default App
