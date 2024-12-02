import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import myApi from "../components/axios";
import Comment from '../components/comment';
import Like from '../components/like';

function DisplayPosts() {
  const [posts, setPosts] = useState([]);

   const retrievePosts = async () => {
    const response = await myApi.post("/posts", {
      withCredentials: true,
    })
    setPosts(response.data);
        console.log(response);
        console.log(posts);
      
    }
  useEffect(() => {
    retrievePosts();
  }, [])  
 

  
  return (
    <>
      <div>
        <ul>
          
            
              
                <div>
                  {posts.map((post) => {
                    return (
                      <>
                  <li>{post.username}</li>
                  <li>{post.caption}</li>
                  <Comment></Comment>
                  <Like></Like>
                      </>
                    )
                  })}
                </div>
              
            
          
        </ul>
      </div>
      <div>
        <Link to="/displayposts">Home</Link>
      </div>
      <div>
        <Link to="/post">Post</Link>
      </div>
      <div>
        <Link to="/profile">Profile</Link>
      </div>
      <div>
        <Link to="/allusers">Connect</Link>
      </div>
    </>
  );
}

export default DisplayPosts;
