import { useState, useEffect } from "react";
import myApi from "../components/axios";
import Comment from "../components/comment";
import Like from "../components/like";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function ViewPost() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const userData = new URLSearchParams(location.search);
  const postId = userData.get("id");
  console.log(postId);

  const fetchPosts = async () => {
    const response = await myApi.post("/viewPost", [postId], {
      withCredentials: true,
    });
    console.log(response.data);
    setPosts([response.data]);
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.username}</h2>
          <p>{post.caption}</p>
          <p>{post.likes.length}</p>
          <Like id={post.id}></Like>
          <Comment id={post.id}></Comment>
        
        </div>
      ))}
    </div>
  );
}

export default ViewPost;
