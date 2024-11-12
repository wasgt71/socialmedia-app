import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostForm from "./components/post";
import LogIn from "./components/login";
import SignUpForm from "./components/signup";
import DisplayPosts from "./components/displayposts";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "post",
    element: <PostForm />,
  },
  {
    path: "login",
    element: <LogIn />,
  },
  {
    path: "signup",
    element: <SignUpForm />,
  },
  {
    path: "displayposts",
    element: <DisplayPosts />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
