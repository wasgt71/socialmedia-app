import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import myApi from "../components/axios";
import Comment from "../components/comment";
import Like from "../components/like";

function Profile() {
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [lock, setLock] = useState(false);

  const onRender = async (e) => {
    try {
      const response = await myApi.post("/profile", {
        withCredentials: true,
      });
      console.log(response);
      setUser({
        username: response.data.username,
        followers: response.data.followers.length,
        following: response.data.following.length,
      });
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await myApi.post("/profile/posts", {
        withCredentials: true,
      });
      setPosts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onRender();
  }, []);

  const handleClick = () => {
    setLock(true);
  };

  const declineFollower = async (e) => {
    let name = e.target.value;
    console.log(name);
    const response = await myApi.post("/follow/requests/decline", [name], {
      withCredentials: true,
    });
  };

  return (
    <>
      <div>
        <h1>{user.username}</h1>
        <p>followers</p>
        <p>{user.followers}</p>
        <p>following</p>
        <p>{user.following}</p>
        <p>tristan</p>
        <p>welcome to my instagrant page.</p>
        <img id="profile-picture" />
        <button>Edit Profile</button>
      </div>
      <div>
        {posts.map((post) => {
          return(
            <>
            <div>
              <p>{post.username}</p>
              <p>{post.caption}</p>
              <p>Likes:</p>
              <Like id={post.id}></Like>
             <Comment id={post.id}></Comment>
              <p>{post.comments}</p>
            </div>
            </>
          )
        })}
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
    </>
  );
}

export default Profile;
