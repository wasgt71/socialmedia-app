import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import myApi from "../components/axios";
import Comment from "../components/comment";
import Like from "../components/like";

//Must arrange all display (posts, commments) in order of most recent.


function DisplayPosts() {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState("");

  const retrievePosts = async () => {
    const response = await myApi.post("/posts", {
      withCredentials: true,
    });
    setPosts(response.data);
    console.log(response.data);
    console.log(posts);
  };

  const sendUser = async () => {
    console.log(value);
    try {
      const response = await myApi.post("/otherUser", [value], {
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const removeComment = async (e) => {
    const id = e.target.value;
    const response = await myApi.post("/comment/delete", [id], {
      withCredentials: true,
    })
    if(response.status === 200) {
      retrievePosts();
    }
  }

  useEffect(() => {
    retrievePosts();
  }, [posts]);

  return (
    <>
      <div>
        <ul>
          <div>
            {posts.map((post) => {
              return (
                <>
                  <Link
                    onMouseEnter={() => setValue(post.username)}
                    onClick={sendUser}
                    to="/otherUser"
                  >
                    <p>{post.username}</p>
                  </Link>

                  <li>{post.caption}</li>
                  <Like id={post.id}></Like>
                  <p>{post.likes.length}</p>
                  <Comment id={post.id}></Comment>

                  {post.comments.map((comment) => {
                    return (
                      <>
                        <h4>{comment.username}</h4>
                        <p>{comment.text}</p>
                        <button value={comment.id} onClick={removeComment}>Delete</button>
                      </>
                    );
                  })}
                </>
              );
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
