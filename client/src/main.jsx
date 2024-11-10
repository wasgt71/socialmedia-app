import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostForm from "./components/post";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "post",
    element: <PostForm />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
